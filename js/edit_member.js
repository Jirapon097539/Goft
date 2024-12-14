var pos = [],posit = [];
var act = 'update'
var prg = "php/edit_member.php"
var goft = callCookies('goft'),
        menuAccessNotAllow = callCookies('access');
$(function() {
    dd()
    
    $("form#edit_memberForm").submit(function() {
        // alert("sdf")
        var formData = new FormData(this);
        formData.append("act", 'update');
        formData.append("member", Base64.decode(goft.Member_id));
        $.ajax({
            type: "POST",
            url: prg,
            data: formData,
            async: false,
            success: function(data) {
                let result = JSON.parse(data);
                if (result.msg == "<div style='color:green';>แก้ไขรายการสำเร็จ</div>") {
                    swal({
                        icon: 'success',
                        title: 'สำเร็จ',
                        text: 'การดำเนินการเสร็จสิ้น!'
                    });
                    if(result.status){
                        goft.Member_firstname = Base64.encode($("#Member_firstname").val());
                        goft.Member_lastname = Base64.encode($("#Member_lastname").val());
                        goft.Member_tel = $("#Member_tel").val();
                        goft.Member_lineid = $("#Member_lineid").val();
                        goft.nationnality_id = $("#nationnality_id").val();
                        goft.Member_email = $("#Member_email").val();
                        let setCookies = $.jCookies({
                            name: 'goft',
                            value: goft,
                            minutes: 1000000000000000 * 1440
                        });
                    }

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
    })
 
})
 function edit() {
    $("#Member_firstname").val(Base64.decode(goft.Member_firstname) );
    $("#Username").val(goft.Member_user);
    $("#Member_lastname").val(Base64.decode(goft.Member_lastname));
    $("#Member_tel").val(goft.Member_tel);
    $("#Member_lineid").val(goft.Member_lineid);
    $("#nationnality_id").val(goft.nationnality_id);
    $("#Member_email").val(goft.Member_email);   

 }

 function nationality() {
    return new Promise((resolve,reject) => {
    let prg = "php/register.php";
    $.post(prg, { act: "nationnality" }, function(data, status) {
        
        let row = JSON.parse(data);
        $.each(row, function(index, obj) {
            $("#nationnality_id").append("<option value='" + obj.nationnality_id + "'>" + obj.nationnality_name + "</option>");
        })
        resolve(true)
    })
    })
    
}

 function dd(){
    nationality().then((result)=>{
        edit()
    })
}
