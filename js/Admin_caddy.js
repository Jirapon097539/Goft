var act = "create";
var pos = [],posit = [];
var prg = "php/Admin_caddy.php"
$(function() {
    
    $("#caddybutton").click(function(){
        clear()
    })
    display()
    $("form#caddyForm").submit(function() {
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
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>จัดการข้อมูลแค๊ดดี๊ "
        row += "</div>"
        row += "<div class = 'card-body'><br>"
        row += "<table class = 'table table-hover' id='positTable'>"
        row += "<thead class = 'table-info'>"
        row += "<tr>"
        row += "<th>หมายเลข</th>"
        row += "<th>ชื่อ นามสกุล</th>"
        row += "<th>ชื่อเล่น	</th>"
        row += "<th>สถานะ	</th>"
        row += "<th>รูปภาพ</th>"
        row += "<th>ตัวเลือก</th>"
        row += "</tr>"
        row += "</thead>"
        row += "<tbody>"
        posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            row += "<tr>"
            row += "<td>" + obj.Caddy_number + "</td>"
            row += "<td>" + obj.Caddy_name +" " +obj.Caddy_lastname +" </td>"
            row += "<td>" + obj.Caddy_nickname + "</td>"
            row += "<td>" + obj.caddy_status + "</td>"
            row += "<td><img style='width:150px; height:150px;' src='img/"+obj.Caddy_picture+"'></td>";
            row += "<td><button type='button' class='btn btn-warning'onclick = edit('" + index + "')>แก้ไข</button> &nbsp;&nbsp;"
            row += "<button type ='button' class ='btn btn-danger' onclick = del('" + obj.Caddy_number + "')>ลบ</button ></td>"
            row += "</tr>"
        });
        row += "</tbody>"
        row += "</table>"
        row += "</div>"
        row += "</div>"
        $("#showdetailcaddy").html(row);
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
    $("#Caddy_number").prop('readonly', false);

    $("#Caddy_number").val("");
    $("#Caddy_nickname").val("");
    $("#Caddy_lastname").val("");
    $("#Caddy_name").val("");
    $("#Caddy_picture").val("");
    $("#imagePreview2").attr('src', '');
    $("#save").text("บันทึก");
    if ($("#save").hasClass("btn-success") === false) $("#save").addClass("btn-success");
    if ($("#save").hasClass("btn-warning")) $("#save").removeClass("btn-warning");
}
function edit(i) {
    act = "update";
    console.log("update");
    $("#Caddy_number").val(posit[i].Caddy_number);
    $("#Caddy_name").val(posit[i].Caddy_name);
    $("#Caddy_lastname").val(posit[i].Caddy_lastname);
    $("#Caddy_nickname").val(posit[i].Caddy_nickname);
    $("#imagePreview2").prop("src", "img/" + posit[i].Caddy_picture);
    $("#Caddy_picture").val("");
    $("#Caddy_number").prop('readonly', true);

    $('#staticBackdrop').modal('show');
    $("#save").text("แก้ไข");
    if ($("#save").hasClass("btn-warning") === false) $("#save").addClass("btn-warning");
    if ($("#save").hasClass("btn-success")) $("#save").removeClass("btn-success");
}

function del(Caddy_number) {
    if (confirm('ต้องการลบ ? ')) {
        $.post(prg, {Caddy_number, act: 'delete' }, function(data, status) {
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

function preview2() {
    var fileInput = document.getElementById('Caddy_picture');
    var filePath = fileInput.value;
    if (filePath) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imagePreview2').setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}