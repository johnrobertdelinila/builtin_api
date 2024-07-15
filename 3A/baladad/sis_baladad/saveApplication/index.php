<?php

//setup connection
include '../../../../connection.php';

try {
    // Get the raw POST data
    $rawInput = file_get_contents('php://input');

    // Check if the raw input is empty
    if (empty($rawInput)) {
        echo 'No data received.';
        exit;
    }

    // Decode the JSON input
    $json = json_decode($rawInput, true);

    // Check if JSON is correctly decoded
    if ($json === null && json_last_error() !== JSON_ERROR_NONE) {
        // Handle JSON decode error
        echo 'JSON decode error: ' . json_last_error_msg();
        exit;
    }

    $sql = "INSERT INTO applications (surname, firstname ,middleName, dob, sex, civilstatus, weight, height, blood) 
    VALUES ( '". $json['surname'] ."','". $json['firstname'] ."','". $json['middlename'] ."', '". $json['dob'] ."','". $json['sex'] ."','". $json['civilstatus'] ."','". $json['weight'] ."','". $json['height'] ."','". $json['blood'] ."')";

    // use exec() because no results are returned
    $conn->exec($sql);

    echo json_encode(
        array(
            "status" => "success",
            "data" => null
        )
    );

} catch(PDOException $e) {
    echo json_encode(
        array(
            "status" => "fail",
            "data"=>array(
                "title" => $e->getMessage()
            )
        )
    );
}

?>