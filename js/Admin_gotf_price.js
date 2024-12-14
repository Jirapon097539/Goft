var act = "createhole9";
var act1= "createhole18";
var pos = [],posit = [];
var prg = "php/Admin_gotf_price.php"
$(function(){
    $('#Course_date_19').prop('min', function(){
        return new Date().toJSON().split('T')[0];
    });
    $('#inputStatedate2').prop('min', function(){
        return new Date().toJSON().split('T')[0];
    });

    $("#hole188").click(function(){
        clear18()
    })
    $("#hole199").click(function(){
        clear9()
    })
    $("#promotion").click(function(){
        display_promotion()
    })
    $("#reseve").click(function(){
        display()
    })
    display()
    price1()
    price2()
    $("form#Hole9Form").submit(function() {
       
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
        clear9()
        return false;
    })
    $("form#Hole18Form").submit(function() {
       
        var formData = new FormData(this);
        formData.append("act1",act1);
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
        clear18()
        return false;
    })
    $("form#Promotion").submit(function() {
       
        var formData = new FormData(this);
        formData.append("act1","promo");
        $.ajax({
            type: "POST",
            url: prg,
            data: formData,
            async: false,
            success: function(data,status) {
                if(status == "success"){
                    console.log(data);
                    alert(data);
                    display_promotion()
                }else{
                    console.log(data);
                    alert(data);
                } 
            },
            cache: false,
            contentType: false,
            processData: false
        });
        clear18()
        return false;
    })
})


