
var act = "register";
var pos = [];
var prg = "php/register.php"
$(function() {
    nationality();
    $("form#registerform").submit(function() {
        var formData = new FormData(this);
        formData.append("act", act);
        $.ajax({
            type: "POST",
            url: prg,
            data: formData,
            async: false,
            success: function(data) {
                console.log(data);
               
            },
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    })
})

function nationality() {
    let prg = "php/register.php";
    $.post(prg, { act: "nationnality" }, function(data, status) {
        
        let row = JSON.parse(data);
        $.each(row, function(index, obj) {
            $("#inputState").append("<option value='" + obj.nationnality_id + "'>" + obj.nationnality_name + "</option>");
        })
    })
}