
var goft = callCookies('goft'),
    menuAccessNotAllow = callCookies('access');
var prg = "php/chack_status_slip.php"
$(function () {
    display()
    $('#slip_reservation1').click(function () {
        display()
    });
    $('#slip_reservation_drive1').click(function () {
        display_drive()
    });
    $('#btnCencel').click(function () {
        $('#cancelModal').modal('hide');
    });


})

function display() {
    $.post(prg, { "act": 'read' }, function (data, status) {
        console.log(data);
        row = "<div class = 'card'>"
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>เช็คสถานะการชำระเงินการจองเวลาออกรอบ "
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
        row += "<th>สลิป</th>"
        row += "<th>ตัวเลือก</th>"
        row += "</tr>"
        row += "</thead>"
        row += "<tbody>"
        posit = JSON.parse(data);
        $.each(posit, function (index, obj) {
            row += "<tr>"
            row += "<td>" + obj.Book_date + "</td>"
            row += "<td>" + obj.Course_time + "</td>"
            row += "<td>" + obj.Member_firstname + " " + obj.Member_lastname + " </td>"
            row += "<td>" + obj.Member_tel + "</td>"
            row += "<td>" + obj.Member_email + "</td>"
            if (obj.status_id == '3') {
                row += "<td><div style='color:red';>" + obj.status_name + "</div></td>"

            } else {
                row += "<td><div style='color:green';>" + obj.status_name + "</div></td>"

            }
            row += "<td><img style='width:150px; height:150px;' src='img/" + obj.img + "'></td>";
            row += "<td><button type ='button' class ='btn btn-success' onclick = check('" + index + "')>ตรวจสอบสลิปเงิน</button ></td>"
            row += "</tr>"
        });
        row += "</tbody>"
        row += "</table>"
        row += "</div>"
        row += "</div>"
        $("#show_details").html(row);
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


function display_drive() {
    $.post(prg, { 'member': Base64.decode(goft.Member_id), "act": 'read_drive' }, function (data, status) {
        console.log(data);
        row = "<div class = 'card'>"
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>เช็คสถานะการชำระเงินการจองไดร์ฟกอล์ฟ "
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
        row += "<th>email</th>"
        row += "<th>สถานะ</th>"
        row += "<th></th>"
        row += "<th></th>"
        row += "<th></th>"
        row += "</tr>"
        row += "</thead>"
        row += "<tbody>"
        posit = JSON.parse(data);
        $.each(posit, function (index, obj) {
            row += "<tr>"
            row += "<td>" + obj.Member_firstname + " " + obj.Member_lastname + " </td>"
            row += "<td>" + obj.Member_tel + "</td>"
            row += "<td>" + obj.id_log + "</td>"
            row += "<td>" + obj.date_drive + "</td>"
            row += "<td>" + obj.time_drive + "</td>"
            row += "<td>" + obj.Member_email + "</td>"
            if (obj.status_id == '11') {
                row += "<td><div style='color:red';>" + obj.status_name + "</div></td>"

            } else {
                row += "<td><div style='color:green';>" + obj.status_name + "</div></td>"

            }
            row += "<td><button type ='button' class ='btn btn-success' onclick = email_noti('" + obj.id_drive + "')>แจ้งเตือน</button ></td>"
            row += "<td><button type ='button' class ='btn btn-success' onclick = pay('" + index + "')>ตรวจสอบสลิปเงิน</button ></td>"
            row += "<td><button type='button' class='btn btn-danger'onclick = showCancelPopup('" + obj.id_drive + "')>ยกเลิก</button> &nbsp;&nbsp;"

            row += "</tr>"
        });
        row += "</tbody>"
        row += "</table>"
        row += "</div>"
        row += "</div>"
        $("#show_details").html(row);
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
function check(i) {
    $('#bookId1').val(posit[i].Book_id);
    $('#name_pr1').val(posit[i].Member_firstname + ' ' + posit[i].Member_lastname);
    $('#number_pr1').val(posit[i].Amount);
    $('#time_pr1').val(posit[i].time);
    $('#date_pr1').val(posit[i].date_pay);

    $("#imagePreview21").prop("src", "img/" + posit[i].img);


    $('#save1').click(function () {
        $.post(prg, { "bookId": posit[i].Book_id, act: 'update_end' }, function (data, status) {
            // console.log(status);
            if (status == "success") {
                console.log(data);
                alert(data);
                display()
            } else {
                console.log(data);
                alert(data);
            }
        });
    });
    $('#staticBackdrop').modal('show');
}

function pay(i) {
    $('#bookId').val(posit[i].id_drive);
    $('#name_pr').val(posit[i].Member_firstname + ' ' + posit[i].Member_lastname);
    $('#number_pr').val(posit[i].price_drive);

    $("#imagePreview2").prop("src", "img/" + posit[i].img_drive);

    $('#save').click(function () {
        $.post(prg, { id_drive: posit[i].id_drive, act: 'pay_drive' }, function (data, status) {
            if (status == "success") {
                console.log(data);
                alert(data);
                display()
            } else {
                console.log(data);
                alert(data);
            }
        })
    });

    $('#drive').modal('show');
}
function showCancelPopup(id_drive) {
    $('#bookId').val(id_drive);
    if (confirm('ต้องการยกเลิก ? ')) {
        $.post(prg, { id_drive, act: 'delete_drive' }, function (data, status) {
            let res = JSON.parse(data);
            if (res.status) {
                alert(res.msg);
                display();
            } else {
                alert(res.msg);
            }
        })
    }
}


function email_noti(id_drive) {
    console.log(id_drive);
    $.post(prg, { act: "sendEmail", "id_drive": id_drive }, function (data) {
        console.log(data);
        let res = JSON.parse(data);
        if (res.status) {
            alert("ส่งชื่อผู้ใช้และรหัสผ่านสำเร็จ");
        } else {
            alert("ส่งชื่อผู้ใช้และรหัสผ่านไม่สำเร็จ");
        }
    }).fail(function (xhr, status, error) {
        alert("เกิดข้อผิดพลาด");
    });
}