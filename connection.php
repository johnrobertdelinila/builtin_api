<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: PUT, DELETE');
//setup connection string
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pds";


$isSuccess = false;

try {
    //connects to mysql server
    $conn = new PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $isSuccess = true;

} catch(PDOException $e) {
    $err = $e->getMessage();
}

?>