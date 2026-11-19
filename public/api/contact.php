<?php

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');

function respond($status, $body)
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'Only POST requests are accepted.']);
}

$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
if ($contentLength > 16384) {
    respond(413, ['error' => 'The inquiry is too large.']);
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    respond(400, ['error' => 'Invalid request data.']);
}

if (!empty($input['website'])) {
    respond(400, ['error' => 'Invalid inquiry.']);
}

$limits = [
    'fullName' => 120,
    'organization' => 150,
    'email' => 254,
    'phone' => 40,
    'service' => 100,
    'budget' => 100,
    'message' => 5000,
];
$fields = [];
foreach ($limits as $field => $limit) {
    $value = isset($input[$field]) && is_string($input[$field]) ? trim($input[$field]) : '';
    if (strlen($value) > $limit) {
        respond(422, ['error' => 'One or more inquiry fields are too long.']);
    }
    $fields[$field] = $value;
}

if (
    strlen($fields['fullName']) < 2 ||
    preg_match('/[\r\n]/', $fields['fullName']) ||
    preg_match('/[\r\n]/', $fields['email']) ||
    $fields['organization'] === '' ||
    !filter_var($fields['email'], FILTER_VALIDATE_EMAIL) ||
    $fields['service'] === '' ||
    strlen($fields['message']) < 10 ||
    !isset($input['consent']) ||
    $input['consent'] !== true
) {
    respond(422, ['error' => 'Please check the required inquiry fields and try again.']);
}

$autoloadPath = __DIR__ . '/../vendor/autoload.php';
if (!is_file($autoloadPath)) {
    error_log('AwraLink contact form PHP dependencies are missing.');
    respond(503, ['error' => 'The contact service is temporarily unavailable. Please email sales@awralink.com directly.']);
}

require $autoloadPath;

$privateConfigDirectory = dirname(__DIR__, 2);
try {
    Dotenv\Dotenv::createImmutable($privateConfigDirectory)->safeLoad();
} catch (Throwable $error) {
    error_log('AwraLink contact form environment file could not be loaded: ' . $error->getMessage());
    respond(503, ['error' => 'The contact service is not configured. Please email sales@awralink.com directly.']);
}

$getSetting = function ($name) {
    if (isset($_ENV[$name])) {
        return $_ENV[$name];
    }
    if (isset($_SERVER[$name])) {
        return $_SERVER[$name];
    }

    $value = getenv($name);
    return $value === false ? '' : $value;
};

$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown';
$rateLimitPath = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'awralink-contact-rate-limit.json';
$rateLimitFile = fopen($rateLimitPath, 'c+');
if ($rateLimitFile === false || !flock($rateLimitFile, LOCK_EX)) {
    error_log('AwraLink contact form could not access its rate limit store.');
    respond(503, ['error' => 'The contact service is temporarily unavailable. Please email sales@awralink.com directly.']);
}

$storedRates = json_decode(stream_get_contents($rateLimitFile), true);
$rates = is_array($storedRates) ? $storedRates : [];
$now = time();
$windowStart = $now - 900;
foreach ($rates as $key => $timestamps) {
    $recent = array_values(array_filter(
        is_array($timestamps) ? $timestamps : [],
        function ($timestamp) use ($windowStart) {
            return is_int($timestamp) && $timestamp > $windowStart;
        }
    ));
    if ($recent) {
        $rates[$key] = $recent;
    } else {
        unset($rates[$key]);
    }
}

$ipKey = hash('sha256', $ip);
if (isset($rates[$ipKey]) && count($rates[$ipKey]) >= 3) {
    flock($rateLimitFile, LOCK_UN);
    fclose($rateLimitFile);
    respond(429, ['error' => 'Too many inquiries were submitted recently. Please wait and try again.']);
}

$rates[$ipKey][] = $now;
if (count($rates) > 1000) {
    uasort($rates, function ($left, $right) {
        return max($left) <=> max($right);
    });
    $rates = array_slice($rates, -1000, null, true);
}

rewind($rateLimitFile);
ftruncate($rateLimitFile, 0);
fwrite($rateLimitFile, json_encode($rates));
fflush($rateLimitFile);
flock($rateLimitFile, LOCK_UN);
fclose($rateLimitFile);

$smtpHost = $getSetting('CONTACT_SMTP_HOST');
$smtpPort = (int) $getSetting('CONTACT_SMTP_PORT');
$smtpUsername = $getSetting('CONTACT_SMTP_USERNAME');
$smtpPassword = $getSetting('CONTACT_SMTP_PASSWORD');
$smtpEncryption = strtolower((string) $getSetting('CONTACT_SMTP_ENCRYPTION'));
$fromEmail = $getSetting('CONTACT_FROM_EMAIL');

if (!$smtpHost || !$smtpPort || !$smtpUsername || !$smtpPassword || !$fromEmail || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
    error_log('AwraLink contact form SMTP settings are incomplete.');
    respond(503, ['error' => 'The contact service is not configured. Please email sales@awralink.com directly.']);
}

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    $mail->Port = $smtpPort;
    $mail->CharSet = 'UTF-8';

    if ($smtpEncryption === 'ssl') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($smtpEncryption === 'tls') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    } else {
        error_log('AwraLink contact form SMTP encryption must be tls or ssl.');
        respond(503, ['error' => 'The contact service is not configured. Please email sales@awralink.com directly.']);
    }

    $mail->setFrom($fromEmail, 'AwraLink Technologies');
    $mail->addAddress('sales@awralink.com');
    $mail->addReplyTo($fields['email'], $fields['fullName']);
    $mail->Subject = 'Website inquiry from ' . $fields['fullName'];
    $mail->Body = implode("\n", [
        'Name: ' . $fields['fullName'],
        'Organization: ' . $fields['organization'],
        'Work email: ' . $fields['email'],
        'Phone: ' . ($fields['phone'] !== '' ? $fields['phone'] : 'Not provided'),
        'Service: ' . $fields['service'],
        'Budget: ' . ($fields['budget'] !== '' ? $fields['budget'] : 'Not provided'),
        '',
        'Message:',
        $fields['message'],
    ]);

    $mail->send();
    respond(200, ['ok' => true]);
} catch (Throwable $error) {
    error_log('AwraLink contact form email could not be sent: ' . $error->getMessage());
    respond(502, ['error' => 'We could not send your inquiry. Please try again or email sales@awralink.com directly.']);
}
