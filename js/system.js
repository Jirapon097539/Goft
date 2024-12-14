var Base64 = {
    encode: function(s) {
        return btoa(unescape(encodeURIComponent(s)));
    },
    decode: function(s) {
        return decodeURIComponent(escape(atob(s)));
    }
}
$(function() {
    var goft = callCookies('goft'),
        menuAccessNotAllow = callCookies('access');
    if (!goft) {
        if (location.pathname != "/index.html" && location.href != "/") {
            let pathname = window.location.pathname.replace("home.html", '');
            location.href = window.location.origin + pathname + "index.html";
        }
        return false;
    } else {
        console.log(goft);
        switch (goft.position_id) {
            case "1":
                {
                    $("#manager_re").parent().remove();
                    $("#chack_status_re").parent().remove();
                    $("#chack_status_slip").parent().remove();
                    $("#booking_cash").parent().remove();
                    $("#reserve_tee").parent().remove();
                    $("#golf_driving").parent().remove();
                    $("#edit_member").parent().remove();
                    $("#edit_password").parent().remove();
                    $("#chack_status").parent().remove();
                    $("#user_pro").parent().remove();
                    $('#detail').load('html/personnal.html');

                    break;
                }
            case "2":
                {
                    $("#manager_re").parent().remove();
                    $("#data1").parent().remove();
                    $("#reserve_tee").parent().remove();
                    $("#golf_driving").parent().remove();
                    $("#edit_member").parent().remove();
                    $("#edit_password").parent().remove();
                    $("#chack_status").parent().remove();
                    $("#gotf_price").parent().remove();
                    $("#caddy").parent().remove();
                    $("#member").parent().remove();
                    $("#personnal").parent().remove();
                    $("#user_pro").parent().remove();
                    $("#price").parent().remove();
                    $("#position").parent().remove();
                    $("#log_drive").parent().remove();
                    $("#status").parent().remove();
                    $('#detail').load('html/chack_status_re.html');
                    break;
                }
            case "3":
                {
                    $("#gotf_price").parent().remove();
                    $("#caddy").parent().remove();
                    $("#data1").parent().remove();
                    $("#member").parent().remove();
                    $("#personnal").parent().remove();
                    $("#chack_status_re").parent().remove();
                    $("#chack_status_slip").parent().remove();
                    $("#booking_cash").parent().remove();
                    $("#reserve_tee").parent().remove();
                    $("#golf_driving").parent().remove();
                    $("#edit_member").parent().remove();
                    $("#edit_password").parent().remove();
                    $("#chack_status").parent().remove();
                    $("#user_pro").parent().remove();
                    $("#price").parent().remove();
                    $("#position").parent().remove();
                    $("#log_drive").parent().remove();
                    $("#status").parent().remove();
                    $('#detail').load('html/report_manager.html');
                    break;
                }
            case "12":
                {
                    $("#manager_re").parent().remove();
                    $("#gotf_price").parent().remove();
                    $("#caddy").parent().remove();
                    $("#data1").parent().remove();
                    $("#member").parent().remove();
                    $("#personnal").parent().remove();
                    $("#chack_status_re").parent().remove();
                    $("#chack_status_slip").parent().remove();
                    $("#booking_cash").parent().remove();
                    $("#price").parent().remove();
                    $("#position").parent().remove();
                    $("#log_drive").parent().remove();
                    $("#status").parent().remove();
                    $('#detail').load('html/reserve_tee.html');
                    break;
                }

            default:
                break;
        }
        
    }
    $("#usersshow").html(Base64.decode(goft.Member_firstname) + "&nbsp;&nbsp;" + Base64.decode(goft.Member_lastname));
    $("#userpositionshow").html(goft.position_name);

    $("#logoButton").click(function() {
        var goft = callCookies('goft');
        if (goft) {

            if (location.pathname != "/home.html") {
                location.reload();
            }
        } else {
            if (location.pathname != "/index.html" && location.href != "/") {
                location.href = "index.html";
            }
        }

    });

    $("#logout_button").click(function() {
        deleteCookies()
    });

    $('#personnal').click(function() {
        $('#detail').load('html/personnal.html');
    });
    $('#member').click(function() {
        $('#detail').load('html/Admin_member.html');
    });
    $('#caddy').click(function() {
        $('#detail').load('html/Admin_caddy.html');
    });
    $('#gotf_price').click(function() {
        $('#detail').load('html/Admin_gotf_price.html');
    });
    $('#edit_member').click(function() {
        $('#detail').load('html/edit_member.html');
    });
    $('#user_pro').click(function() {
        $('#detail').load('html/edit_member.html');
    });
    $('#reserve_tee').click(function() {
        $('#detail').load('html/reserve_tee.html');
    });
    $('#chack_status').click(function() {
        $('#detail').load('html/Status_re.html');
    });
    $('#golf_driving').click(function() {
        $('#detail').load('html/golf_driving.html');
    });
    $('#price').click(function() {
        $('#detail').load('html/Price.html');
    });
    $('#position').click(function() {
        $('#detail').load('html/Position.html');
    });
    $('#status').click(function() {
        $('#detail').load('html/Status.html');
    });
    $('#log_drive').click(function() {
        $('#detail').load('html/log_drive.html');
    });
    $('#edit_password').click(function() {
        $('#detail').load('html/edit_password.html');
    });
    $('#chack_status_re').click(function() {
        $('#detail').load('html/chack_status_re.html');
    });
    $('#chack_status_slip').click(function() {
        $('#detail').load('html/chack_status_slip.html');
    });
    $('#manager_re').click(function() {
        $('#detail').load('html/report_manager.html');
    });
    $('#booking_cash').click(function() {
        $('#detail').load('html/booking_cash.html');
    });
    $('#Forget_password').click(function() {
        $('#detail').load('html/forget_password.html');
    });
 

   
});

function deleteCookies() {
    let confirmAction = confirm("Want to log out?");
    if (confirmAction) {
        $.jCookies({ erase: 'goft' });
        let pathname = window.location.pathname.replace("home.html", '');
        location.href = window.location.origin + pathname + "index.html";
        // alert("ออกจากระบบสำเร็จ");
    }
}

function callCookies(cName) {
    let cookies = $.jCookies({ get: cName });
    return cookies;
}
// $(function () {

//     $("#btnsave").click(function () {
//         alert("hello");
//     });

// })