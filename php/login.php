<?php
    require_once('../dbConnect/connect.php');
    $data =[];
    $act = isset($_POST['act'])?$_POST['act'] : "";
    $username = isset($_POST['username'])?$_POST['username'] : "";
    $login_type = isset($_POST['login_type'])?$_POST['login_type'] : "";
    // $pass = isset($_POST['pass'])?$_POST['pass'] : "";
    if($act == 'login'){
        switch ($login_type) {
            case '0': {
                $pass = isset($_POST['pass'])? hash('sha256',$_POST['pass']) : "";
                // die($pass);
                $dataSend = [];
                $complete = json_decode($complete);
                $invalid = json_decode($invalid);
                $sql = "SELECT * FROM member WHERE Member_user = '{$username}'";
            
                $result = $conn->query($sql);
                if($result -> num_rows == 1){
                    $row = $result->fetch_assoc();
                    if($username == $row["Member_user"] && $pass == $row["Member_password"]){
                        $sql = "SELECT 
                                    Member_id,
                                    Member_firstname,
                                    Member_lastname,
                                    nationnality_id,
                                    Member_tel,
                                    Member_email,
                                    Member_lineid,
                                    user_level AS position_id,p.position_id,p.position_name
                               		FROM member LEFT JOIN position AS p ON member.user_level = p.position_id WHERE Member_user = '$username' and Member_password =  '$pass'";
                                   
                        $result = $conn->query($sql);
                        $dataSend['member'] = $result->fetch_all(MYSQLI_ASSOC);

                        if(count($dataSend['member']) == 1){
                            $data[0] = $complete;
                            $data[1] = $dataSend;
                        }else{
                            $data[0] = $invalid;
                        }
                    }else{
                        $data[0] = $invalid;
                    }
                }else{
                    $data[0] = $invalid;
                }
                break;
            }
            case '1': {
                $pass = isset($_POST['pass'])? $_POST['pass'] : "";

                $dataSend = [];
                $complete = json_decode($complete);
                $invalid = json_decode($invalid);
                $sql = "SELECT * FROM `level` WHERE Level_user = '{$username}'";
            
                $result = $conn->query($sql);
                if($result -> num_rows == 1){
                    $row = $result->fetch_assoc();
                    if($username == $row["Level_user"] && $pass == $row["Level_password"]){
                        $sql = "SELECT Level_id AS Memeber_id,
                        Level_name AS Member_firstname,
                        Level_surname AS Member_lastname,
                        Level_picture AS Level_picture,
                        level.position_id,p.position_id,p.position_name
                        FROM `level`LEFT JOIN position p ON level.position_id = p.position_id  WHERE Level_user = '$username' and Level_password =  '$pass'";
                        $result = $conn->query($sql);
                        $dataSend['member'] = $result->fetch_all(MYSQLI_ASSOC);

                        if(count($dataSend['member']) == 1){
                            $data[0] = $complete;
                            $data[1] = $dataSend;
                        }else{
                            $data[0] = $invalid;
                        }
                    }else{
                        $data[0] = $invalid;
                    }
                }else{
                    $data[0] = $invalid;
                }
                break;
            }
        }
        
    }else{
        $data[0] = $invalid;
    }
    echo json_encode($data);
?>