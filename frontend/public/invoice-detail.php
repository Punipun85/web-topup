<?php
require_once __DIR__ . "/../config/database.php";

$inv = $_GET["inv"] ?? "";
if (!$inv) {
    header("Location: index.php");
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM invoices WHERE invoice_number = ?");
$stmt->execute([$inv]);
$invoice = $stmt->fetch();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Detail Invoice <?= htmlspecialchars($inv) ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <?php if ($invoice): ?>
        <h2>Invoice: <?= htmlspecialchars($invoice["invoice_number"]) ?></h2>
        <p><strong>Tanggal:</strong> <?= date("d-m-Y H:i", strtotime($invoice["date_created"])) ?></p>
        <p><strong>No. HP:</strong> <?= htmlspecialchars($invoice["phone"]) ?></p>
        <p><strong>Harga:</strong> Rp <?= number_format($invoice["total_price"],0,",",".") ?></p>
        <p><strong>Status:</strong> <?= htmlspecialchars($invoice["status"]) ?></p>
    <?php else: ?>
        <p>Invoice tidak ditemukan.</p>
    <?php endif; ?>
    <a href="javascript:history.back()">🔙 Kembali</a>
</div>
</body>
</html>
