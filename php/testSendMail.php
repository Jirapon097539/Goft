<?PHP
require("phpMailer/class.phpmailer.php");
$mail = new PHPMailer();

$body = "ทดสอบการส่งอีเมล์ภาษาไทย UTF-8 ผ่าน SMTP Server ด้วย PHPMailer.";

$mail->CharSet = "utf-8";
$mail->isSMTP(); // Set mailer to use SMTP
$mail->SMTPDebug = 0;
$mail->SMTPAuth = true; // Enable smtp authentication
$mail->SMTPSecure = 'false'; // Enable "tls" encryption, "ssl" also accepted
$mail->Host = "smtp.gamil.com"; // SMTP server "smtp.yourdomain.com" หรือ TLS/SSL : hostname By Nakhonitech : "xxx.nakhonitech.com"
$mail->Port = 25; // พอร์ท SMTP 25 / SSL: 465 or 587 / TLS: 587
$mail->Username = "penthai041720@gmail.com"; // account SMTP
$mail->Password = "onlk zkte gjdy erjz"; // รหัสผ่าน SMTP

$mail->SetFrom("email@yourdomain.com", "yourname");
$mail->AddReplyTo("email@yourdomain.com", "yourname");
$mail->Subject = "ทดสอบ PHPMailer.";

$mail->MsgHTML($body);

$mail->AddAddress("recipient1@somedomain.com", "recipient1"); // ผู้รับคนที่หนึ่ง
$mail->AddAddress("recipient2@somedomain.com", "recipient2"); // ผู้รับคนที่สอง

if(!$mail->Send()) {
echo "Mailer Error: " . $mail->ErrorInfo;
} else {
echo "Message sent!";
}
?>

 