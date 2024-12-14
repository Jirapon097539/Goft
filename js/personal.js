var act = "create";
var pos = [],posit = [];
var prg = "php/personal.php"
var goft = callCookies('goft'),
        menuAccessNotAllow = callCookies('access');
$(function() {
    // console.log(goft);
    $("#addPosonal").click(function(){
        clear()
        $("#Level_password").show();
        $("#labelpa").show();
    })
    position()
    display()
    $("#save").click(function(){
        $("#save").text("บันทึก");
        if ($("#save").hasClass("btn-warning") === false) $("#save").addClass("btn-warning");
        if ($("#save").hasClass("btn-success")) $("#save").removeClass("btn-success");
    })
    $("form#personalForm").submit(function() {
       
        var formData = new FormData(this);
        formData.append("act", act);
        $.ajax({
            type: "POST",
            url: prg,
            data: formData,
            async: false,
            success: function(data) {
                let res = JSON.parse(data);
                if (res.status) {
                    alert(res.msg);
                    clear();
                    display();
                } else {
                    alert(res.msg);
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
    $.post(prg, { "act": 'read' }, function(data, status) {
        row = "<div class = 'card'>"
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>จัดการข้อมูลพนักงาน "
        row += "</div>"
        row += "<div class = 'card-body'><br>"
        row += "<table class = 'table table-hover' id='positTable'>"
        row += "<thead class = 'table-info'>"
        row += "<tr>"
        row += "<th>ID</th>"
        row += "<th>ชื่อ นามสกุล</th>"
        row += "<th>เบอร์โทรศัพท์</th>"
        row += "<th>ชื่อผู้ใช้</th>"
        row += "<th>ตำแหน่ง</th>"
        row += "<th>รูปภาพ</th>"
        row += "<th>ตัวเลือก</th>"
        row += "</tr>"
        row += "</thead>"
        row += "<tbody>"
        posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            row += "<tr>"
            row += "<td>" + obj.Level_id + "</td>"
            row += "<td>" + obj.Level_name +" " +obj.Level_surname +" </td>"
            row += "<td>" + obj.Level_tel + "</td>"
            row += "<td>" + obj.Level_user + "</td>"
            row += "<td>" + obj.position_name + "</td>"
            row += "<td><img style='width:150px; height:150px;' src='img/"+obj.Level_picture+"'></td>";
            if (obj.Level_id == goft.Memeber_id) {
                row += "<td><button disabled type='button' class='btn btn-warning'onclick = edit('" + index + "')>แก้ไข</button> &nbsp;&nbsp;"
                row += "<button disabled type ='button' class ='btn btn-danger' onclick = del('" + obj.Level_id + "')>ลบ</button ></td>"
            }else{
                row += "<td><button type='button' class='btn btn-warning'onclick = edit('" + index + "')>แก้ไข</button> &nbsp;&nbsp;"
                row += "<button type ='button' class ='btn btn-danger' onclick = del('" + obj.Level_id + "')>ลบ</button ></td>"
            }
            row += "</tr>"
        });
        row += "</tbody>"
        row += "</table>"
        row += "</div>"
        row += "</div>"
        $("#showdetaillevel").html(row);
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
function clear() {
    act = 'create';
    $("#Level_password").show();
    $("#Level_password").val("");
    $("#Level_id").prop('readonly', false);
    $("#labelpa").show();
    $("#Level_id").val("");
    $("#Level_name").val("");
    $("#Level_surname").val("");
    $("#Level_tel").val("");
    $("#Level_tel").val("");
    $("#Level_user").val("");
    $("#position_id").val("");
    $("#imagePreview2").attr('src', '');
    $("#Level_picture").val("");
    $("#save").text("บันทึก");
    if ($("#save").hasClass("btn-success") === false) $("#save").addClass("btn-success");
    if ($("#save").hasClass("btn-warning")) $("#save").removeClass("btn-warning");
}
function edit(i) {
    act = "update";
    // console.log(posit[i]);
    $("#Level_id").val(posit[i].Level_id);
    $("#Level_name").val(posit[i].Level_name);
    $("#Level_surname").val(posit[i].Level_surname);
    $("#Level_tel").val(posit[i].Level_tel);
    $("#Level_user").val(posit[i].Level_user);
    $("#position_id").val(posit[i].position_id);
    $("#imagePreview2").prop("src", "img/" + posit[i].Level_picture);
    $("#Level_picture").val("");
    // $("#Level_picture").val(posit[i].Level_picture);
    $("#Level_id").prop('readonly', true);
    $("#Level_password").hide();
    $("#labelpa").hide();

    $('#staticBackdrop').modal('show');
    $("#save").text("แก้ไข");
    if ($("#save").hasClass("btn-warning") === false) $("#save").addClass("btn-warning");
    if ($("#save").hasClass("btn-success")) $("#save").removeClass("btn-success");
}

function del(Level_id) {
    if (confirm('ต้องการลบ ? ')) {
        $.post(prg, { Level_id, act: 'delete' }, function(data, status) {
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
function position() {
    let prg = "php/personal.php";
    $.post(prg, { act: "position" }, function(data, status) {
        
        let row = JSON.parse(data);
        $.each(row, function(index, obj) {
            $("#inputState").append("<option value='" + obj.position_id + "'>" + obj.position_name + "</option>");
        })
    })
}

function preview2() {
    var fileInput = document.getElementById('Level_picture');
    var filePath = fileInput.value;
    if (filePath) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imagePreview2').setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}