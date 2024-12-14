var goft = callCookies('goft'),
        menuAccessNotAllow = callCookies('access');
var prg = "php/Status_re.php"
$(function(){
    display()
    $('#reservation').click(function() {
        display()
    });
    $('#reservation_drive').click(function() {
        display_drive()
    });
})
function display_caddy(Book_id) {
    console.log(Book_id);
    $.post("php/Status_re.php", {"Book_id_detail":Book_id, "act": 'read_detail_caddy' }, function(data, status) {

        var row = "<div class='card-container' style='display: flex; flex-wrap: nowrap; overflow-x: auto; gap: 10px;'>";
        var posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            row += "<div class='card' style='border: 1px solid #ccc; border-radius: 5px; padding: 10px; width: 250px; flex: 0 0 auto;'>";
            row += "<div style='text-align: center; '><img style='width: 100; height: 150px;' src='img/" + obj.Caddy_picture + "'></div>";
            row += "<div class='card-body' style='padding: 10px;'>";
            row += "<div>Number " + obj.Caddy_number + "</div>";
            row += "<div>name surname " + obj.Caddy_name + " " + obj.Caddy_lastname + "</div>";
            row += "<div>nick name " + obj.Caddy_nickname + "</div>";
            row += "</div>";
            row += "</div>";
        });
        row += "</div>";
        $("#caddyModal").modal("show");
        $("#caddyModalBody").html(row);

    });
}


function display() {
    $.post(prg, {'member': Base64.decode(goft.Member_id), "act": 'read'}, function(data, status) {
        // console.log(data);
        row = "<div class = 'card'>"
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>Check booking status "
        row += "</div>"
        row += "<div class = 'card-body'><br>"
        row += "<table class = 'table table-hover' id='positTable'>"
        row += "<thead class = 'table-info'>"
        row += "<tr>"
        row += "<th>Selected date	</th>"
        row += "<th>Selected time</th>"
        row += "<th>Number of people</th>"
        row += "<th>Status</th>"
        row += "<th>Price</th>"
        row += "<th>Options</th>"
        row += "</tr>"
        row += "</thead>"
        row += "<tbody>"
        posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            row += "<tr>"
            row += "<td>" + obj.Book_date + "</td>"
            row += "<td>" + obj.Course_time + "</td>"
            row += "<td>" + obj.Book_person + "</td>"
            if(obj.status_id == '3'){
                row += "<td><div style='color:red';>" + obj.status_name + "</div></td>"

            }else{
                row += "<td><div style='color:green';>" + obj.status_name + "</div></td>"

            }
            
            row += "<td>" + obj.Amount + "</td>"
            row += "<td><button type='button' class='btn btn-success'onclick =  display_caddy('" + obj.Book_id + "')>details</button> &nbsp;&nbsp;"
            if(obj.status_id == '3'){
                row += "<button type='button' class='btn btn-danger'onclick = del('" + obj.Book_id + "')>cancel</button> &nbsp;&nbsp;"

            }else{
                row += "<button disabled type='button' class='btn btn-danger' onclick='del(" + obj.Book_id + ")'>cancel</button> &nbsp;&nbsp;";

            }

            row += "</tr>"
        });
        row += "</tbody>"
        row += "</table>"
        row += "</div>"
        row += "</div>"
        $("#show_detail").html(row);
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
                sEmptyTable: "There is no data in the table.",
                sInfo: "show _START_ to _END_ from _TOTAL_ row",
                sInfoEmpty: "แสดง 0 ถึง 0 จาก 0 แถว",
                sInfoFiltered: "(Filter data _MAX_ every row)",
                sInfoPostFix: "",
                sInfoThousands: ",",
                sLengthMenu: "show _MENU_ row",
                sLoadingRecords: "Loading data...",
                sProcessing: "in progress...",
                sSearch: "search: ",
                sZeroRecords: "No information found",
                oPaginate: {
                    sFirst: "Home page",
                    sPrevious: "previous",
                    sNext: "Next",
                    sLast: "last page"
                },
                oAria: {
                    sSortAscending: ": Enable sorting of data from ascending to descending.",
                    sSortDescending: ": Enable descending sorting."
                }

            }
        });

    });
}

