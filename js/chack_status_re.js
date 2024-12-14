
var goft = callCookies('goft'),
        menuAccessNotAllow = callCookies('access');
var prg = "php/chack_status_re.php"
$(function(){
    display()
    $('#reservation1').click(function() {
        display()
    });
    $('#reservation_drive1').click(function() {
        display_drive()
    });
    $('#btnCencel').click(function() {
        $('#cancelModal').modal('hide');
    });
 
    $("form#cancelForm").submit(function() {
        var formData = new FormData(this);
        formData.append("act", "cencel");
        formData.append('cencel_by', goft.Memeber_id);
        $.ajax({
            type: "POST",
            url: prg,
            data: formData,
            async: false,
            success: function(data,status) {
                if(status == "success"){
                    console.log(data);
                    alert(data);
                    display() 
                }else{
                    console.log(data);
                    alert(data);
                } 
            },
           
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    })
})

function display() {
    $.post(prg, { "act": 'read'}, function(data, status) {
        console.log(data);
        row = "<div class = 'card'>"
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>สถานะและการแจ้งเตือนการจองเวลาออกรอบ "
        row += "</div>"
        row += "<div class = 'card-body'><br>"
        row += "<table class = 'table table-hover' id='positTable'>"
        row += "<thead class = 'table-info'>"
        row += "<tr>"
        row += "<th>วันที่เลือก	</th>"
        row += "<th>เวลาที่เลือก</th>"
        row += "<th>ชื่อผู้จอง</th>"
        row += "<th>เบอร์</th>"
        row += "<th>email</th>"
        row += "<th>สถานะ</th>"
        row += "<th></th>"
        row += "<th></th>"
        row += "</tr>"
        row += "</thead>"
        row += "<tbody>"
        posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            row += "<tr>"
            row += "<td>" + obj.Book_date + "</td>"
            row += "<td>" + obj.Course_time + "</td>"
            row += "<td>" + obj.Member_firstname +" " +obj.Member_lastname +" </td>"
            row += "<td>" + obj.Member_tel + "</td>"
            row += "<td>" + obj.Member_email + "</td>"
            if(obj.status_id == '3'){
                row += "<td><div style='color:red';>" + obj.status_name + "</div></td>"

            }else{
                row += "<td><div style='color:green';>" + obj.status_name + "</div></td>"

            }
            row += "<td><button type ='button' class ='btn btn-success' onclick = email_noti_re('" + obj.id + "')>แจ้งเตือน</button ></td>"

            row += "<td><button type='button' class='btn btn-danger'onclick = showCancelPopup('" + obj.Book_id + "')>ยกเลิก</button> &nbsp;&nbsp;"

            row += "</tr>"
        });
        row += "</tbody>"
        row += "</table>"
        row += "</div>"
        row += "</div>"
        $("#show_detail").html(row);
        $('#positTable').DataTable({
            columnDefs: [
                { orderable: false, targets: [-1] },

            ],
            deferRender: true,
            scrollY: 1000,
            scrollCollapse: true,
            scroller: true,
            pageLength: 5,
            lengthMenu: [0, 5, 10, 20, 50, 100, 200, 500],
            searching: true,
            "oLanguage": {
                sEmptyTable: "ไม่มีข้อมูลในตาราง",
                sInfo: "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
                sInfoEmpty: "แสดง 0 ถึง 0 จาก 0 แถว",
                sInfoFiltered: "(กรองข้อมูล _MAX_ ทุกแถว)",
                sInfoPostFix: "",
                sInfoThousands: ",",
                sLengthMenu: "แสดง _MENU_ แถว",
                sLoadingRecords: "กำลังโหลดข้อมูล...",
                sProcessing: "กำลังดำเนินการ...",
                sSearch: "ค้นหา: ",
                sZeroRecords: "ไม่พบข้อมูล",
                oPaginate: {
                    sFirst: "หน้าแรก",
                    sPrevious: "ก่อนหน้า",
                    sNext: "ถัดไป",
                    sLast: "หน้าสุดท้าย"
                },
                oAria: {
                    sSortAscending: ": เปิดใช้งานการเรียงข้อมูลจากน้อยไปมาก",
                    sSortDescending: ": เปิดใช้งานการเรียงข้อมูลจากมากไปน้อย"
                }

            }
        });

    });
}
function display_caddy(Book_id) {
    console.log(Book_id);
    $.post("php/chack_status_re.php", {"Book_id_detail":Book_id, "act": 'read_detail_caddy' }, function(data, status) {

        var row = "<div class='card-container' style='display: flex; flex-wrap: nowrap; overflow-x: auto; gap: 10px;'>";
        var posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            row += "<div class='card' style='border: 1px solid #ccc; border-radius: 5px; padding: 10px; width: 250px; flex: 0 0 auto;'>";
            row += "<div style='text-align: center; '><img style='width: 100; height: 150px;' src='img/" + obj.Caddy_picture + "'></div>";
            row += "<div class='card-body' style='padding: 10px;'>";
            row += "<div>รหัส " + obj.Caddy_number + "</div>";
            row += "<div>ชื่อ-นามสกุล " + obj.Caddy_name + " " + obj.Caddy_lastname + "</div>";
            row += "<div>ชื่อเล่น " + obj.Caddy_nickname + "</div>";
            row += "</div>";
            row += "</div>";
        });
        row += "</div>";
        $("#caddyModal").modal("show");
        $("#caddyModalBody").html(row);

    });
}

