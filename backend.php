<?php

// Define the URL
$url = "http://127.0.0.1/personaldatasheet/3A/baladad/sis_baladad/saveApplication";

// Check if each key exists in the $_POST array and set default values if they don't
$data = array(
    "surname" => isset($_POST['surname']) ? $_POST['surname'] : '',
    "firstname" => isset($_POST['firstname']) ? $_POST['firstname'] : '',
    "middlename" => isset($_POST['middlename']) ? $_POST['middlename'] : '',
    "dob" => isset($_POST['dob']) ? $_POST['dob'] : '',
    "sex" => isset($_POST['sex']) ? $_POST['sex'] : '',
    "civilstatus" => isset($_POST['civilstatus']) ? $_POST['civilstatus'] : '',
    "weight" => isset($_POST['weight']) ? $_POST['weight'] : '',
    "height" => isset($_POST['height']) ? $_POST['height'] : '',
    "blood" => isset($_POST['blood']) ? $_POST['blood'] : '',
);

// Encode data array to JSON
$jsonData = json_encode($data);

// Check if JSON encoding was successful
if ($jsonData === false) {
    echo 'JSON encoding error: ' . json_last_error_msg();
    exit;
}

// Initialize cURL session
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Follow redirects
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json'
));

// Execute cURL session
$response = curl_exec($ch);

// Check for cURL errors
if ($response === false) {
    echo 'Curl error: ' . curl_error($ch);
} else {
    // Print response from API
    echo $response;
}

// Close cURL session
curl_close($ch);

?>