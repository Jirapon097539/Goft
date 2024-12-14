var goft = callCookies('goft'),
        menuAccessNotAllow = callCookies('access');
var prg = "php/report_manager.php"
$(function(){
    display()
    $("#filterDriveByDate").hide()
    $('#reservation1_report').click(function() {
        display()
        $("#filterDriveByDate").hide()
        $("#filterByDate").show()
    });
    $('#reservation_drive1_report').click(function() {
        display_drive()
        $("#filterByDate").hide()
        $("#filterDriveByDate").show()

    });
})
function printReport() {
    var divToPrint = document.getElementById('show_detail');
    var newWin = window.open('');
    newWin.document.write('<html><head><title>รายงาน</title>');
    newWin.document.write('<style>');
    newWin.document.write('body { font-family: Arial, sans-serif; margin: 20px; }');
    newWin.document.write('.report-header { text-align: center; margin-bottom: 20px; }');
    newWin.document.write('table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }');
    newWin.document.write('table, th, td { border: 1px solid black; }');
    newWin.document.write('th, td { padding: 8px; text-align: left; }');
    newWin.document.write('.card { border: none; }');  // Remove card border for print
    newWin.document.write('.card-header { font-size: 24px; font-weight: bold; margin-bottom: 20px; }');
    newWin.document.write('</style>');
    newWin.document.write('</head><body>');
    newWin.document.write('<div class="report-header">');
    newWin.document.write('<h1>รายงานการจอง</h1>');
    newWin.document.write('<p>พิมพ์วันที่: ' + new Date().toLocaleDateString() + '</p>');
    newWin.document.write('</div>');
    newWin.document.write(divToPrint.innerHTML);
    newWin.document.write('</body></html>');
    newWin.document.close();
    newWin.print();
}


function display(filteredData = null) {
    $.post(prg, { "act": 'read' }, function(data, status) {
        console.log(data);
        row = "<div class = 'card'>"
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>รายละเอียดข้อมูล "
        row += "</div>"
        row += "<div class = 'card-body'><br>"
        row += "<table class = 'table table-hover'>"
        row += "<thead class = 'table-info'>"
        row += "<tr>"
        row += "<th>วันที่เลือก</th>"
        row += "<th>เวลาที่เลือก</th>"
        row += "<th>ชื่อผู้จอง</th>"
        row += "<th>เบอร์</th>"
        row += "<th>จำนวนเงิน</th>"
        row += "<th>จำนวนผู้เข้าเล่น</th>"
        row += "<th>สถานะ</th>"
        row += "</tr>"
        row += "</thead>"
        row += "<tbody>"

        let posit = JSON.parse(data);
        if (filteredData) {
            posit = filteredData;
        }

        $.each(posit, function(index, obj) {
            row += "<tr>"
            row += "<td>" + obj.Book_date + "</td>"
            row += "<td>" + obj.Course_time + "</td>"
            row += "<td>" + obj.Member_firstname + " " + obj.Member_lastname + " </td>"
            row += "<td>" + obj.Member_tel + "</td>"
            row += "<td>" + obj.Amount + "</td>"
            row += "<td>" + obj.Book_person + "</td>"
            row += "<td><div style='color:green';>" + obj.status_name + "</div></td>"
            
            // row += "<td><img style='width:150px; height:150px;' src='img/" + obj.img + "'></td>";
            // row += "<td><button type='button' class='btn btn-success' onclick=check_report('" + index + "')>รายงาน</button></td>"
            row += "</tr>"
        });
        row += "</tbody>"
        row += "</table>"
        row += "</div>"
        row += "</div>"

        $("#show_detail").html(row);
        
    });
}
function display_drive(filteredData = null) {
    $.post(prg, {'member': Base64.decode(goft.Member_id), "act": 'read_drive'}, function(data, status) {
        console.log(data);

        row = "<table class='table table-hover' id='driTable'>";
        row += "<thead class='table-info'>";
        row += "<tr>";
        row += "<th>ชื่อผู้จอง</th>";
        row += "<th>เบอร์</th>";
        row += "<th>log</th>";
        row += "<th>วันที่ไดร์ฟกอล์ฟ</th>";
        row += "<th>เวลาไดร์ฟกอล์ฟ</th>";
        row += "<th>สถานะ</th>";
        row += "</tr>";
        row += "</thead>";
        row += "<tbody>";

        let posit = JSON.parse(data);
        if (filteredData) {
            posit = filteredData;
        }

        $.each(posit, function(index, obj) {
            row += "<tr>";
            row += "<td>" + obj.Member_firstname + " " + obj.Member_lastname + " </td>";
            row += "<td>" + obj.Member_tel + "</td>";
            row += "<td>" + obj.id_log + "</td>";
            row += "<td>" + obj.date_drive + "</td>";
            row += "<td>" + obj.time_drive + "</td>";

            row += "<td><div style='color:green';>" + obj.status_name + "</div></td>";

            // row += "<td><button type='button' class='btn btn-success' onclick=email_noti('" + index + "')>แจ้งเตือน</button></td>";
            // row += "<td><button type='button' class='btn btn-danger' onclick=del_drive('" + index + "')>สิ้นสุดการไดร์ฟกอล์ฟ</button></td>";

            row += "</tr>";
        });
        row += "</tbody>";
        row += "</table>";
        $("#show_detail").html(row);
    });
}
function filterDriveByDate() {
    let startDate = $('#start-date').val();
    let endDate = $('#end-date').val();

    $.post(prg, { "act": 'read_drive', 'member': Base64.decode(goft.Member_id) }, function(data, status) {
        let posit = JSON.parse(data);
        let filteredData = posit.filter(function(obj) {
            let driveDate = new Date(obj.date_drive);
            return driveDate >= new Date(startDate) && driveDate <= new Date(endDate);
        });

        display_drive(filteredData);
    });
}


function filterByDate() {
    let startDate = $('#start-date').val();
    let endDate = $('#end-date').val();

    $.post(prg, { "act": 'read' }, function(data, status) {
        let posit = JSON.parse(data);
        let filteredData = posit.filter(function(obj) {
            let bookDate = new Date(obj.Book_date);
            return bookDate >= new Date(startDate) && bookDate <= new Date(endDate);
        });

        display(filteredData);
    });
}


function check_report(i) {
    var report = `
        <tr>
            <th>วันที่จอง</th>
            <td>${posit[i].Book_date}</td>
        </tr>
        <tr>
            <th>เวลาที่จอง</th>
            <td>${posit[i].Course_time}</td>
        </tr>
        <tr>
            <th>ชื่อผู้จอง</th>
            <td>${posit[i].Member_firstname} ${posit[i].Member_lastname}</td>
        </tr>
        <tr>
            <th>เบอร์โทรศัพท์</th>
            <td>${posit[i].Member_tel}</td>
        </tr>
        <tr>
            <th>ยอดเงิน</th>
            <td>${posit[i].Amount}</td>
        </tr>
        <tr>
            <th>อีเมล</th>
            <td>${posit[i].Member_email}</td>
        </tr>
        
        <tr>
            <th>สถานะ</th>
            <td>${posit[i].status_name}</td>
        </tr>
        <tr>
            <th>รูปภาพ</th>
            <td><img style="width:150px; height:150px;" src="img/${posit[i].img}"></td>
        </tr>
    `;
    $("#reportContent").html(report);
    $('#reportModal').modal('show');
}