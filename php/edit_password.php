<?php
    require_once('../dbConnect/connect.php');
    $act = isset($_POST['act']) ? $_POST['act'] : "";
    $password_input = isset($_POST['password_input']) ? $_POST['password_input'] : "";
    $new_password_input = isset($_POST['new_password_input']) ? $_POST['new_password_input'] : "";
    $cookie = json_decode(base64_decode($_COOKIE['goft']));
    $id = base64_decode($cookie->Member_id);
    if($act == "update"){

        $sql = "SELECT * FROM `member` WHERE Member_id = '$id'";
        $result = $conn->query($sql);
        if($result->num_rows == 1){
            $row = $result->fetch_all(MYSQLI_ASSOC);
            $old_password = $row[0]['Member_password'];
            if($old_password == hash('sha256',$password_input)){
                $sql = "UPDATE `member` SET Member_password = '".hash('sha256',$new_password_input)."' WHERE Member_id = '$id'";
                if($conn->query($sql)){
                    echo json_encode(array("status" => true, "msg" => "แก้ไขข้อมูลสำเร็จ"));
                }else{
                    echo json_encode(array("status" => false, "msg" => "แก้ไขข้อมูลไม่สำเร็จ"));
                }
            }else echo json_encode(array("status" => false, "msg" => "แก้ไขข้อมูลไม่สำเร็จ"));
        }else{
            echo json_encode(array("status" => false, "msg" => "แก้ไขข้อมูลไม่สำเร็จ"));
        }
    }
   

?>