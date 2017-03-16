var endpointApiUrl ="/api/";
$.ajaxSetup({
    cache : false,
    data : null,
});

function getBasicKey() {   
    return "Basic d2ViYXBwOjFoMzJvOElTU0UwcWlVV3RkaFh6Mw==";
}

$(function() { 
    //aout client credentials
      $.ajax({
        type : "POST",
        url  : "/api/oauth2/token",
        data : { grant_type : "client_credentials" },
        beforeSend : function(request){
               request.setRequestHeader('Authorization', getBasicKey()  );
        },
        dataType : "text",
        error   : function(jqXHR, textStatus, errorThrown) {                    
            alert("error " + textStatus.message);
        },
        success : function(data, textStatus, jqXHR) {
        	
        },
        complete : function(jqXHR, textStatus) {
        
        }
    });
});
    
$("#verifyLoginButton").button().click(function() {
    $.ajax({
        type        : "POST",
        url         : "/api/oauth2/token",
        data        : {
            username : $("#loginNameVerifyLogin").val(),
            password : $("#passwordVerifyLogin").val(),
            grant_type : "password"
        },
        dataType    : "text",
        error       : function(jqXHR, textStatus, errorThrown) {
            console.log('getJSON request failed! ' + textStatus);
            var json = JSON.parse(jqXHR.responseText);
             alert(json.message);
                        },
        success     : function(data, textStatus, jqXHR) {
                         document.location.href='index.html';
      }
        
    });
});