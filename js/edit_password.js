$(function(){

    $("form#edit_passwordForm").submit(function(){
        if($("#password_input").val() == "") return false;
        if($("#new_password_input").val() == "") return false;
        if($("#confirm_password_input").val() == "") return false;

        var formData = new FormData(this);
        formData.append("act", 'update');
        $.ajax({
            type: "POST",
            url: "php/edit_password.php",
            data: formData,
            async: false,
            success: function(data) {
                let result = JSON.parse(data);
                if (result.msg == "แก้ไขข้อมูลสำเร็จ") {
                    swal({
                        icon: 'success',
                        title: 'สำเร็จ',
                        text: 'การดำเนินการเสร็จสิ้น!'
                    });
                    if(result.status){
                        editPasswordClear();
                    }
                    // alert(result.msg)
                } else {
                    setTimeout(function() {
                        swal({
                            icon: 'error',
                            title: 'ไม่สำเร็จ',
                            text: 'การดำเนินการไม่สำเร็จ!'
                        });
                    }, 400); 
                
                }
                
            },
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    });

    $("#password_btn").click(function(){
        let input = $("#password_input");
        if(input[0].type == "password"){
            input.attr("type", "text");
            $(this).html(`<i class="fa fa-eye-slash" aria-hidden="true"></i>`);
        }else{
            input.attr("type", "password");
            $(this).html(`<i class="fa fa-eye" aria-hidden="true"></i>`);
        }
    });
    $("#new_password_btn").click(function(){
        let input = $("#new_password_input");
        if(input[0].type == "password"){
            input.attr("type", "text");
            $(this).html(`<i class="fa fa-eye-slash" aria-hidden="true"></i>`);
        }else{
            input.attr("type", "password");
            $(this).html(`<i class="fa fa-eye" aria-hidden="true"></i>`);
        }
    });
    $("#confirm_password_btn").click(function(){
        let input = $("#confirm_password_input");
        if(input[0].type == "password"){
            input.attr("type", "text");
            $(this).html(`<i class="fa fa-eye-slash" aria-hidden="true"></i>`);
        }else{
            input.attr("type", "password");
            $(this).html(`<i class="fa fa-eye" aria-hidden="true"></i>`);
        }
    });

    $("#new_password_input, #confirm_password_input").keyup(function(){
        let new_password = $("#new_password_input").val(),
            confirm_password = $("#confirm_password_input").val();
        if(new_password != confirm_password){
            $("#show_msg").html("New password Don't Match With Confirm Password");
            $("#saveBtn").prop("disabled", true);
        }else{
            $("#show_msg").html("");
            $("#saveBtn").prop("disabled", false);
        }
    });
});

function editPasswordClear(){
    $("#password_input").val("");
    $("#new_password_input").val("");
    $("#confirm_password_input").val("");
    $("#password_input").attr("type", "password");
    $("#new_password_input").attr("type", "password");
    $("#confirm_password_input").attr("type", "password");
    $("#password_btn").html(`<i class="fa fa-eye" aria-hidden="true"></i>`);
    $("#new_password_btn").html(`<i class="fa fa-eye" aria-hidden="true"></i>`);
    $("#confirm_password_btn").html(`<i class="fa fa-eye" aria-hidden="true"></i>`);
    $("#saveBtn").prop("disabled", false);
}