var act = "login";
var prg = "php/login.php";

var Base64 = {
    encode: function(s) {
        return btoa(unescape(encodeURIComponent(s)));
    },
    decode: function(s) {
        return decodeURIComponent(escape(atob(s)));
    }
};
(function() {

    $(document).ready(function() {
        nationality();
        $("#username").focus();
        $("#sign").click(function(){
            console.log("Button clicked");
            $('#exampleModalCenter').hide();
            alert("dsf");
        });
        
        
        $("#signUpInModalLoign").click(function(){
            $("#exampleModalCenterLogin").modal("hide");
        })

        let goft = callCookies('goft');
        if (goft) {
            if (location.pathname !== "/home.html") {
                location.href = window.location.origin + "home.html";
            }
        }
        $("form#registerform").submit(function() {
            var formData = new FormData(this);
            formData.append("act", "register");
            $.ajax({
                type: "POST",
                url: "php/register.php",
                data: formData,
                async: false,
                success: function(data,status) {
                    console.log(status);
                if (status == 'success') {
                    swal({
                        icon: 'success',
                        title: 'สมัครสมาชิกสำเร็จ',
                        text: 'การดำเนินการเสร็จสิ้น!'
                    });
                    $("#regis").modal("hide");
                } else {
                    setTimeout(function() {
                        swal({
                            icon: 'error',
                            title: 'สมัครสมาชิกไม่สำเร็จ',
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
        })
        $("form#loginForm").submit(function(event) {
            event.preventDefault();  // Prevent default form submission

            var formData = new FormData(this);
            formData.append("act", act);

            $.ajax({
                type: "POST",
                url: prg,
                data: formData,
                async: false,
                success: function(data) {
                    var result = JSON.parse(data);
                    console.log(result);
                    if (result[0].status) {
                        var data = result[1]['member'][0];
                        data.Member_id = Base64.encode(data.Member_id);
                        data.Member_firstname = Base64.encode(data.Member_firstname);
                        data.Member_lastname = Base64.encode(data.Member_lastname);
                        data.Level_picture = Base64.encode(data.Level_picture);
                        let setCookies = $.jCookies({
                            name: 'goft',
                            value: data,
                            minutes: 1000000000000000 * 1440
                        });

                        // Uncomment and adjust this part if needed
                        // let setAccess = $.jCookies({
                        //     name: 'access',
                        //     value: result[1]['access'],
                        //     minutes: 1000000000000000 * 1440
                        // });

                        // Check if the cookies were set successfully
                        if (setCookies) {
                            location.replace("home.html");
                        } else {
                            swal({
                                icon: 'error',
                                title: 'Error',
                                text: 'Failed to set cookies.'
                            });
                        }
                    } else {
                        setTimeout(function() {
                            swal({
                                icon: 'error',
                                title: 'กรุณาเข้าสู่ระบบอีกครั้ง',
                                text: 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง!'
                            });
                        }, 400);
                    }
                },
                error: function() {
                    swal({
                        icon: 'error',
                        title: 'Error',
                        text: 'Something went wrong. Please try again later.'
                    });
                },
                cache: false,
                contentType: false,
                processData: false
            });

            return false;
        });

        $("#showPassword").change(function() {
            var passField = $("#pass");
            if ($(this).is(":checked")) {
                passField.attr("type", "text");
            } else {
                passField.attr("type", "password");
            }
        });
    });

    function callCookies(cName) {
        return $.jCookies({ get: cName });
    }
    
    function nationality() {
        let prg = "php/register.php";
        $.post(prg, { act: "nationnality" }, function(data, status) {
            
            let row = JSON.parse(data);
            $.each(row, function(index, obj) {
                $("#inputState").append("<option value='" + obj.nationnality_id + "'>" + obj.nationnality_name + "</option>");
            })
        })
    }
})();