function display_drive() {
    $.post(prg, {'member': Base64.decode(goft.Member_id), "act": 'read_drive'}, function(data, status) {
        console.log(data);
        row = "<div class = 'card'>"
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>สถานะและการแจ้งเตือนการจองไดร์ฟกอล์ฟ "
        row += "</div>"
        row += "<div class = 'card-body'><br>"
        row += "<table class = 'table table-hover' id='driTable'>"
        row += "<thead class = 'table-info'>"
        row += "<tr>"
        row += "<th>ชื่อผู้จอง</th>"
        row += "<th>เบอร์</th>"
        row += "<th>log</th>"
        row += "<th>วันที่ไดร์ฟกอล์ฟ</th>"
        row += "<th>เวลาไดร์ฟกอล์ฟ</th>"
        row += "<th>สถานะ</th>"
        row += "<th></th>"
        row += "</tr>"
        row += "</thead>"
        row += "<tbody>"
        posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            row += "<tr>"
            row += "<td>" + obj.Member_firstname +" " +obj.Member_lastname +" </td>"
            row += "<td>" + obj.Member_tel + "</td>"
            row += "<td>" + obj.id_log + "</td>"
            row += "<td>" + obj.date_drive + "</td>"
            row += "<td>" + obj.time_drive + "</td>"
            if(obj.status_id == '3'){
                row += "<td><div style='color:red';>" + obj.status_name + "</div></td>"

            }else{
                row += "<td><div style='color:green';>" + obj.status_name + "</div></td>"

            }
            // row += "<td><button type ='button' class ='btn btn-success' onclick = email_noti('" + index + "')>แจ้งเตือน</button ></td>"
            row += "<td><button type ='button' class ='btn btn-danger' onclick = del_drive('" +  index + "')>สิ้นสุดการไดร์ฟกอล์ฟ</button ></td>"

            row += "</tr>"
        });
        row += "</tbody>"
        row += "</table>"
        row += "</div>"
        row += "</div>"
        $("#show_detail").html(row);
        $('#driTable').DataTable({
            columnDefs: [
                { orderable: false, targets: [-1] },

            ],
            deferRender: true,
            scrollY: 1000,
            scrollCollapse: true,
            scroller: true,
            pageLength: 5,
            lengthMenu: [0, 5, 10, 20, 50, 100, 200, 500],
            searching: true,
            "oLanguage": {
                sEmptyTable: "ไม่มีข้อมูลในตาราง",
                sInfo: "แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว",
                sInfoEmpty: "แสดง 0 ถึง 0 จาก 0 แถว",
                sInfoFiltered: "(กรองข้อมูล _MAX_ ทุกแถว)",
                sInfoPostFix: "",
                sInfoThousands: ",",
                sLengthMenu: "แสดง _MENU_ แถว",
                sLoadingRecords: "กำลังโหลดข้อมูล...",
                sProcessing: "กำลังดำเนินการ...",
                sSearch: "ค้นหา: ",
                sZeroRecords: "ไม่พบข้อมูล",
                oPaginate: {
                    sFirst: "หน้าแรก",
                    sPrevious: "ก่อนหน้า",
                    sNext: "ถัดไป",
                    sLast: "หน้าสุดท้าย"
                },
                oAria: {
                    sSortAscending: ": เปิดใช้งานการเรียงข้อมูลจากน้อยไปมาก",
                    sSortDescending: ": เปิดใช้งานการเรียงข้อมูลจากมากไปน้อย"
                }

            }
        });
    });
}
function showCancelPopup(Book_id) {
    $('#bookId').val(Book_id);
    $('#cancelModal').modal('show');
}
function del_drive(i){
    $.post(prg, { "id_log":posit[i].id_log, "id_drive":posit[i].id_drive, act: 'update_log_end' }, function(data, status) {
        let res = JSON.parse(data);
        if (res.status) {
            alert(res.message);
            display();
        } else {
            alert(res.message);
        }
    });
}

function email_noti_re(id) {
    console.log(id);
    $.post(prg, {act: "sendEmail","id":id}, function(data) {
        console.log(data);
        let res = JSON.parse(data);
        if (res.status) {
            alert("ส่งชื่อผู้ใช้และรหัสผ่านสำเร็จ");
        } else {
            alert("ส่งชื่อผู้ใช้และรหัสผ่านไม่สำเร็จ");
        }
    }).fail(function(xhr, status, error) {
        alert("เกิดข้อผิดพลาด");
    });
}