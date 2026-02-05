<?php
require_once __DIR__ . "/../config/api.php";

$q = $_GET["q"] ?? "";
if (!$q) {
    header("Location: index.php");
    exit;
}

$url = $API_BASE . "/games?search=" . urlencode($q);
$json = file_get_contents($url);
$result = json_decode($json, true);
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Hasil Pencarian Invoice</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h2>Hasil Pencarian: <?= htmlspecialchars($q) ?></h2>

    <?php if (count($results) > 0): ?>
    <table>
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Nomor Invoice</th>
                <th>No. HP</th>
                <th>Harga</th>
                <th>Status</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($results as $row): ?>
            <tr>
                <td><?= date("d-m-Y", strtotime($row["date_created"])) ?></td>
                <td><?= htmlspecialchars($row["invoice_number"]) ?></td>
                <td><?= htmlspecialchars($row["phone"]) ?></td>
                <td>Rp <?= number_format($row["total_price"],0,",",".") ?></td>
                <td><?= htmlspecialchars($row["status"]) ?></td>
                <td>
                    <a href="invoice-detail.php?inv=<?= urlencode($row["invoice_number"]) ?>">Detail</a>
                </td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    <?php else: ?>
        <p>Data tidak ditemukan!</p>
    <?php endif; ?>

    <a href="index.php">🔙 Kembali</a>
</div>
</body>
</html>
