<?php
$msg = "('status':'fail')";
require_once('../dbConnect/connect.php');

$act = isset($_POST['act']) ? $_POST['act'] : "";
$date_re = isset($_POST['date_re']) ? $_POST['date_re'] : "";
$Course_date = isset($_POST['Course_date']) ? $_POST['Course_date'] : "";
$Course = isset($_POST['Course']) ? $_POST['Course'] : "";
$time = isset($_POST['time']) ? $_POST['time'] : "";
$number_players = isset($_POST['number_players']) ? $_POST['number_players'] : "";
$Amount = isset($_POST['Amount']) ? $_POST['Amount'] : "";
$member = isset($_POST['member']) ? $_POST['member'] : "";
$member_s_code = isset($_POST['member_s_code']) ? $_POST['member_s_code'] : "";

$timeInput = isset($_POST['timeInput']) ? $_POST['timeInput'] : "";
$selected_caddies = isset($_POST['selected_caddies']) ? json_decode($_POST['selected_caddies'], true) : array();
$re_picture = isset($_FILES['re_picture']) ? $_FILES['re_picture'] : "";
  
if($re_picture != ""){
    $re_picture = $_FILES['re_picture']['name'];
    if($re_picture != ""){
    $re_picture_tmp = $_FILES['re_picture']['tmp_name'];
    $ext = pathinfo($re_picture, PATHINFO_EXTENSION);
    $re_picture = uniqid().".".$ext;
    $path_img = "../img/".$re_picture;
    }
}

if ($act == 'read_member') {
    $sql = "SELECT * FROM `member` WHERE Member_id = '$member_s_code'";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
if ($act == 'read') {
    $sql = "SELECT g.*,count(b.Book_time) as c,p.* FROM `golf_course` g LEFT JOIN book b ON g.Course_id = b.Book_time LEFT JOIN price p ON g.price_id = p.price_id  WHERE Course_date = '$date_re'  group by g.Course_id HAVING c < g.count ";
    // die($sql);
    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
// if ($act == 'read_gotf') {
//     $sql = "SELECT g.*,count(b.Book_time) as c,p.* FROM `golf_course` g LEFT JOIN book b ON g.Course_id = b.Book_time LEFT JOIN price p ON g.price_id = p.price_id ";
//     // die($sql);
//     $result = $conn->query($sql);
//     echo json_encode($result->fetch_all(MYSQLI_ASSOC));
// }
if ($_POST['act'] == 'read_gotf' && isset($_POST['date_prefix'])) {
    $datePrefix = $_POST['date_prefix'];
    
    // Query เพื่อดึงข้อมูลของเดือนปัจจุบันจากฐานข้อมูล
    $query = "SELECT g.*,count(b.Book_time) as c,p.* FROM `golf_course` g LEFT JOIN book b ON g.Course_id = b.Book_time LEFT JOIN price p ON g.price_id = p.price_id  WHERE Course_date LIKE '$datePrefix%' group by g.Course_id HAVING c < g.count";
    
    $result = mysqli_query($conn, $query);
    $data = array();
    
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    
    echo json_encode($data);
}


if ($act == 'create') {
    $book_id = date("YmdHis");
    $now_date = date("Y-m-d");
    $conn->begin_transaction();
    $state = true;
    $sql = "INSERT INTO `book`(`Book_id`, `Book_date`, `Book_time`, `Book_person`, `Member_id`, `status_id`, `img`, `Amount`, `time`,`date_pay`) 
            VALUES ('$book_id', '$Course_date', '$time', '$number_players', '$member', '3', '$re_picture', '$Amount', '$timeInput','$now_date')";
    // die($sql);   
    if ($conn->query($sql)) {
        if ($re_picture != "") {
            if (!move_uploaded_file($re_picture_tmp, $path_img)) {
                $state = false;
            }
        }
        if ($state) {
            foreach ($selected_caddies as $caddy_number) {
                $sql = "INSERT INTO `detail_book`(`Book_id`, `caddy_number`) VALUES ('$book_id', '$caddy_number')";
                
                if (!$conn->query($sql)) {
                    $state = false;
                    break;
                }
            }
        }
        if ($state) {
            $conn->commit();
            $msg = "<div style='color:green'>บันทึกรายการสำเร็จ</div>";
        } else {
            $conn->rollback();
            $msg = "<div style='color:red'>บันทึกรายการไม่สำเร็จ</div>";
        }
    } else {
        $msg = "<div style='color:red'>บันทึกรายการไม่สำเร็จ</div>";
    }

    echo $msg;
}


?>
