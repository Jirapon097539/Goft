var act = "create";
var pos = [],posit = [];
var prg = "php/Price.php"
$(function(){

    $("#btnAdd").click(function(){
        clear()
    })
    display()
    $("form#priceForm").submit(function() {
        var formData = new FormData(this);
        formData.append("act", act);
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
        clear()
        return false;
    })
})
function clear() {
    act = 'create';
    $("#price_id").val("");
    $("#price_name").val("");
   
    $("#save").text("บันทึก");
    if ($("#save").hasClass("btn-success") === false) $("#save").addClass("btn-success");
    if ($("#save").hasClass("btn-warning")) $("#save").removeClass("btn-warning");
}
function display() {
    $.post(prg, { "act": 'read' }, function(data, status) {
        row = "<div class = 'card'>"
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>จัดการข้อมูลราคา "
        row += "</div>"
        row += "<div class = 'card-body'><br>"
        row += "<table class = 'table table-hover' id='price_gotfTable'>"
        row += "<thead class = 'table-info'>"
        row += "<tr>"
        row += "<th width: 150%;>ID</th>"
        row += "<th>ราคา</th>"
        row += "<th>ตัวเลือก</th>"
        row += "</tr>"
        row += "</thead>"
        row += "<tbody>"
        posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            row += "<tr>"
            row += "<td>" + obj.price_id + "</td>"
            row += "<td>" + obj.price_name + "</td>"
            row += "<td><button type='button' class='btn btn-warning'onclick = edit('" + index + "')>แก้ไข</button> &nbsp;&nbsp;"
            row += "<button type ='button' class ='btn btn-danger' onclick = del('" + obj.price_id + "')>ลบ</button ></td>"
            row += "</tr>"
        });
        row += "</tbody>"
        row += "</table>"
        row += "</div>"
        row += "</div>"
        $("#show_detailPrice").html(row);
        $('#price_gotfTable').DataTable({
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
    $("#price_id").val(posit[i].price_id);
    $("#price_name").val(posit[i].price_name);
    

    $('#staticBackdrop').modal('show');
    $("#save").text("แก้ไข");
    if ($("#save").hasClass("btn-warning") === false) $("#save").addClass("btn-warning");
    if ($("#save").hasClass("btn-success")) $("#save").removeClass("btn-success");
}

function del(price_id) {
    if (confirm('ต้องการลบ ? ')) {
        $.post(prg, { price_id, act: 'delete' }, function(data, status) {
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