<?php

//setup connection
include '../../../../connection.php';

try {
    $json = (array) json_decode(file_get_contents('php://input'),TRUE);

    $sql = "UPDATE applications SET
    surname='" . $json['surname'] . "',firstname='" . $json['firstname'] . 
    "',middlename='" . $json['middlename'] . "',dob='" . $json['dob'] . 
    "',sex='" . $json['sex'] . "',civilstatus='" . $json['civilstatus'] . 
    "',weight='" . $json['weight'] . "',height='" . $json['height'] . "',blood='" . $json['blood'] .
    "' WHERE id='" . $json['idnumber'] . "'";
    // use exec() because no results are returned
    $conn->exec($sql);
    echo json_encode(array("status" => "success", "data" => null));

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