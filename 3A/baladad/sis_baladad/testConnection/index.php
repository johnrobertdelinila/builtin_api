<?php

//setup connection
include '../../../../connection.php';

if($isSuccess) {
    echo json_encode(
        array(
            "status" => "success",
            "data" => "Database connected successfully."
        )
    );
}else {
    echo json_encode(
        array(
            "status" => "fail",
            "data"=> array("title" => $err)
        )
    );
}

// closing the connection
$conn = null;


?>