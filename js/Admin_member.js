var act = "create";
var p = [];
var prg = "php/Admin_member.php"

$(function(){
    display()
    // position()
    $("form#memberForm").submit(function() {
       
        var formData = new FormData(this);
        formData.append("act", act);
        $.ajax({
            type: "POST",
            url: prg,
            data: formData,
            async: false,
            success: function(data) {
                if(data == "แก้ไขรายการสำเร็จ"){
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
    $.post(prg, { "act": 'read_member' }, function(data, status) {
        row = "<div class = 'card'>"
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>จัดการข้อมูลสมาชิก "
        row += "</div>"
        row += "<div class = 'card-body'><br>"
        row += "<table class = 'table table-hover' id='positTable'>"
        row += "<thead class = 'table-info'>"
        row += "<tr>"
        row += "<th>เลขบัตรประชาชน</th>"
        row += "<th>ชื่อ นามสกุล</th>"
        row += "<th>เพศ</th>"
        row += "<th>สัญชาติ</th>"
        row += "<th>เบอร์โทร	</th>"
        row += "<th>อีเมล</th>"
        row += "<th>ID Line	</th>"
        row += "<th>ชื่อผู้ใช้	</th>"
        row += "<th>สถานะ</th>"
        row += "<th>ตัวเลือก        </th>"
        row += "</tr>"
        row += "</thead>"
        row += "<tbody>"
        posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            row += "<tr>"
            row += "<td>" + obj.Member_identification + "</td>"
            row += "<td>" + obj.Member_firstname +" " +obj.Member_lastname +" </td>"
            row += "<td>" + obj.Member_gender + "</td>"
            row += "<td>" + obj.nationnality_name + "</td>"
            row += "<td>" + obj.Member_tel + "</td>"
            row += "<td>" + obj.Member_email + "</td>"
            row += "<td>" + obj.Member_lineid + "</td>"
            row += "<td>" + obj.Member_user + "</td>"
            row += "<td>" + obj.status + "</td>"
            row += "<td><button type='button' class='btn btn-warning'onclick = edit('" + index + "')>แก้ไข</button> &nbsp;&nbsp;"
            row += "</tr>"
        });
        row += "</tbody>"
        row += "</table>"
        row += "</div>"
        row += "</div>"
        $("#showdetailmember").html(row);
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

function edit(i) {
    act = "update";
    console.log("update");
    $("#id").val(posit[i].Member_id);
    $("#Member_identification").val(posit[i].Member_identification);
    $("#Member_firstname").val(posit[i].Member_firstname);
    $("#Member_lastname").val(posit[i].Member_lastname);
    $("#status_id").val(posit[i].status_id);
    

    $('#staticBackdrop').modal('show');
    $("#save").text("แก้ไข");
    if ($("#save").hasClass("btn-warning") === false) $("#save").addClass("btn-warning");
    if ($("#save").hasClass("btn-success")) $("#save").removeClass("btn-success");
}

// function position() {
//     var prg = "php/Admin_member.php"
//     $.post(prg, { act: "status" }, function(data, status) {
        
//         let row = JSON.parse(data);
//         $.each(row, function(index, obj) {
//             $("#status_id").append("<option value='" + obj.status_id + "'>" + obj.status_name + "</option>");
//         })
//     })
// }