<?php
  $msg ="('status':'fail')";
  require_once('../dbConnect/connect.php');

  $act = isset($_POST['act'])?$_POST['act'] : "";
  $Username = isset($_POST['Username'])?$_POST['Username'] : "";
  $Member_firstname = isset($_POST['Member_firstname'])?$_POST['Member_firstname'] : "";
  $Member_lastname = isset($_POST['Member_lastname'])?$_POST['Member_lastname'] : "";
  $Member_tel = isset($_POST['Member_tel'])?$_POST['Member_tel'] : "";
  $Member_email = isset($_POST['Member_email'])?$_POST['Member_email'] : "";
  $Member_lineid = isset($_POST['Member_lineid'])?$_POST['Member_lineid'] : "";
  $nationnality_id = isset($_POST['nationnality_id'])?$_POST['nationnality_id'] : "";
  $member = isset($_POST['member'])?$_POST['member'] : "";
  

  if($act == 'read'){
    $sql = 'SELECT * FROM `member`';
    $result = $conn->query($sql);
    echo json_encode($result -> fetch_all(MYSQLI_ASSOC));
  }

  if($act == 'update'){
    $sql = "UPDATE `member` SET 
                          `Member_firstname`='$Member_firstname',
                          `Member_lastname`='$Member_lastname',
                          `nationnality_id`='$nationnality_id',
                          `Member_tel`='$Member_tel',
                          `Member_email`='$Member_email',
                          `Member_lineid`='$Member_lineid' WHERE `Member_id`='$member'";
    if($conn -> query($sql)){
      echo json_encode(array("status" => true, "msg" => "<div style='color:green';>แก้ไขรายการสำเร็จ</div>"));
    }else{
      echo json_encode(array("status" => true, "msg" => "<div style='color:red'>แก้ไขรายการไม่สำเร็จ</div>"));
    }
  }
?>