function display_drive() {
    $.post(prg, {'member': Base64.decode(goft.Member_id), "act": 'read_drive'}, function(data, status) {
        // console.log(data);
        row = "<div class = 'card'>"
        row += "<div class = 'card-header alert-light text-white'style ='background-image: linear-gradient(rgb(76, 122, 228), rgb(28, 114, 243));'>Check booking status "
        row += "</div>"
        row += "<div class = 'card-body'><br>"
        row += "<table class = 'table table-hover' id='positTable'>"
        row += "<thead class = 'table-info'>"
        row += "<tr>"
        row += "<th>log</th>"
        row += "<th>Golf driving day</th>"
        row += "<th>Golf driving time</th>"
        row += "<th>Status</th>"
        row += "<th>Options</th>"
        row += "</tr>"
        row += "</thead>"
        row += "<tbody>"
        posit = JSON.parse(data);
        $.each(posit, function(index, obj) {
            row += "<tr>"
            row += "<td>" + obj.id_log + "</td>"
            row += "<td>" + obj.date_drive + "</td>"
            row += "<td>" + obj.time_drive + "</td>"
            if(obj.status_id == '11'){
                row += "<td><div style='color:red';>" + obj.status_name + "</div></td>"

            }else{
                row += "<td><div style='color:green';>" + obj.status_name + "</div></td>"

            }
            if(obj.status_id == '11'){
                row += "<td><button type ='button' class ='btn btn-danger' onclick = del_drive('" + index + "')>cancel</button ></td>"

            }else{
                row += "<td><button disabled type ='button' class ='btn btn-danger' onclick = del_drive('" + index + "')>cancel</button ></td>"

            }

            row += "</tr>"
        });
        row += "</tbody>"
        row += "</table>"
        row += "</div>"
        row += "</div>"
        $("#show_detail").html(row);
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
                sEmptyTable: "There is no data in the table.",
                sInfo: "show _START_ to _END_ from _TOTAL_ row",
                sInfoEmpty: "แสดง 0 ถึง 0 จาก 0 แถว",
                sInfoFiltered: "(Filter data _MAX_ every row)",
                sInfoPostFix: "",
                sInfoThousands: ",",
                sLengthMenu: "show _MENU_ row",
                sLoadingRecords: "Loading data...",
                sProcessing: "in progress...",
                sSearch: "search: ",
                sZeroRecords: "No information found",
                oPaginate: {
                    sFirst: "Home page",
                    sPrevious: "previous",
                    sNext: "Next",
                    sLast: "last page"
                },
                oAria: {
                    sSortAscending: ": Enable sorting of data from ascending to descending.",
                    sSortDescending: ": Enable descending sorting."
                }

            }
        });

    });
}

function del(Book_id) {
    
    if (confirm('want to delete ?')) {
        $.post(prg, { 'Book_id': Book_id, act: 'delete' }, function(data, status) {
            let res = JSON.parse(data);
            
            if (res.status) {
                // alert(res.msg);
                swal({
                    icon: 'success',
                    title: 'success'
                });
                display();
            } else {
                // alert(res.msg);
                setTimeout(function() {
                    swal({
                        icon: 'error',
                        title: 'unsuccessful'
                    });
                }, 400); 
            }
        });
    }
}
function del_drive(i) {
    console.log(posit[i].id_log);
    if (confirm('want to delete ?')) {
        $.post(prg, { 'id_drive': posit[i].id_drive,'id_log':posit[i].id_log, act: 'delete_drive' }, function(data, status) {
            let res = JSON.parse(data);
            if (res.status) {
                // alert(res.msg);
                swal({
                    icon: 'success',
                    title: 'success'
                });
                display();
            } else {
                // alert(res.msg);
                setTimeout(function() {
                    swal({
                        icon: 'error',
                        title: 'unsuccessful'
                    });
                }, 400); 
            }
        });
    }
}
