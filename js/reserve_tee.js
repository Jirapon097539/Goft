var act = 'create'
var prg = "php/reserve_tee.php"
var cat = [];
var goft = callCookies('goft'),
        menuAccessNotAllow = callCookies('access'); 

var enteredMemberCodes = [];
$(function(){
    display()
    // $("#number_players").change(function() {
    //     var prg = 'php/reserve_tee.php'; // Replace with your actual PHP script URL
    //     var dateValue = $("#Course_date").val();
    //     var players = $("#number_players").val()
    //     $.post(prg, {"date_re": dateValue, "act": 'read'}, function(data, status) {
    //         let row = JSON.parse(data);
    //         $.each(row, function(index, obj) {
    //             $("#Amount").val(obj.price_name * players);
    //         })
    //     });
    //     // let Amount = $("#number_players").val() * 500
    //     // console.log(Amount);
    //     // $("#Amount").val(Amount)
    // })
    
    $('#Course_date').prop('min', function(){
        return new Date().toJSON().split('T')[0];
    });

    $("#Course_date").change(function() {
        var prg = 'php/reserve_tee.php'; // Replace with your actual PHP script URL
        var dateValue = $("#Course_date").val();
        $("#time").empty();
        $("#time").append("<option>Please select a tee time</option>");
        $.post(prg, {"date_re": dateValue, "act": 'read'}, function(data, status) {
            let row = JSON.parse(data);
            $.each(row, function(index, obj) {
                
                $("#time").append("<option value='" + obj.Course_id + "'>"+obj.Course_name +" เวลา "+ obj.Course_time + "</option>");
            })
        });
    });
    $('#number_players').change(function() {
        enteredMemberCodes = [];
        cat = [];
        $('.btn-caddy').removeClass('btn-danger').addClass('btn-primary').html('select');
        $('#selectedCaddies').html("Selected Caddies:");
        const numPlayers = $(this).val();
        const membershipCheckDiv = $('#membership_check');
        membershipCheckDiv.empty();
    
        for (let i = 1; i <= numPlayers; i++) {
            const inputDiv = $(`
                <div class="membership-input">
                    <label for="member_code_${i}">member code ${i}:</label>
                    <input type="text" id="member_code_${i}" name="member_code_${i}">
                    <button type="button" class="btn btn-primary" onclick="checkMembership(${i})">modify</button>
                    <p id="member_name_${i}"></p>
                </div>
            `);
            membershipCheckDiv.append(inputDiv);
        }
        calculateTotalCost(); // เมื่อมีการเปลี่ยนแปลงจำนวนผู้เล่น คำนวณราคาทั้งหมดใหม่
    });
    
    $("form#reForm").submit(function() {
        var filePath = $("#re_picture").val();
        var fileName = filePath.split('\\').pop();

        var formData = new FormData(this);
        formData.append("act", act);
        formData.append("re_picture", fileName);
        formData.append("member", Base64.decode(goft.Member_id));
        formData.append("selected_caddies", JSON.stringify(cat)); 
        $.ajax({
            type: "POST",
            url: prg,
            data: formData,
            async: false,
            success: function(data) {
                console.log(data);
                if (data == "<div style='color:green'>บันทึกรายการสำเร็จ</div>") {
                    swal({
                        icon: 'success',
                        title: 'success'
                    });
                clear();

                } else {
                    setTimeout(function() {
                        swal({
                            icon: 'error',
                            title: 'unsuccessful'
                        });
                    }, 400); 
                clear();   
                }
            },
            
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    })
    
    
})

function clear() {
   
    enteredMemberCodes = [];
    // ล้างค่าข้อมูลทั้งหมดใน input
    $("#Course_date").val("");
    $("#time").val("Please select a tee time");
    $("#number_players").val("select the number of players");
    $("#total_cost").html("");
    $('#selectedCaddies').html("");
    $("#email").val("");
    $("#Amount").val("");
    $("#re_picture").val("");
    $("#imagePreview2").attr('src', '');
    $("#timeInput").val("");

    // ล้างค่าข้อมูลที่อยู่ในอาร์เรย์ cat
    cat = [];

    // ล้างข้อมูลในการเช็คสมาชิกที่ป้อนเข้าไป
    $('#membership_check input[type="text"]').val("");

    // ล้างข้อความที่แสดงผลสถานะการป้อนข้อมูลสมาชิก
    $('[id^="member_name_"]').text("");

    // ปรับแต่งข้อมูลแคดดี้ที่เลือกไว้ให้ว่างเปล่า
    $('#selectedCaddies').html("Selected Caddies:");

    // คืนสีปกติให้แก่ปุ่มแคดดี้ที่ถูกเลือกไว้
    $('.btn-caddy').removeClass('btn-danger').addClass('btn-primary').html('select');
}


function checkMembership(memberNumber) {
    const memberCodeInput = $(`#member_code_${memberNumber}`);
    const memberCode = memberCodeInput.val();
    const memberNameP = $(`#member_name_${memberNumber}`);

    if (enteredMemberCodes.includes(memberCode)) {
        memberNameP.text('Duplicate member code');
        memberCodeInput.val('');
    } else {
        $.post(prg, {"member_s_code": memberCode, "act": 'read_member'}, function(data) {
            let rows = JSON.parse(data);

            if (rows.length > 0 && rows[0].Member_firstname) {
                memberNameP.text(`member_s_code: ${rows[0].Member_firstname}`);
                memberCodeInput.data('isMember', true);
            } else {
                memberNameP.text('Invalid member code');
                memberCodeInput.data('isMember', false);
            }
            calculateTotalCost(); // เมื่อตรวจสอบสมาชิกเสร็จแล้ว คำนวณราคาทั้งหมดใหม่
        });
        enteredMemberCodes.push(memberCode);
    }
}


function calculateTotalCost() {
    var totalCostMember = 0; // ราคารวมของสมาชิก
    var totalCostNonMember = 0; // ราคารวมของผู้เล่นทั่วไป
    var prg = 'php/reserve_tee.php'; // Replace with your actual PHP script URL
    var dateValue = $("#Course_date").val();
    var players = $("#number_players").val();

    $('#membership_check input[type="text"]').each(function() {
        var isMember = $(this).data('isMember');
        
        $.post(prg, {"date_re": dateValue, "act": 'read'}, function(data, status) {
            let row = JSON.parse(data);

            $.each(row, function(index, obj) {
                var memberPrice = parseFloat(obj.price_name);
                var nonMemberPrice = memberPrice + 100;

                if (isMember) {
                    totalCostMember += memberPrice; // สำหรับสมาชิก
                } else {
                    totalCostNonMember += nonMemberPrice; // สำหรับผู้เล่นทั่วไป
                }
                
                // แสดงผลรวมของทั้งสมาชิกและผู้เล่นทั่วไป
                $('#Amount').val(parseFloat(totalCostMember)+parseFloat(totalCostNonMember));
            });
        });
    });
}



function selectCaddy(e, caddynumber) {
  
    var index = cat.indexOf(caddynumber);
    // console.log(index);
    if (index > -1) {
        if (cat.length > 0) {
            cat.splice(index, 1);
            if ($(e).hasClass('btn-danger')) $(e).removeClass('btn-danger');
            if (!$(e).hasClass('btn-primary')) $(e).addClass('btn-primary');
            $(e).html('select');
        } else {
            alert("There are no caddies selected.");
        }
    } else {
        if (cat.length < parseFloat($("#number_players").val())) {
            cat.push(caddynumber);
            if ($(e).hasClass('btn-primary')) $(e).removeClass('btn-primary');
            if (!$(e).hasClass('btn-danger')) $(e).addClass('btn-danger');
            $(e).html('cancel');
        } else {
            alert("The amount is complete.");
        }
    }
    updateSelectedCaddies();
}

function outCaddy(caddynumber) {
    if (cat.length > 0) {
        let index = cat.findIndex(item => item == caddynumber);
        if (index > -1) {
            cat.splice(index, 1);
        }
    } else {
        alert("There are no caddies selected.");
    }
    updateSelectedCaddies();
}
function updateSelectedCaddies() {
    let selectedList = cat.map(caddy => `
        <div class="selected-caddy-item">
        <i class="fa fa-address-book" style="font-size:24px"></i>
            Caddy ${caddy}
        </div>
    `).join('');

    $('#selectedCaddies').html(`
        <div class="selected-caddies-container">
            <h5>Selected Caddies:</h5>
            ${selectedList}
        </div>
    `);
}

function display() {
    $.post("php/Admin_caddy.php", { "act": 'read11' }, function(data, status) {
       
        var row = "<div class='card-container' style='display: flex; flex-wrap: nowrap; overflow-x: auto; gap: 10px;'>";
        var posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            row += "<div class='card' style='border: 1px solid #ccc; border-radius: 5px; padding: 10px; width: 250px; flex: 0 0 auto;'>";
            row += "<div style='text-align: center;'><img style='width: 150px; height: 150px;' src='img/" + obj.Caddy_picture + "'></div>";
            row += "<div class='card-body' style='padding: 10px;'>";
            row += "<div>" + obj.Caddy_number + "</div>";
            row += "<div>" + obj.Caddy_name + " " + obj.Caddy_lastname + "</div>";
            row += "<div>" + obj.Caddy_nickname + "</div>";
            row += "<button style='margin-left:150px;' class='btn btn-primary btn-caddy' type='button' onclick='selectCaddy(this, \"" + obj.Caddy_number + "\")'>select</button>";
            row += "</div>";
            row += "</div>";
        });
        row += "</div>";
        $("#show_model").html(row);
    });
}
function preview2() {
    var fileInput = document.getElementById('re_picture');
    var filePath = fileInput.value;
    if (filePath) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imagePreview2').setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}
