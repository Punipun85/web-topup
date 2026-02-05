<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

$mailConfig = require __DIR__ . '/config/mail.php';

header('Content-Type: application/json');

// Validasi input
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['message' => 'Method tidak diizinkan']);
  exit;
}

$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
if (!$email) {
  http_response_code(400);
  echo json_encode(['message' => 'Email tidak valid']);
  exit;
}

// Generate OTP 6 digit
function generateOtp(): string {
  return (string) random_int(100000, 999999);
}

$otp = generateOtp();

$otpHash = password_hash($otp, PASSWORD_DEFAULT);
$now = time();
$expiresAt = $now + (5 * 60); // 5 menit

$stmt = $pdo->prepare("INSERT INTO otp_requests (email, purpose, otp_hash, expires_at, created_at, last_sent_at)
                       VALUES (?, ?, ?, ?, ?, ?)");
$stmt->execute([$email, 'login', $otpHash, $expiresAt, $now, $now]);

// TODO: simpan OTP hash + expiry ke database di sini
// password_hash($otp, PASSWORD_DEFAULT)

// Kirim email
$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host       = $mailConfig['smtp_host'];
  $mail->SMTPAuth   = true;
  $mail->Username   = $mailConfig['smtp_user'];
  $mail->Password   = $mailConfig['smtp_pass'];
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = $mailConfig['smtp_port'];

  $mail->CharSet = 'UTF-8';
  $mail->setFrom($mailConfig['smtp_user'], $mailConfig['from_name']);
  $mail->addAddress($email);

  $mail->Subject = 'Kode OTP Anda';
  $mail->Body    = "Kode OTP Anda: {$otp}\n\nBerlaku 5 menit. Jangan bagikan kode ini.";

  $mail->send();

  echo json_encode([
    'success' => true,
    'message' => 'OTP berhasil dikirim'
  ]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'message' => 'Gagal mengirim OTP'
  ]);
}
