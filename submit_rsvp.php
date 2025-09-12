<?php


## Konfigurasi koneksi database
$host = 'localhost';     // Ganti jika host berbeda
$db   = 'temp';      // Nama database
$user = 'root';        // Username database
$pass = '';          // Password database

## Buat koneksi
$conn = new mysqli($host, $user, $pass, $db);

## Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

header('Content-Type: application/json');
## Ambil data dari form POST dan amankan dengan real_escape_string
$nama       = $conn->real_escape_string($_POST['Nama'] ?? '');
$email      = $conn->real_escape_string($_POST['email'] ?? '');
$phone      = $conn->real_escape_string($_POST['phone'] ?? '');
$attendance = $conn->real_escape_string($_POST['attendance'] ?? '');
$guests     = $conn->real_escape_string($_POST['guests'] ?? '');
$ucapan     = $conn->real_escape_string($_POST['ucapan'] ?? '');

## Validasi sederhana
if (!$nama || !$email || !$phone || !$attendance || !$guests) {
    die("Data tidak lengkap. Silakan isi semua field yang wajib.");
}

## Query insert data
$sql = "INSERT INTO rsvp (nama, email, phone, attendance, guests, ucapan) VALUES ( '$nama', '$email', '$phone', '$attendance', '$guests', '$ucapan')";

if ($conn->query($sql) === TRUE) {
    // Berikan respons yang bisa dipahami oleh JavaScript
    echo json_encode(["status" => "success", "message" => "Terima kasih, konfirmasi Anda berhasil disimpan!"]);
} else {
    // Berikan respons error yang bisa dipahami
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

$conn->close();
?>