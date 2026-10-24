
<?php
require_once 'db.php';

// Temporary password for your own admin account
$email = 'admin1@gmail.com';
$newPassword = 'AmaraAdmin2026!';

$hash = password_hash($newPassword, PASSWORD_DEFAULT);

$stmt = $conn->prepare(
    "UPDATE users SET password_hash = ? WHERE email = ?"
);
$stmt->bind_param("ss", $hash, $email);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Admin password updated successfully!";
} else {
    echo "No password changed. Check the email and database.";
}

$stmt->close();
$conn->close();
?>
