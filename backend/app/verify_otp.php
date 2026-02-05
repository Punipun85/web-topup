<?php
header('Content-Type: application/json');

// Wajib POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Method tidak diizinkan']);
  exit;
}

// Ambil input
$email   = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$otp     = isset($_POST['otp']) ? trim($_POST['otp']) : null;
$purpose = isset($_POST['purpose']) ? trim($_POST['purpose']) : 'login';

if (!$email || !$otp) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Email atau OTP tidak valid']);
  exit;
}

// ====== KONEKSI DATABASE (edit sesuai hosting kamu) ======
$DB_HOST = getenv('DB_HOST') ?: '127.0.0.1';
$DB_NAME = getenv('DB_NAME') ?: 'app_db';
$DB_USER = getenv('DB_USER') ?: 'root';
$DB_PASS = getenv('DB_PASS') ?: '';

try {
  $pdo = new PDO(
    "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4",
    $DB_USER,
    $DB_PASS,
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
  );
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'DB connection gagal']);
  exit;
}

// ====== AMBIL OTP TERBARU YANG BELUM DIPAKAI ======
$stmt = $pdo->prepare("
  SELECT id, otp_hash, expires_at, attempts, max_attempts, consumed_at
  FROM otp_requests
  WHERE email = ? AND purpose = ?
  ORDER BY id DESC
  LIMIT 1
");
$stmt->execute([$email, $purpose]);
$row = $stmt->fetch();

if (!$row) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'OTP tidak ditemukan']);
  exit;
}

// Kalau sudah dipakai
if (!empty($row['consumed_at'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'OTP sudah digunakan']);
  exit;
}

// Cek expired
$now = time();
if ($now > (int)$row['expires_at']) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'OTP sudah kedaluwarsa']);
  exit;
}

// Cek attempts limit
if ((int)$row['attempts'] >= (int)$row['max_attempts']) {
  http_response_code(429);
  echo json_encode(['success' => false, 'message' => 'Terlalu banyak percobaan. Minta OTP baru.']);
  exit;
}

// Verifikasi OTP
$ok = password_verify($otp, $row['otp_hash']);

// Tambah attempts (selalu, biar brute force susah)
$pdo->prepare("UPDATE otp_requests SET attempts = attempts + 1 WHERE id = ?")
    ->execute([$row['id']]);

if (!$ok) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'OTP salah']);
  exit;
}

// Kalau benar: tandai consumed
$pdo->prepare("UPDATE otp_requests SET consumed_at = ? WHERE id = ?")
    ->execute([$now, $row['id']]);

echo json_encode([
  'success' => true,
  'message' => 'OTP valid'
]);

