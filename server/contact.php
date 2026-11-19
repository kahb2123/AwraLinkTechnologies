
<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function reply(int $status, array $data): never {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    reply(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    reply(415, ['ok' => false, 'error' => 'Invalid request format.']);
}

$data = json_decode(file_get_contents('php://input') ?: '', true);

if (!is_array($data)) {
    reply(400, ['ok' => false, 'error' => 'Invalid form submission.']);
}

// Spam-trap field
if (!empty($data['website'])) {
    reply(200, ['ok' => true]);
}

// Validate submitted fields
$fullName = trim((string)($data['fullName'] ?? ''));
$organization = trim((string)($data['organization'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$service = trim((string)($data['service'] ?? ''));
$budget = trim((string)($data['budget'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$consent = filter_var($data['consent'] ?? false, FILTER_VALIDATE_BOOLEAN);

if (
    strlen($fullName) < 2 || strlen($fullName) > 300 ||
    $organization === '' || strlen($organization) > 400 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 ||
    strlen($phone) > 100 ||
    $service === '' || strlen($service) > 300 ||
    strlen($budget) > 300 ||
    strlen($message) < 10 || strlen($message) > 20000 ||
    !$consent
) {
    reply(422, ['ok' => false, 'error' => 'Please check the required fields and try again.']);
}

// Load private SMTP settings from the .env file outside public_html
$privateEnv = dirname(__DIR__, 2) . '/.env';

if (is_file($privateEnv)) {
    Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2))->safeLoad();
}

// Composer dependencies are deployed in public_html/vendor
$autoload = dirname(__DIR__) . '/vendor/autoload.php';

if (!is_file($autoload)) {
    error_log('AwraLink: Composer autoload file is missing.');
    reply(503, ['ok' => false, 'error' => 'Email service is not configured yet. Please email sales@awralink.com.']);
}

require $autoload;

$host = $_ENV['CONTACT_SMTP_HOST'] ?? '';
$port = (int)($_ENV['CONTACT_SMTP_PORT'] ?? 465);
$username = $_ENV['CONTACT_SMTP_USERNAME'] ?? '';
$password = $_ENV['CONTACT_SMTP_PASSWORD'] ?? '';
$encryption = strtolower($_ENV['CONTACT_SMTP_ENCRYPTION'] ?? 'ssl');
$fromEmail = $_ENV['CONTACT_FROM_EMAIL'] ?? $username;

if (
    !$host || !$username || !$password ||
    !filter_var($fromEmail, FILTER_VALIDATE_EMAIL) ||
    !in_array($port, [465, 587], true) ||
    !in_array($encryption, ['ssl', 'tls'], true)
) {
    error_log('AwraLink: SMTP settings are incomplete.');
    reply(503, ['ok' => false, 'error' => 'Email service is not configured yet. Please email sales@awralink.com.']);
}

$safe = static fn($value) => htmlspecialchars(
    (string)$value,
    ENT_QUOTES | ENT_SUBSTITUTE,
    'UTF-8'
);

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $host;
    $mail->SMTPAuth = true;
    $mail->Username = $username;
    $mail->Password = $password;
    $mail->Port = $port;
    $mail->SMTPSecure = $encryption === 'ssl'
        ? PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer::ENCRYPTION_STARTTLS;

    $mail->CharSet = 'UTF-8';
    $mail->setFrom($fromEmail, 'AwraLink Website');
    $mail->addAddress('sales@awralink.com', 'AwraLink Sales');
    $mail->addReplyTo($email, $fullName);

    $mail->isHTML(true);
    $mail->Subject = 'Website inquiry: ' . $service;

    $mail->Body =
        '<h2>New AwraLink website inquiry</h2>' .
        '<p><b>Name:</b> ' . $safe($fullName) . '</p>' .
        '<p><b>Organization:</b> ' . $safe($organization) . '</p>' .
        '<p><b>Email:</b> ' . $safe($email) . '</p>' .
        '<p><b>Phone:</b> ' . $safe($phone ?: 'Not provided') . '</p>' .
        '<p><b>Service:</b> ' . $safe($service) . '</p>' .
        '<p><b>Budget:</b> ' . $safe($budget ?: 'Not provided') . '</p>' .
        '<p><b>Message:</b><br>' . nl2br($safe($message)) . '</p>';

    $mail->AltBody =
        "Name: $fullName\n" .
        "Organization: $organization\n" .
        "Email: $email\n" .
        "Phone: $phone\n" .
        "Service: $service\n" .
        "Budget: $budget\n\n" .
        "Message:\n$message";

    $mail->send();
    reply(200, ['ok' => true]);

} catch (Exception $e) {
    error_log('AwraLink mail error: ' . $mail->ErrorInfo);
    reply(502, [
        'ok' => false,
        'error' => 'We could not send your inquiry. Please try again or email sales@awralink.com.'
    ]);
}
