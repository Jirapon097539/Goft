<?php
    $msg ="('status':'fail')";
    require_once('../dbConnect/connect.php');

    $act = isset($_POST['act'])?$_POST['act'] : "";
    $Caddy_number = isset($_POST['Caddy_number'])?$_POST['Caddy_number'] : "";
    $Caddy_name = isset($_POST['Caddy_name'])?$_POST['Caddy_name'] : "";
    $Caddy_lastname = isset($_POST['Caddy_lastname'])?$_POST['Caddy_lastname'] : "";
    $Caddy_nickname = isset($_POST['Caddy_nickname'])?$_POST['Caddy_nickname'] : "";
    $caddy_status = isset($_POST['caddy_status'])?$_POST['caddy_status'] : "";
  
    $Caddy_picture = isset($_FILES['Caddy_picture']) ? $_FILES['Caddy_picture'] : "";
    
    if($Caddy_picture != ""){
        $Caddy_picture = $_FILES['Caddy_picture']['name'];
        if($Caddy_picture != ""){
        $Caddy_picture_tmp = $_FILES['Caddy_picture']['tmp_name'];
        $ext = pathinfo($Caddy_picture, PATHINFO_EXTENSION);
        $Caddy_picture = uniqid().".".$ext;
        $path_img = "../img/".$Caddy_picture;
        }
    }
    
    if($act == 'create'){
        $conn->autocommit(false);
        $state = true;
        $sql = "INSERT INTO `caddy`(`Caddy_number`, `Caddy_name`, `Caddy_lastname`, `Caddy_nickname`,`Caddy_picture`, `caddy_status`) 
        VALUES ('$Caddy_number','$Caddy_name','$Caddy_lastname','$Caddy_nickname','$Caddy_picture','$caddy_status')";
        // die($sql);
        if($conn -> query($sql)){
            if($Caddy_picture != ""){
                if(!move_uploaded_file($Caddy_picture_tmp, $path_img)) $state = false;
            }

            if($state) $conn->commit();
        }else{
            
        }

        if($conn->error || !$state) {
            echo json_encode(array("status" => false, "msg" => "เพิ่มรายการไม่สำเร็จ"));
        }else {
            echo json_encode(array("status" => true, "msg" => "เพิ่มรายการสำเร็จ"));
        }
        // echo $msg;
    }
    if($act == 'read'){
        $sql = 'SELECT * FROM `caddy`';
        $result = $conn->query($sql);
        echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
    }
    if($act == 'read11'){
        $sql = 'SELECT * FROM `caddy` WHERE caddy_status = "on"';
        $result = $conn->query($sql);
        echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
    }
    
    if($act == 'update'){
        $conn->autocommit(false);
        $state = true;
        // $msg = [];
        $sql = "UPDATE `caddy` SET
        `Caddy_name`='$Caddy_name',
        `Caddy_lastname`='$Caddy_lastname',
        `caddy_status`='$caddy_status',
        `Caddy_nickname`='$Caddy_nickname'";
        if($Caddy_picture != "") $sql .= ",`Caddy_picture`='$Caddy_picture' ";
        $sql .= " WHERE Caddy_number ='$Caddy_number'";
        // die($sql);
        if($conn -> query($sql)){
            if($Caddy_picture != ""){
                if(!move_uploaded_file($Caddy_picture_tmp, $path_img)) $state = false;
            }

            if($state) $conn->commit();
        }else{
            
        }

        if($conn->error || !$state) {
            echo json_encode(array("status" => false, "msg" => "แก้ไขรายการไม่สำเร็จ"));
        }else {
            echo json_encode(array("status" => true, "msg" => "แก้ไขรายการสำเร็จ"));
        }
        // echo $msg;
    }
  

    if ($act == 'delete') {
        $msg = [];
        $sql = "DELETE FROM `caddy` WHERE Caddy_number ='$Caddy_number'";
        
        try {
            if ($conn->query($sql)) {
                $msg['status'] = true;
                $msg['msg'] = "ลบข้อมูลสำเร็จ";
            } else {
                $msg['status'] = false;
                $msg['msg'] = "ลบข้อมูลไม่สำเร็จ: Unknown error occurred";
            }
        } catch (mysqli_sql_exception $e) {
            // Capture the SQL error
            $error = $e->getMessage();
    
            // Check if the error is related to foreign key constraint
            if (strpos($error, 'foreign key constraint') !== false) {
                $msg['status'] = false;
                $msg['msg'] = "ลบข้อมูลไม่สำเร็จ: มีการใช้งานข้อมูลนี้อยู่ที่อื่น";
            } else {
                $msg['status'] = false;
                $msg['msg'] = "ลบข้อมูลไม่สำเร็จ: $error";
            }
        }
    
        echo json_encode($msg);
    }
?>