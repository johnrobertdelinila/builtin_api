<?php
//setup connection
include '../../../../connection.php';

try {
    $json = (array) json_decode(file_get_contents('php://input'),TRUE);
    
    //execute sql query
    $stmt = $conn->prepare("SELECT * FROM applications");
    $stmt->execute();
    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    echo json_encode(array("status" => "success", "data" => $stmt->fetchAll()));

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