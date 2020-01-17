var Authdeferred = $.Deferred();
const {remote}=require('electron');
//Static class for authentication and get user information.
var AuthenticationService = (function () {
    return {
        ValidateUser: function (userName, password) {
            var loginParameters = {
                username: userName,
                password: password,
            };
            $("#btnSignIn").attr("disabled", true);
            $.ajax({
                type: 'POST',
                url: config.clientUrl + '/api/login/',
                data: loginParameters,
                beforeSend: function () {
                    $('#userMessage').css({ "display": "block", "color": "red" }).text('..');
                    //showLoading();
                },
                success: function (response) {
                    console.log(response.status)
                     },
                error: function (request, status, error) {
                    if (error == "")
                        error = "There is an issue in Service"
                    $('#userMessage').css('display', 'block').text(error);
                    $("#UserEmail,#UserPassword,#btnSignIn").attr("disabled", false);
                    $("#loading img").css('visibility', 'hidden');
                }, complete: function () {
                    const BrowserWindow = remote.BrowserWindow
                            var newwindow = remote.getCurrentWindow();
                            var brwindow = new BrowserWindow({
                                width: 1300, height: 1000,
                                center: true,
                                frame: false,
                                resizable: false,
                                show: false,
                                webPreferences: {
                                    nodeIntegration: true
                                },
                            });
                            brwindow.loadFile('inner.html');



                            setTimeout(() => {
                                brwindow.show()
                                newwindow.close();
                            }, 1000);
                },
            });
        },
        ValidateTokenAndFillUserInfo: function () {
            if (config.IsHttpOnlyCookie == 1) {
                this.GetUserInformation();
            } else {
                if (CookieManager.getDecryptedValuesOfCookie('ClientInfo')) {
                    userInfo = JSON.parse(CookieManager.getDecryptedValuesOfCookie('ClientInfo'));
                    Authdeferred.resolve();
                }
                else {
                    Authdeferred.reject();
                }
            }
        },
        LogoutUser: function () {
            var flag = true;
            var token = CookieManager.getValueOfCookie('Token');
            localStorage.setItem('isLoggedIn', false);
            $.ajax({
                type: 'GET',
                async: false,
                beforeSend: function (request) {
                    request.setRequestHeader('Authorization', 'Basic ' + token);
                },
                url: config.webApiServerUrl + '/api/User/signout/',
                data: { token: token, clientVersion: detectBrowser().toString() },
                error: function (request, status, error) {
                    if (request.status == 401) {
                        $("#calledFrom").val($("#calledFrom").val() + " signout");
                        $('#UnauthorizedAccessModal').modal('show');
                        return false;
                        //window.location = config.landingUrl;
                    }
                }
            });
            return flag;
        },
        RemoveTokenForMultipleLogin: function (emailId, callback) {
            $.ajax({
                type: 'GET',
                beforeSend: function (request) {
                    //showLoading();
                },
                url: config.webApiServerUrl + '/api/User/RemoveTokenForMultipleLogin/',
                data: { emailAndClientType: emailId + config.clientType.toLowerCase() },
                success: function (response1) {
                    callback(response1);
                },
                error: function (request, status, error) {
                    callback(null);
                }, complete: function () {
                    hideLoading();
                },
            });
        },
        GetOldUserToken: function (emailId, password, callback) {
            var res = false;
            $.ajax({
                type: 'GET',
                beforeSend: function (request) {
                    $('#userMessage').css({ "display": "block", "color": "red" }).text('.');
                    //showLoading();
                },
                url: config.webApiServerUrl + '/api/User/GetUserToken/',
                data: { email: emailId.toLowerCase(), password: password, clientType: config.clientType.toLowerCase() },
                success: function (response) {
                    callback(response);
                },
                error: function (request, status, error) {
                    callback(null);
                }, complete: function () {
                    hideLoading();
                },
            });
        },
        SetLastOpenProduct: function (email, productId) {
            var res = false;
            $.ajax({
                type: 'get',
                beforeSend: function (request) {
                    request.setRequestHeader('Authorization', 'Basic ' + CookieManager.getValueOfCookie('Token'));
                },
                url: config.webApiServerUrl + '/api/UserPermission/SetLastOpenProduct?productId=' + productId + '&email=' + email,
                data: { productId: productId, email: email },
                error: function (request, status, error) {
                    if (request.status == 401) {
                        $("#calledFrom").val($("#calledFrom").val() + ' SetLastOpenProduct?productId=' + productId + '&email=' + email);
                        $('#UnauthorizedAccessModal').modal('show');
                        //window.location = config.landingUrl;
                    }
                }
            });
        },
        getProductAccessPermissions: function () {
            $.ajax({
                method: 'GET',
                cache: false,
                beforeSend: function (request) {
                    request.setRequestHeader('Authorization', 'Basic ' + CookieManager.getValueOfCookie('Token'));
                },
                data: { userEmail: userInfo.EmailId },
                url: config.webApiServerUrl + "/api/UserPermission/GetProductAccessPermissions/",
                success: function (response) {
                    RenderProductsHtml(response);
                },
                error: function (request, status, error) {
                    if (request.status == 401) {
                        $("#calledFrom").val($("#calledFrom").val() + " GetProductAccessPermissions");
                        $('#UnauthorizedAccessModal').modal('show');
                        //window.location = config.landingUrl;
                    }
                }

            });
        },
        GetUserInformation: function () {
            try {
                var isLoggedIn = localStorage.getItem('isLoggedIn');
                if (isLoggedIn == 'true' || isLoggedIn == null) {
                    $.ajax({
                        type: 'GET',
                        url: config.webApiServerUrl + '/api/User/GetUserDetails/',
                        success: function (response) {
                            userInfo = response;
                            Authdeferred.resolve();
                        },
                        error: function (request, status, error) {
                            if (request.status == 401) {
                                //    $("#calledFrom").val(" GetProductAccessPermissions");
                                //    $('#UnauthorizedAccessModal').modal('show');
                            }
                            Authdeferred.reject();
                        }
                    });
                }
                else {
                    Authdeferred.reject();
                }
            }
            catch (err) {
                Authdeferred.reject();
            }
        }
    }
})();