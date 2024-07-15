<?php
//setup connection
include '../../../../connection.php';

try {
    $json = (array) json_decode(file_get_contents('php://input'),TRUE);

    // Check if the provided idNumber exists in the database
    $checkExistenceStmt = $conn->prepare("SELECT COUNT(*) AS count FROM applications WHERE id = :idNumber");
    $checkExistenceStmt->bindParam(':idNumber', $json['idNumber']);
    $checkExistenceStmt->execute();
    $row = $checkExistenceStmt->fetch(PDO::FETCH_ASSOC);
    $count = (int)$row['count'];

    if ($count > 0) {
        // If the idNumber exists, proceed with deletion
        $sql = "DELETE FROM applications WHERE id = :idNumber";
        $deleteStmt = $conn->prepare($sql);
        $deleteStmt->bindParam(':idNumber', $json['idNumber']);
        $deleteStmt->execute();

        echo json_encode(array("status" => "success", "data" => null));
    } else {
        // If the idNumber does not exist, return a failure response
        echo json_encode(array("status" => "fail", "data" => array("title" => "ID does not exist or is incorrect")));
    }

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