function display() {
    $.post(prg, { "act": 'golf_course' }, function(data, status) {
        row = "<div class = 'card'>"
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>จัดการข้อมูลราคาออกรอบ "
        row += "</div>"
        row += "<div class = 'card-body'><br>"
        row += "<table class = 'table table-hover' id='price_gotfTable'>"
        row += "<thead class = 'table-info'>"
        row += "<tr>"
        row += "<th width: 150%;>ID</th>"
        row += "<th >เวลา</th>"
        row += "<th>ชื่อ</th>"
        row += "<th>ราคา</th>"
        row += "<th>วันที่		</th>"
        row += "<th>โปรโมชัน		</th>"
        row += "<th>รายละเอียด		</th>"
        row += "<th>ตัวเลือก</th>"
        row += "</tr>"
        row += "</thead>"
        row += "<tbody>"
        posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            row += "<tr>"
            row += "<td  width: 150%;>" + obj.Course_id + "</td>"
            row += "<td>" + obj.Course_time + "</td>"
            row += "<td>" + obj.Course_name + "</td>"
            row += "<td>" + obj.price_name + "</td>"
            row += "<td>" + obj.Course_date + "</td>"
            row += "<td>" + obj.promotion + "</td>"
            row += "<td>" + obj.Course_detail + "</td>"
            if(obj.Course_name == "hole9"){
                row += "<td><button type='button' class='btn btn-warning'onclick = edithole9('" + index + "')>แก้ไข</button> &nbsp;&nbsp;"

            }else if(obj.Course_name == "hole18"){
                row += "<td><button type='button' class='btn btn-warning'onclick = edithole18('" + index + "')>แก้ไข</button> &nbsp;&nbsp;"

            }
            row += "<button type ='button' class ='btn btn-danger' onclick = del('" + obj.Course_id + "')>ลบ</button ></td>"
            row += "</tr>"
        });
        row += "</tbody>"
        row += "</table>"
        row += "</div>"
        row += "</div>"
        $("#Admin_gotf_price").html(row);
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
function display_promotion() {
    $.post(prg, { "act": 'golf_course' }, function(data, status) {
        let row = "<div class='card'>";
        row += "<div class='card-header alert-light text-white' style='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>จัดการข้อมูลราคาออกรอบ";
        row += "</div>";
        row += "<div class='card-body'><br>";
        row += "<table class='table table-hover' id='price_gotfTable'>";
        row += "<thead class='table-info'>";
        row += "<tr>";
        row += "<th>ID</th>";
        row += "<th>เวลา</th>";
        row += "<th>ชื่อ</th>";
        row += "<th>ราคา</th>";
        row += "<th>วันที่</th>";
        row += "<th>โปรโมชัน</th>";
        row += "<th>รายละเอียด</th>";
        row += "<th>ตัวเลือก</th>";
        row += "</tr>";
        row += "</thead>";
        row += "<tbody>";

        let posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            if (obj.Course_name == "hole18") {
                row += "<tr>";
                row += "<td>" + obj.Course_id + "</td>";
                row += "<td>" + obj.Course_time + "</td>";
                row += "<td>" + obj.Course_name + "</td>";
                row += "<td>" + obj.price_name + "</td>";
                row += "<td>" + obj.Course_date + "</td>";
                row += "<td>" + obj.promotion + "</td>";
                row += "<td>" + obj.Course_detail + "</td>";

                // Extract hours from the Course_time assuming it's in the format "HH:MM"
                let timeParts = obj.Course_time.split(':');
                let hours = parseInt(timeParts[0]);

                // Check if the course is "hole18" and the time is 11 AM or later
                let date = new Date(obj.Course_date);
                let isHoliday = checkIfHoliday(date);

                if (hours >= 11 && isHoliday) {
                    row += "<td><button type='button' class='btn btn-warning' onclick='promotion(\"" + index + "\")'>เปลี่ยนโปรโมชัน</button></td>";
                } else {
                    row += "<td></td>";
                }

                row += "</tr>";
            }
        });

        row += "</tbody>";
        row += "</table>";
        row += "</div>";
        row += "</div>";
        $("#Admin_gotf_price").html(row);
        $('#price_gotfTable').DataTable({
            columnDefs: [
                { orderable: false, targets: [-1] }
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

function checkIfHoliday(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}


function edithole9(i) { 
    act = "update";
    console.log("update");
  
        $("#Course_id_hole9").attr('type', 'text');
        $("#Course_id_hole9").prop('readonly', true);
        $("#Course_id_hole9").val(posit[i].Course_id);
        $("#inputStateTime1").val(posit[i].Course_time);
        $("#Course_date_19").val(posit[i].Course_date);
        $("#Course_namehole9").val(posit[i].Course_name);
        $("#Course_detail").val(posit[i].Course_detail);
        $("#inputStatedate1").val(posit[i].price_id);
        $("#number").val(posit[i].count);

        $('#staticBackdrop1').modal('show');
        $("#savehole9").text("แก้ไข");
    
}
function promotion(i) { 
    act = "promotion";
    console.log("promotion");
        $("#Course_hole18").val(posit[i].Course_id);
       
        $('#Promotion').modal('show');
        $("#savePromotion").text("แก้ไข");
}
function clear9() { 
    act = "createhole9";
  
        $("#Course_id_hole9").attr('type', 'text');
        $("#Course_id_hole9").prop('readonly', false);
        $("#Course_id_hole9").val("");
        $("#inputStateTime1").val("");
        $("#Course_date_19").val("");
        $("#Course_namehole9").val("hole9");
        $("#Course_detail").val("");
        $("#inputStatedate1").val("");
        $("#number").val("2");

        $('#staticBackdrop1').modal('show');
        $("#savehole9").text("บันทีก");
    
}
function edithole18(i) { 
    act1 = "update1";
    console.log("update");
    $('#staticBackdrop').modal('show');
             $("#Course_id_hole18").val(posit[i].Course_id);
             $("#Course_id_hole18").attr('type', 'text');
             $("#Course_id_hole18").prop('readonly', true);
             $("#inputStateTime2").val(posit[i].Course_time);
             $("#inputStatedate2").val(posit[i].Course_date);
             $("#Course_name").val(posit[i].Course_name);
             $("#Course_detail1").val(posit[i].Course_detail);
             $("#inputStatedate").val(posit[i].price_id);
             
        $("#number_count").val(posit[i].count);
             $("#savehole18").text("แก้ไข");
    
}
function clear18() { 
    act1 = "createhole18";
    $('#staticBackdrop').modal('show');
             $("#Course_id_hole18").val("");
             $("#Course_id_hole18").attr('type', 'text');
             $("#Course_id_hole18").prop('readonly', false);
             $("#inputStateTime2").val("");
             $("#inputStatedate2").val("");
             $("#Course_name").val("hole18");
             $("#Course_detail1").val("");
             $("#inputStatedate").val("");
             
        $("#number_count").val("2");
             $("#savehole18").text("บันทีก");
    
}

function del(Course_id) {
    if (confirm('ต้องการลบ ? ')) {
        $.post(prg, { Course_id, act: 'delete' }, function(data, status) {
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
function price1() {
    let prg = "php/Admin_gotf_price.php";
    $.post(prg, { act: "price1" }, function(data, status) {
        
        let row = JSON.parse(data);
        $.each(row, function(index, obj) {
            $("#inputStatedate1").append("<option value='" + obj.id + "'>" + obj.Price_hole + "</option>");
        })
    })
}
function price2() {
    let prg = "php/Admin_gotf_price.php";
    $.post(prg, { act: "price2" }, function(data, status) {
        
        let row = JSON.parse(data);
        $.each(row, function(index, obj) {
            $("#inputStatedate").append("<option value='" + obj.id + "'>" + obj.Price_hole + "</option>");
        })
    })
}