var act = 'create'
var prg = "php/golf_driving.php"
var posit = [];
var goft = callCookies('goft'),
        menuAccessNotAllow = callCookies('access'); 


$(function(){
    display()
    var today = new Date().toISOString().split('T')[0];
    $('#driving_date').prop('min', today)
                      .attr('readonly', true)
                      .val(today);
    // $('#driving_date').prop('min', function(){
    //     return new Date().toJSON().split('T')[0];
    // });
    $('#driving_number').change(function(){
        var number = $('#driving_number').val();
        var pricePerUnit = 50;
        var totalPrice = number * pricePerUnit;
        $('#driving_price').val(totalPrice);
    });
});

function display() {
    $.post(prg, { "act": 'read_log' }, function(data, status) {
        var row = "<div class = 'card'>"
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>Book a Golf Cart "
        row += "</div>"
        row += "<div class = 'card-body'>"
        row += "<div class='card-container' style='display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;'>";
         posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            var cardColor = obj.status_id == 6 ? 'background-color: green;' : 'background-color: red;';
            var buttonDisabled = obj.status_id == 6 ? '' : 'disabled';
            row += "<div class='card' style='border: 1px solid #ccc; border-radius: 5px; padding: 10px; margin-top:10%;" + cardColor + "'>";
            row += "<div style='text-align: center; color:white;'>" + obj.log_name + "</div>";
            row += "<div class='card-body' style='padding: 10px;'>";
            row += "<div style='color:white;'>" + (obj.status_id == 6 ? 'blank' : 'unavailable') + "</div>";
            row += "<button class='btn btn-primary ' style='margin-left:160px;' type='button' onclick='reserve(" + obj.id + ")' " + buttonDisabled + ">Book</button>";

            row += "</div>";
            row += "</div>";
        });
        row += "</div>";
        row += "</div>";
        row += '<div style="color: red; margin: 10px;">***Bring the payment in front of the cashier counter.  On the day you made your reservation.</div>'
        row += '<div style="color: red; margin: 10px;">***In the case of not arriving on the reserved date and time We will cancel the reservation immediately.</div>'
        row += "</div>";
        
        $("#show_golf").html(row);
    });
}
function reserve(id){
    console.log(id);
    $('#exampleModal').modal('show');
    $("#log_id").val(id);
    $("form#drivingForm").submit(function() {
       
        var formData = new FormData(this);
        formData.append("act", act);
        formData.append("member", Base64.decode(goft.Member_id));
        $.ajax({
            type: "POST",
            url: prg,
            data: formData,
            async: false,
            success: function(data,status) {
                console.log(data);
                
                if (status == "success") {
                    swal({
                        icon: 'success',
                        title: 'success'
                    });
               display()

                } else {
                    setTimeout(function() {
                        swal({
                            icon: 'error',
                            title: 'unsuccessful'
                        });
                    }, 400); 
               display()   
                }
               
            },
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    })
    
    
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
