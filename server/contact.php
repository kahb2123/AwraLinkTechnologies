<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function reply(int $status, array $data): never {
    http_response_code($status);
    echo json_encode($data, JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

function envValue(string $name, string $default = ''): string {
    $value = $_ENV[$name] ?? $_SERVER[$name] ?? getenv($name);
    return is_string($value) && trim($value) !== '' ? trim($value) : $default;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$contentType = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
if (strpos($contentType, 'application/json') !== 0) {
    reply(415, ['ok' => false, 'error' => 'Invalid request format.']);
}

$rawBody = file_get_contents('php://input') ?: '';
if (strlen($rawBody) > 16384) {
    reply(413, ['ok' => false, 'error' => 'The inquiry is too large.']);
}

try {
    $data = json_decode($rawBody, false, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $error) {
    reply(400, ['ok' => false, 'error' => 'Invalid JSON request.']);
}

if (!is_object($data)) {
    reply(400, ['ok' => false, 'error' => 'Invalid form submission.']);
}

$data = get_object_vars($data);
$website = $data['website'] ?? '';
if (!is_string($website) || trim($website) !== '') {
    reply(422, ['ok' => false, 'error' => 'Please check the required inquiry fields.']);
}

$field = static function (string $name) use ($data): string {
    $value = $data[$name] ?? '';
    return is_string($value) ? trim($value) : '';
};

$fields = [
    'fullName' => $field('fullName'),
    'organization' => $field('organization'),
    'email' => $field('email'),
    'phone' => $field('phone'),
    'service' => $field('service'),
    'budget' => $field('budget'),
    'message' => $field('message'),
];

$limits = [
    'fullName' => 120,
    'organization' => 150,
    'email' => 254,
    'phone' => 40,
    'service' => 100,
    'budget' => 100,
    'message' => 5000,
];

foreach ($limits as $name => $limit) {
    if (strlen($fields[$name]) > $limit) {
        reply(422, ['ok' => false, 'error' => 'One or more inquiry fields are too long.']);
    }
}

if (
    strlen($fields['fullName']) < 2 ||
    preg_match('/[\r\n]/', $fields['fullName']) ||
    preg_match('/[\r\n]/', $fields['email']) ||
    $fields['organization'] === '' ||
    !filter_var($fields['email'], FILTER_VALIDATE_EMAIL) ||
    ($fields['phone'] !== '' && !preg_match('/^[+().\-\s\d]{7,20}$/', $fields['phone'])) ||
    $fields['service'] === '' ||
    strlen($fields['message']) < 10 ||
    ($data['consent'] ?? false) !== true
) {
    reply(422, ['ok' => false, 'error' => 'Please check the required inquiry fields and try again.']);
}

$autoloadCandidates = [
    __DIR__ . '/vendor/autoload.php',
    dirname(__DIR__) . '/vendor/autoload.php',
];
$autoload = null;
foreach ($autoloadCandidates as $candidate) {
    if (is_file($candidate)) {
        $autoload = $candidate;
        break;
    }
}

if ($autoload === null) {
    error_log('AwraLink: Composer autoload file is missing.');
    reply(503, ['ok' => false, 'error' => 'Email service is not configured yet. Please email sales@awralink.com.']);
}

require_once $autoload;

foreach ([dirname(__DIR__, 2), dirname(__DIR__)] as $envRoot) {
    if (is_file($envRoot . '/.env')) {
        Dotenv\Dotenv::createImmutable($envRoot)->safeLoad();
        break;
    }
}

$smtpHost = envValue('CONTACT_SMTP_HOST');
$smtpPort = filter_var(envValue('CONTACT_SMTP_PORT', '465'), FILTER_VALIDATE_INT);
$smtpUser = envValue('CONTACT_SMTP_USERNAME');
$smtpPassword = envValue('CONTACT_SMTP_PASSWORD');
$smtpEncryption = strtolower(envValue(
    'CONTACT_SMTP_ENCRYPTION',
    $smtpPort === 587 ? 'tls' : 'ssl'
));
$mailTo = envValue('CONTACT_MAIL_TO', 'sales@awralink.com');
$fromEmail = envValue('CONTACT_FROM_EMAIL', $smtpUser);

$invalidSettings = [];
if ($smtpHost === '') $invalidSettings[] = 'CONTACT_SMTP_HOST';
if ($smtpPort === false || !in_array($smtpPort, [465, 587], true)) {
    $invalidSettings[] = 'CONTACT_SMTP_PORT';
}
if ($smtpUser === '') $invalidSettings[] = 'CONTACT_SMTP_USERNAME';
if ($smtpPassword === '') $invalidSettings[] = 'CONTACT_SMTP_PASSWORD';
if (!in_array($smtpEncryption, ['ssl', 'tls'], true)) {
    $invalidSettings[] = 'CONTACT_SMTP_ENCRYPTION';
}
if (!filter_var($mailTo, FILTER_VALIDATE_EMAIL)) $invalidSettings[] = 'CONTACT_MAIL_TO';
if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) $invalidSettings[] = 'CONTACT_FROM_EMAIL';

if ($invalidSettings !== []) {
    error_log('AwraLink: SMTP settings are incomplete or invalid: ' . implode(', ', $invalidSettings));
    reply(503, ['ok' => false, 'error' => 'Email service is not configured yet. Please email sales@awralink.com.']);
}

$safe = static fn(string $value): string => htmlspecialchars(
    $value,
    ENT_QUOTES | ENT_SUBSTITUTE,
    'UTF-8'
);

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPassword;
    $mail->Port = $smtpPort;
    $mail->SMTPSecure = $smtpEncryption === 'ssl'
        ? PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Timeout = 15;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom($fromEmail, 'AwraLink Technologies');
    $mail->addAddress($mailTo, 'AwraLink Sales');
    $mail->addReplyTo($fields['email'], $fields['fullName']);
    $mail->Subject = 'Website inquiry from ' . $fields['fullName'];

    $mail->isHTML(true);
    $mail->Body =
        '<h2>New AwraLink website inquiry</h2>' .
        '<p><b>Name:</b> ' . $safe($fields['fullName']) . '</p>' .
        '<p><b>Organization:</b> ' . $safe($fields['organization']) . '</p>' .
        '<p><b>Email:</b> ' . $safe($fields['email']) . '</p>' .
        '<p><b>Phone:</b> ' . $safe($fields['phone'] ?: 'Not provided') . '</p>' .
        '<p><b>Service:</b> ' . $safe($fields['service']) . '</p>' .
        '<p><b>Budget:</b> ' . $safe($fields['budget'] ?: 'Not provided') . '</p>' .
        '<p><b>Message:</b><br>' . nl2br($safe($fields['message'])) . '</p>';
    $mail->AltBody =
        "Name: {$fields['fullName']}\n" .
        "Organization: {$fields['organization']}\n" .
        "Email: {$fields['email']}\n" .
        'Phone: ' . ($fields['phone'] ?: 'Not provided') . "\n" .
        "Service: {$fields['service']}\n" .
        'Budget: ' . ($fields['budget'] ?: 'Not provided') . "\n\n" .
        "Message:\n{$fields['message']}";

    $mail->send();
    error_log('AwraLink contact email accepted by SMTP. Message-ID: ' . $mail->getLastMessageID());
    reply(200, ['ok' => true]);
} catch (Exception $error) {
    error_log('AwraLink mail error: ' . $mail->ErrorInfo);
    reply(502, [
        'ok' => false,
        'error' => 'We could not send your inquiry. Please try again or email sales@awralink.com directly.',
    ]);
}
