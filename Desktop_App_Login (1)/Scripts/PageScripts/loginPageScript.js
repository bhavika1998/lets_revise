
window.onpaint = preloadFunc();
function preloadFunc() {
    // AuthenticationService.ValidateTokenAndFillUserInfo();
    
}


$(document).ready(function(){
 
    $('#UserEmail').focusin(function () {
            $('#userMessage').empty();
        });
        $('#UserPassword').focusin(function () {
            $('#userMessage').empty();
        });
        $('#UserEmail').blur(function () {
            var emailVal = $('#UserEmail').val();
            if (emailVal != "") {
                if (ValidateEmailId(emailVal)) {
                    $('#lblEmailValid').text('');
                } else {
                    $("#userMessage").css("display", "block").text('Looks like the email id is not in valid format. Ex. myname@xyz.com');
                    return false;
                }
            }
        });
      
    
        $("#btnSignIn").click(function (event) {
            var userName = $('input:text[id=UserEmail]').val();
            var userPassword = $('input:password[id=UserPassword]').val();
            if (userName == "" || userPassword == "") {
                $("#userMessage").css({ "display": "block", "color": "red" }).text("Please enter credentials");
                return false;
            }
            else {
                if (ValidateEmailId(userName)) {
                    // var password = sha512(userPassword).toString();
                    console.log(userPassword);
                    AuthenticationService.ValidateUser(userName, userPassword);
                } else {
                    $("#userMessage").css("display", "block").text('Looks like the email id is not in valid format. Ex. myname@xyz.com');
                    return false;
                }
            }
        });
    });

    function ValidateEmailId(emailString) {
        emailAddress = $.trim(emailString);
       
        if (emailAddress != "") {
            var regularExpression = /^[a-zA-Z0-9!#$%&'-*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z](?:[a-zA-Z]*[a-zA-Z])+$[^>]?/g;
            if (regularExpression.test(emailAddress)) { return true; }
            else { return false; }
        }
    }
