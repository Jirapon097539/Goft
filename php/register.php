<?php
    $msg ="('status':'fail')";
    require_once('../dbConnect/connect.php');
    $act = isset($_POST['act'])?$_POST['act'] : "";
    // $member_id = isset($_POST['member_id'])?$_POST['member_id'] : "";
    $email = isset($_POST['email'])?$_POST['email'] : "";
    $lineid = isset($_POST['linelid'])?$_POST['linelid'] : "";
    $firstname = isset($_POST['firstname'])?$_POST['firstname'] : "";
    $lastname = isset($_POST['lastname'])?$_POST['lastname'] : "";
    $Nationnality = isset($_POST['nationality'])?$_POST['nationality'] : "";
    $age = isset($_POST['age'])?$_POST['age'] : "";
    $gender = isset($_POST['gender'])?$_POST['gender'] : "";
    $password = isset($_POST['password'])? hash('sha256',$_POST['password']) : "";
    $tel = isset($_POST['tel'])?$_POST['tel'] : "";
    $user = isset($_POST['user'])?$_POST['user'] : "";
    $Member_identification = isset($_POST['Member_identification'])?$_POST['Member_identification'] : "";
    
    if($act == 'register'){
        $member_id = date("mdHis");

        $sql = "INSERT INTO `member`(`Member_id`, `Member_identification`, `Member_firstname`, `Member_lastname`, `Member_gender`, `nationnality_id`, `Member_tel`, `Member_email`, `Member_lineid`, `Member_user`, `Member_password`, `user_level`, `status`) 
        VALUES ('$member_id','$Member_identification','$firstname','$lastname','$gender','$Nationnality','$tel','$email','$lineid','$user','$password','12','สมาชิกปกติ')";
    //    die($sql);
       if($conn -> query($sql)== true){
            $msg = "บันทึกรายการสำเร็จ";
        }else{
            $msg = "บันทึกรายการไม่สำเร็จ";
        }
        echo $msg;
    }

    if($act == 'nationnality'){
        $sql = 'SELECT * FROM `nationnality`';
        $result = $conn->query($sql);
        echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
    }
?>