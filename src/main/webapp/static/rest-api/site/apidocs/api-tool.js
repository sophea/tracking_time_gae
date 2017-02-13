/****************************************************************
 * api-tool.js 
 * Description : using this script to process business. 
 ****************************************************************/ 

/**
 * function support
 */
function Helper() {
	 this.hash = "";
     this.formUrlEncoded = "application/x-www-form-urlencoded; charset=utf-8";
     this.applicationJson = "application/json; charset=utf-8";
     this.accessToken = "?access_token=";
     this.endpointApiUrl = "/api";
     this.stringAccessToken;
     this.DEFAULT_USER_ACCOUNT = "webapp";
     this.DEFAULT_USER_ACCOUNT_PASSWORD = "1ho8ISSE0qiUWtdhXz3";
     this.SPAN = "<span class='copy-to-clipboard btn glyphicon glyphicon-copy' data-toggle='tooltip' title='Copy to clipboard' > Copy</span>";
     /**
      * Encode html entity
      */
     this.encodeHtmlEntity = function (str) {
         var buf = [];
         for (var i = str.length - 1; i >= 0; i--) {
             buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
         }
         return buf.join('');
     };
     
     /**
      * Replace values in String 
      */
     this.replaceValues = function (str){
    	 var arrayObjectType = {
    			 		  ":String"		: ":\"String\",",
    		              ":Long" 		: ":100,", 
    		              ":Date" 		: ":\"2016-06-27\",",
    		              ":Integer"	: ":100,",
    		              ":double"		: ":100,",
    		              ":Iterable"	: ":[],",
    		              ":Boolean"	: ":false,",
    		              ":int"		: ":100,",
    		              ":long"		: ":100,",
    		              ":Timestamp"	: ":1470114300,",
    		              ":float"		: ":10.00,",
    		              ":boolean"	: ":true,",
    		              ":char"		: ":\"C\",",		
    		              ":Collection"	: ":[],"
    		           	};
    	 str = str.replace(/\s+/g, ''); //space
    	 str = replaceCollection(str,":Collection"); 
    	 str = replaceCollection(str,":List");
    	 str = replaceAll (str, ",,",",");
    	 str = replaceAll (str, ",}","}");
    	 
    	 var defaultString = str.slice(0);
    	 
    	 
    	 //remove "}" & "{" to find object 
    	 str = replaceAll (str, "}","");
    	 str = replaceAll (str, "{","");
    	
    	
    	 // find unknown object to replace 
    	 var arrayObject = [];
    	 $.each(str.split(","), function (index, value ){
    		 //console.log(value.substring(value.lastIndexOf(":"), value.length + 1));
    		 value = value.substring(value.lastIndexOf(":"), value.length + 1);	 
    		 var i = 0;
    		 $.each(arrayObjectType, function (key, val ){
    			 //console.log ("key = " + key +" value to compare "+ value );
    			 
    			 if (value == key || value == ":[]") {
    				 return false; // found not object
    			 }else if (value != key && i < Object.keys(arrayObjectType).length -1){
    				 i++;
    				 return true; 
    			 }
    			 i++;
    			 //console.log("Object found : " + value);
    			 arrayObject.push(value);
        	 });
        	 
    	 });
    	 
    	 // replace unknown type object with default value
    	 $.each(arrayObject,function(index,value) {
    		 defaultString = replaceAll (defaultString, value, ":\"Object\"");
    	 });
    	 
    	 // replace known type object with default value
    	 for (var key in arrayObjectType) {
    		 defaultString = replaceAll (defaultString, key, arrayObjectType[key]);
    	 }
    	 
    	 defaultString = replaceAll (defaultString, ",,",",");
    	 defaultString = replaceAll (defaultString, ",}","}");
    	
    	 return defaultString;
     }
     
     /**
      * find Collection and replace 
      */
     function replaceCollection(str,collectionString) {
    	 while (str.indexOf(collectionString) != -1) {
    		 var subString = str.substring(str.indexOf(collectionString), str.length + 1);
    		 var collectionToReplace = cut(subString, subString.indexOf(collectionString), subString.indexOf(">"));
    		 str = replaceAll (str, collectionToReplace, ":[],"); 
    	 }
    	 return str;
     }
     
     /**
      * subString
      */
     function cut(str, cutStart, cutEnd){
    	 return str.substring(cutStart , cutEnd +1);
     }
     
     /**
      * replace all value in String  
      */
     function replaceAll(str, find, replace) {
    	  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
     }
     
     function escapeRegExp(string){
    	  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
     }
}

/**
 * Event : window load
 */
$(window).load(function () {
	var helper = new Helper();
	/* Set available link to generate Sample Resource if the content-type equal "application/x-www-form-urlencoded" */ 
	$(".get-model-attribute").each(function(index){
		if ( $(this).data("content-type").indexOf("application/x-www-form-urlencoded") > -1) {
			$(this).closest (".api-path").find (".generate-default-form").show(); 
		}
	});
	
	/* Set available link to generate Sample Resource if the content-type equal "application/json" */
	$(".get-json-body").each(function(index){
		if ( $(this).data("content-type").indexOf("application/json") > -1 ) {
			$(this).closest (".api-path").find (".generate-default-json").show();
		}
	});
	
	/* Set default components tool follow Request Method (GET, POST,...) */
    $("select.request_method").each(function (index) {
        if ($(this).val() == "GET") {
            $(this).closest(".api").find(".request_body").hide(function () {
                $(this).animate({
                    height: 'auto'
                });
            });
        } else {
            $(this).closest(".api").find(".request_body").show(function () {
                $(this).animate({
                    height: 'auto'
                });
            });
        }
    });
    
    /* Choose default component URL to process  */
    if (typeof serverUrls === 'undefined' || serverUrls === null || serverUrls.length < 1) {
        $(".serverUrls").each(function (index) {
            $(this).hide();
        });
        $(".requestUrl").each(function (index) {
            $(this).show();
        });
    } else {
        $(".serverUrls").each(function (index) {
            $(this).show();
        });
        $(".requestUrl").each(function (index) {
            $(this).hide();
        });
    }
    if (typeof isEnableUserSecurity !== 'undefined' && isEnableUserSecurity === true) {
        $(".authorization-dialog").show()
    }
    
    /* Set default User Account Credential */
    $("#loginNameVerifyLoginCredentialsType").val(helper.DEFAULT_USER_ACCOUNT);
    $("#passwordVerifyLoginCredentialsType").val(helper.DEFAULT_USER_ACCOUNT_PASSWORD);
    
    /* Set default radio select */
	$(".api").each(function(index){
		if ( $(this).data("content-type").indexOf("json") > -1 ) {
			$(this).find("input:radio[value='"+helper.applicationJson+"']").attr('checked', 'checked');
			$(this).find(".x_wwww_form").hide();
			$(this).find(".raw").show();
		}else {
			$(this).find("input:radio[value='"+helper.formUrlEncoded+"']").attr('checked', 'checked');
			$(this).find(".x_wwww_form").show();
			$(this).find(".raw").hide();
		}
	});

});

/**
 * Jquery document
 */
 $(function () {
     var helper = new Helper();
     
     InvalidArgumentException.prototype = Error.prototype;
     JsonException.prototype = Error.prototype;
     
     /**
      * Method toJson
      * Description : convert object to json
      * @param values
      * @param rootElement - to pass error output
      */
     function toJson(values, rootElement) {
         try {
             //JSON.stringify(data, null, 4)
             return JSON.stringify(JSON.parse(values), null, 4);
         } catch (error) {
             throw new JsonException(rootElement, error);
         }
     }
     
     /**
      * Method : JsonException
      * @param rootElement
      * @param error
      */
     function JsonException(rootElement, error) {
         rootElement.find("#pre-response-body").empty();
         rootElement.find("#pre-response-body").append(error);
         rootElement.find(".response_body").show(function () {
             $(this).animate({
                 height: 'auto'
             });
         });

     }
     
     /**
      * Method : InvalidArgumentException
      * @param : message
      */
     function InvalidArgumentException(message) {
         alert(message);
     }

     /**
      * Method getData
      * Description : get data from form or json
      * @param contentType
      * @param rootElement 
      */
     function getData(contentType, rootElement) {
         var data;
         /* raw json */
         if (contentType === helper.applicationJson) {
             data = rootElement.find(".raw_request_body").val();
             return toJson(data, rootElement);
         }

         /* x-www-form-urlencode. the default contajaxOptionsent */
         else if (contentType === helper.formUrlEncoded) {
             return toParams(rootElement, ".x_wwww_form  input[name='key[]']", ".x_wwww_form  input[name='param[]']");
         }
         // form/data
     }
     
     /**
      * Method prepareData 
      * Description : prepare before send to server.
      * @param requestMethod
      * @param contentType 
      * @param rootElement 
      */
     function prepareData(requestMethod, contentType, rootElement) {
         if (requestMethod !== "GET") {
             return getData(contentType, rootElement);
         }
     }
     
     /**
      * Method ajaxRequest
      * Description : processing of AJAX send request to server
      * @param url 
      * @param requestMethod
      * @param data
      * @param contentType
      * @param rootElement
      */
     function ajaxRequest(url, requestMethod, data, contentType, rootElement) {
         $.ajaxSetup({
             headers: {
                 Accept: "application/javascript charset=utf-8",
                 Accept: "text/html charset=utf-8",
                 Accept: "application/json; charset=utf-8"
             },
             dataType: 'json',
             cache: false,
             crossDomain: true
         });
         var curl = populateCurl(url, requestMethod, data, contentType);
         rootElement.find("#curl").empty();
         rootElement.find("#curl").append(helper.encodeHtmlEntity(curl));
         rootElement.find("#curl").append(helper.SPAN);
         rootElement.find(".curl-area").show(function () {
             $(this).animate({
                 height: 'auto'
             });
         });
         $.ajax({
                 url: url,
                 type: requestMethod,
                 data: data,
                 contentType: contentType
             })
             // using the done promise callback
             .done(function (data) {
                 console.log(data);
                 try {
                     rootElement.find("#pre-response-body").empty();    
                     rootElement.find("#pre-response-body").append(helper.encodeHtmlEntity(JSON.stringify(data, null, 4)));
                     rootElement.find("#pre-response-body").append(helper.SPAN);
                 } catch (e) {
                     rootElement.find("#pre-response-body").append(data);
                     rootElement.find("#pre-response-body").append(helper.SPAN);
                 }
                 rootElement.find(".response_body").show(function () {
                     $(this).animate({
                         height: 'auto'
                     });
                 });
             })
             // using the fail promise callback
             .fail(function (data, statusText, error) {
                 // show any errors
                 // best to remove for production
                 console.log(data);
                 rootElement.find("#pre-response-body").empty();
                 try {
                     rootElement.find("#pre-response-body").append(JSON.stringify(JSON.parse(data.responseText), null, 4));
                     rootElement.find("#pre-response-body").append(helper.SPAN);
                 } catch (e) {
                     if (data.status == 404) {
                         rootElement.find("#pre-response-body").append(helper.encodeHtmlEntity(data.responseText));
                         rootElement.find("#pre-response-body").append(helper.SPAN);
                     }else if (data.status == 0){
                    	 rootElement.find("#pre-response-body").append(getErrorMessage());
                         rootElement.find("#pre-response-body").append(helper.SPAN);
                     }
                 }
                 rootElement.find(".response_body").show(function () {
                     $(this).animate({
                         height: 'auto'
                     });
                 });
             });
     }

     /*
      * Support method: POST, GET, DELETE, PUT
      * Support content type: "application/json", "application/x-www-form-urlencoded"
      * Not support : "multipart/form-data"
      * */
     function populateCurl(url, requestMethod, data, contentType) {
         var cUrl = [];
        // generate method
        cUrl.push('-X ' + requestMethod.toUpperCase());

        // generate headers
        if (!contentType) {
            contentType = "application/json;charset=UTF-8";
        }

        if (typeof contentType == 'string') {
            contentType = contentType.replace(/\'/g, '\\u0027');
        }
        cUrl.push('--header \'Content-Type : ' + contentType + '\'');

        // generate data
        var isFormData = false;
        var isMultipart = false;

        var type = contentType;
        if (type && type.indexOf('application/x-www-form-urlencoded') === 0) {
            isFormData = true;
        } else if (type && type.indexOf('multipart/form-data') === 0) {
            isFormData = true;
            isMultipart = true;
        }
        if (data) {
            var requestData;
            var body = "";
            if (isFormData) {
                // escape single quote
                body = data.replace(/\'/g, '%27');
            } else {
             // escape single quote
                body = data.replace(/\'/g, '\\u0027');
            }
            cUrl.push('-d \'' + body + '\'');
        }
        return 'curl ' + (cUrl.join(' ')) + ' \'' + url + '\'';
     }
     
     /**
         * Method : getURL Description : get server endpoint url
         * 
         * @param rootElement
         */
     function getURL(rootElement) {
         if (rootElement.find(".url_request").val() === "" && rootElement.find(".url_request").is(":visible")) {
             throw new InvalidArgumentException("Please enter url");
         } else if (rootElement.find(".serverUrl").is(":visible")) {
             if (rootElement.find(".restPaths").val() === "") {
                 throw new InvalidArgumentException("Please enter api path");
             }
             return rootElement.find(".serverUrl").val() + rootElement.find(".restPaths").val();
         } else {
             if (rootElement.find(".restPaths").val() === "") {
                 throw new InvalidArgumentException("Please enter api path");
             }
             return rootElement.find(".url_request").val() + rootElement.find(".restPaths").val();
         }
     }
     
     /**
      * Method : getAccessToken
      * @param rootElement
      */
     function getAccessToken(rootElement) {
         var stringAccessToken = rootElement.find(".access_token").val();
         if (rootElement.find(".cbo_access_token").prop('checked') && stringAccessToken === "") {
             throw new InvalidArgumentException("Please enter accessToken !");
         } else if (rootElement.find(".cbo_access_token").prop('checked') && stringAccessToken) {
             return helper.accessToken + stringAccessToken;
         }
         return "";
     }
     
     /**
      * Method : toParam
      * Description : convert elements to parameter keyValuePair
      * @param rootElement
      */
     function toParams(rootElement, keyStringElement, valueStringElement) {
         var requestParamsKeys = rootElement.find(keyStringElement).map(function () {
             return $(this).val();
         }).get();
         var requestParamsValues = rootElement.find(valueStringElement).map(function () {
             return $(this).val();
         }).get();

         var params = {};
         for (var i = 0; i < requestParamsKeys.length; i++) {
             if (requestParamsKeys[i] === "" || requestParamsValues[i] === "") {
                 continue;
             }
             params[requestParamsKeys[i]] = requestParamsValues[i];
         }
         return $.param(params);
     }

     /**
      * Method : prepareStringParameters
      * Description : prepare parameters as String value
      * @param rootElement
      */
     function prepareStringParameters(rootElement) {

         var params = toParams(rootElement, ".request_param input[name='key[]']", ".request_param input[name='param[]']")

         if (params === "=") {
             return "";
         } else if (rootElement.find(".cbo_access_token").prop('checked')) {
             return "&" + params;
         }
         return "?" + params;
     }
     
     /**
      * Method : prepareURL
      * Description : collection all element ( endpoint-url, accessToken, stringParameters )
      * @param rootElement  
      */
     function prepareURL(rootElement) {
         var url = getURL(rootElement);
         var accessToken = getAccessToken(rootElement);
         var stringParameters = prepareStringParameters(rootElement);
         return url + accessToken + stringParameters;
     }
     
     /**
      * Method : getContentType
      * @param rootElement
      * @param requestMethod
      */
     function getContentType(rootElement, requestMethod) {
         if (requestMethod !== "GET") {
             return rootElement.find("input[type='radio']:checked").val();
         }
         return null;
     }
     
     /**
      * Method : anonymous
      * Description : process of submit button, send api request.
      */
     $(document).on("click", ".submit", function () { //If you want to target a dynamically added or removed element you'll have to use

         var rootElement = $(this).closest(".api"),
             url, requestMethod, contentType, data;

         rootElement.find(".response_body").hide(function () {
             $(this).animate({
                 height: 'auto'
             });
         });
         
         rootElement.find(".curl-area").hide(function () {
             $(this).animate({
                 height: 'auto'
             });
         });
         
         try {
             url = prepareURL(rootElement);
             requestMethod = rootElement.find(".request_method").val();
             contentType = getContentType(rootElement, requestMethod);
             console.log("log request :", url, requestMethod, contentType);
             data = prepareData(requestMethod, contentType, rootElement);
             ajaxRequest(url, requestMethod, data, contentType, rootElement);
         } catch (e) {
             if (e instanceof InvalidArgumentException) {
                 /* do something */
             } else if (e instanceof JsonException) {
                 console.log("Json Exception");
             } else {
                 console.log(e);
             }
         }
         event.preventDefault();
     });
     
     /**
      * Method : anonymous
      * Description : process of click event which get default value JSON body.
      */
     $(document).on ("click",".get-json-body",function (){
    	 
    	 if ( $(this).data("content-type") == "application/json" || $(this).data("content-type").indexOf("application/json") > -1 ) {
    		 $(this).closest (".api-path").find(".api").show(function () {
                 $(this).animate({
                     height: 'auto'
                 });
             });

    		 var stringJson = helper.replaceValues ($(this).text().trim());
        	 var value = stringJson.replace(/\s+/g, '');
        	 try {
        		 value = JSON.stringify(JSON.parse(value), null, 2);
        	 }catch(error) {
        		 
        	 }
        	 
        	 $(this).closest (".api-path").find (".raw_request_body").val(value);
        	 console.log(value);
    	 }
    	 
     });
     
     /**
      * Method : anonymous
      * Description : process of click event which get default value ModelAttribute body.
      */
     $(document).on ("click",".get-model-attribute",function (){
    	 var root = $(this).closest (".api-path");
    	 console.log ($(this).text());
    	 //console.log(helper.replaceValues("{\"glossary\":{\"title\":\"example glossary\",\"GlossDiv\":{\"title\":\"S\",\"GlossList\":{\"GlossEntry\":{\"ID\":\"SGML\",\"GlossSee\":\"markup\"}}}}}"));
    	 var stringJson = helper.replaceValues ($(this).text().trim());
    	 try {
    		 /*** focus ***/
    		 var data = JSON.parse(stringJson);
    		 //var form = root.find(".x_wwww_form").empty();
    		 root.find(".x_wwww_form .row").not(":first").remove();
    		 var form = root.find(".x_wwww_form");
    		 for (var key in data) {
    			    console.log("key : "+ key +" # value : "+  data[key]);
    			    var $template = $(".template"),
    	            $clone = $template.clone().removeClass('hide template');
    			    $clone.find ("input[placeholder='key']").val(key);
    			    $clone.find ("input[placeholder='value']").val(data[key]);
    		 		$clone.appendTo(form);
    		 }
    		 var $template = $(".template"),
	            $clone = $template.clone().removeClass('hide template').appendTo(form);
			    $clone.find ("input[placeholder='key']");
			    $clone.find ("input[placeholder='value']");
			    $clone.appendTo(form);
    		 form.find(".row").last().find("input").addClass ("focus-add");
    		 form.find(".row").last().find("button").addClass ("hidden");
    		 form.show();
   
    		 //$(this).closest (".api-path").find("input[type='radio'][value=" + helper.formUrlEncoded + "]").val("avc");
    		 root.find("input:radio[value='"+helper.formUrlEncoded+"']").attr('checked', 'checked');
    		 root.find(".raw").hide();
    		 root.find(".api").show();
    		 
    	 }catch(error) {
    		 
    	 }
     });
     
     /**
      * Method : anonymous
      * Description : process of click event which get default value JSON body. ** Link 
      */
     $(document).on ("click",".generate-default-json",function (){
    	 if ( $(this).closest (".api-path").find(".get-json-body").data("content-type") == "application/json" || 
    			 $(this).closest (".api-path").find(".get-json-body").data("content-type").indexOf("application/json") > -1 ) {
        	 var stringJson = helper.replaceValues ($(this).closest (".api-path").find(".get-json-body").text().trim());
        	 value = stringJson.replace(/\s+/g, '');
        	 try {
        		 value = JSON.stringify(JSON.parse(value), null, 2);
        	 }catch(error) {
        		 
        	 }
        		 //alert (value);
        	 $(this).closest (".api-path").find (".raw_request_body").val(value);
        	 console.log(value);
    	 }
     });
    
     /**
      * Method : anonymous
      * Description : process of click event which get default value medelAttribute body. ** Link 
      */
     $(document).on ("click",".generate-default-form",function (){
    	 var root = $(this).closest (".api-path");
    	 console.log (root.find(".get-model-attribute").text());
    	 var stringJson = helper.replaceValues (root.find(".get-model-attribute").text().trim());
    	 value = stringJson.replace(/\s+/g, '');
    	 try {
    		 /*** focus ***/
    		 var data = JSON.parse(stringJson);
    		 //var form = root.find(".x_wwww_form").empty();
    		 root.find(".x_wwww_form .row").not(":first").remove();
    		 var form = root.find(".x_wwww_form");
    		 for (var key in data) {
    			    console.log("key : "+ key +" # value : "+  data[key]);
    			    var $template = $(".template"),
    	            $clone = $template.clone().removeClass('hide template');
    			    $clone.find ("input[placeholder='key']").val(key);
    			    $clone.find ("input[placeholder='value']").val(data[key]);
    			    $clone.appendTo(form);
    		 }	
    		 var $template = $(".template"),
	            $clone = $template.clone().removeClass('hide template').appendTo(form);
			    $clone.find ("input[placeholder='key']");
			    $clone.find ("input[placeholder='value']");
			    $clone.appendTo(form);
			    
    		 form.find(".row").last().find("input").addClass ("focus-add");
    		 form.find(".row").last().find("button").addClass ("hidden");
    		 form.show();
   
    		 //$(this).closest (".api-path").find("input[type='radio'][value=" + helper.formUrlEncoded + "]").val("avc");
    		 root.find("input:radio[value='"+helper.formUrlEncoded+"']").attr('checked', 'checked');
    		 root.find(".raw").hide();
    		 root.find(".api").show();
    	 }catch(error) {
    		 
    	 }
     });
    
     /**
      * Method : getDialogBaseUrl
      * Description : get the server endpoint url.
      */
     function getDialogBaseUrl() {
         var rootElement = $(".modal-body");
         if (rootElement.find(".serverUrls").is(":visible")) {
             return $("#dialogServerUrls").val();
         } else if (rootElement.find(".requestUrl").is(":visible") && $("#dialogRequestUrl").val() === "") {
             throw new InvalidArgumentException("Please enter url");
         } else {
             return $("#dialogRequestUrl").val();
         }

     }
     
     
     $.ajaxSetup({
         cache: false,
         data: null,
     });

     /**
      * Method : getBasicKey
      */
     function getBasicKey(username, password) {
         return "Basic " + window.btoa(username + ":" + password);
     }
     
     /**
      * Description : process of login with User Account Credential 
      */
     $("#verifyUserAccountCredentialsTypeButton").button().click(
         function () {
             try {
                 $("#verifyUserAccountCredentialsTypeResponse").hide();
                 var baseUrl = getDialogBaseUrl();
                 var userName = $("#loginNameVerifyLoginCredentialsType").val();
                 var loginPassword = $("#passwordVerifyLoginCredentialsType").val();
                 $.ajax({
                     type: "POST",
                     url: baseUrl + helper.endpointApiUrl + "/oauth2/token",
                     data: {
                         grant_type: "client_credentials",
                     },
                     beforeSend: function (request) {
                         request.setRequestHeader('Authorization', getBasicKey(userName, loginPassword));
                     },
                     dataType: "text",
                     error: function (jqXHR, textStatus, errorThrown) {
                         console.log(jqXHR, textStatus, jqXHR.status);
                         if (jqXHR.status == 404) {
                             $("#verifyUserAccountCredentialsTypeResponse").empty();
                             $("#verifyUserAccountCredentialsTypeResponse").append(helper.encodeHtmlEntity(jqXHR.responseText));
                             $("#verifyUserAccountCredentialsTypeResponse").show();
                         } else if (jqXHR.status == 0){
                        	 $("#verifyUserAccountCredentialsTypeResponse").empty();
                        	 $("#verifyUserAccountCredentialsTypeResponse").append(getErrorMessage());
                        	 $("#verifyUserAccountCredentialsTypeResponse").show();
                         } else {
                             var jsonString = JSON.stringify(JSON.parse(jqXHR.responseText), null, 2);
                             $("#verifyUserAccountCredentialsTypeResponse").empty();
                             $("#verifyUserAccountCredentialsTypeResponse").append(jsonString);
                             $("#verifyUserAccountCredentialsTypeResponse").show();
                         }

                     },
                     success: function (data, textStatus, jqXHR) {
                         console.log(data);
                         var objectResponse = JSON.parse(data);
                         helper.stringAccessToken = objectResponse.access_token;
                         $(".access_token").val(helper.stringAccessToken);
                         var jsonString = JSON.stringify(JSON.parse(data), null, 2);
                         $("#verifyUserAccountCredentialsTypeResponse").empty();
                         $("#verifyUserAccountCredentialsTypeResponse").append(jsonString);
                         $("#verifyUserAccountCredentialsTypeResponse").show();
                     },
                     complete: function (jqXHR, textStatus) {

                     }
                 });
             } catch (e) {

             }
     });
     
     /**
      * Description : process of login with User Resource Owner 
      */
     $("#verifyLoginButton").button().click(
         function () {
             $("#verifyLoginResponse").hide();
             var baseUrl = getDialogBaseUrl();
             console.log(baseUrl);
             console.log($("#loginNameVerifyLogin").val(), $("#passwordVerifyLogin").val());
             $.ajax({
                 type: "POST",
                 url: baseUrl + helper.endpointApiUrl + "/oauth2/token" + helper.accessToken + helper.stringAccessToken,
                 data: {
                     username: $("#loginNameVerifyLogin").val(),
                     password: $("#passwordVerifyLogin").val(),
                     grant_type: "password"
                 },
                 dataType: "text",
                 error: function (jqXHR, textStatus, errorThrown) {
                     if (jqXHR.status == 404) {
                         $("#verifyLoginResponse").empty();
                         $("#verifyLoginResponse").append(helper.encodeHtmlEntity(jqXHR.responseText));
                         $("#verifyLoginResponse").show();
                     }else if (jqXHR.status == 0){
                    	 $("#verifyLoginResponse").empty();
                         $("#verifyLoginResponse").append(getErrorMessage());
                         $("#verifyLoginResponse").show();
                         
                     } else {
                         var jsonString = JSON.stringify(JSON.parse(jqXHR.responseText), null, 2);
                         $("#verifyLoginResponse").empty();
                         $("#verifyLoginResponse").append(jsonString);
                         $("#verifyLoginResponse").show();
                     }
                 },
                 success: function (data, textStatus, jqXHR) {
                     var objJson = JSON.parse(data);
                     var jsonString = JSON.stringify(objJson, null, 2);
                     helper.stringAccessToken = objJson.access_token;
                     $(".access_token").val(helper.stringAccessToken);
                     
                     $("#verifyLoginResponse").empty();
                     $("#verifyLoginResponse").append(jsonString);
                     $("#verifyLoginResponse").show();
                 },
                 complete: function (jqXHR, textStatus) {

                 }
             });
     });
     
     /**
      * Method : getErrorMessage
      * Description : get default error message when Access-Control-Allow-Origin
      */
     function getErrorMessage(){
    	 return JSON.stringify({"httpCode": 404,"message": "No 'Access-Control-Allow-Origin' header is present on the requested resource"}, null, 2);
     }
     
     /**************************** functions support UI ***********************/
     
     /**
      * Event : change
      * Description : disable or enable accessToken  
      */
     $(":checkbox").change(function () {
         if (this.checked) {
             $(this).closest(".row").find("input[type=text]").prop('disabled', false);
             if (typeof isEnableUserSecurity !== 'undefined' && isEnableUserSecurity === true) {
                $(this).closest(".row").find(":button").show();
             }
         } else {
             $(this).closest(".row").find("input[type=text]").prop('disabled', true);
             $(this).closest(".row").find(":button").hide();
         }
     });
     
     /**
      * Event : click
      * Description : select request method and animate components
      */
     $("select").bind("click", function () {
         if ($(this).hasClass("request_method")) {
             if ($(this).val() == "GET") {
                 $(this).closest(".api").find(".request_body").hide(function () {
                     $(this).animate({
                         height: 'auto'
                     });
                 });
             } else {
                 $(this).closest(".api").find(".request_body").show(function () {
                     $(this).animate({
                         height: 'auto'
                     });
                 });
             }
         }
     });

     /**
      * Event : click
      * Description : switch UI between x-www-from-encoded and json
      */
     $(":radio").bind("click", function () {
         if ($(this).val() === helper.formUrlEncoded) {
             $(this).closest(".api").find(".x_wwww_form").show(function () {
                 $(this).animate({
                     height: 'auto'
                 });
             });
             $(this).closest(".api").find(".raw").hide(function () {
                 $(this).animate({
                     height: 'auto'
                 });
             });
         } else if ($(this).val() === helper.applicationJson) {
             $(this).closest(".api").find(".x_wwww_form").hide(function () {
                 $(this).animate({
                     height: 'auto'
                 });
             });
             $(this).closest(".api").find(".raw").show(function () {
                 $(this).animate({
                     height: 'auto'
                 });
             });
         }
     });

     /**
      * Event : button click 
      * Description : Animate of request params button
      */
     $("button").bind("click", function () {
         if ($(this).hasClass("param")) {
        	 $(this).closest(".api").find(".request_param").slideToggle();
         }
     });

     /**
      * Event : click 
      * Description : remove row of keyValuePair 
      */
     $(document).on("click", ".removeButton", function () { //If you want to target a dynamically added or removed element you'll have to use

         if ($(this).closest(".row").parent().hasClass("x_wwww_form")) {
             removeObject($(this));
         } else if ($(this).closest(".row").parent().hasClass("request_param")) {
             removeObject($(this));
         }
     });
     
     /**
      * Method : removeObject
      * Description : clone row of KeyValuePair
      * @param currentElement
      */
     function removeObject(currentElement) {
         currentElement.parents('.row').remove();
     }
     
     /**
      * Event : Focus 
      * Description : Focus to add 
      */
     $(document).on("focus",".focus-add", function(){
    	//$(this).css("background-color","red"); 
    	if ($(this).closest(".row").parent().hasClass("x_wwww_form")) {
    		
    		/** form **/
    		$(this).closest(".row").find("button").removeClass("hidden");
    		$(this).closest(".row").find("input").removeClass("focus-add");
            cloneObject($(this).closest(".x_wwww_form"));
        
    	} else if ($(this).closest(".row").parent().hasClass("request_param")) {
        	
        	/** query parameter **/
        	$(this).closest(".row").find("button").removeClass("hidden");
    		$(this).closest(".row").find("input").removeClass("focus-add");
            cloneObject($(this).closest(".request_param"));
        
        }
     });
     
     /**
      * Method : cloneObject
      * Description : clone template object
      * @param parentElement
      */
     function cloneObject(parentElement) {
         var $template = $(".template"),
           	 $clone = $template.clone().removeClass('hide template'); 
         
         	 $clone.find("button").addClass("hidden");
         	 $clone.find("input").addClass("focus-add");
         	 $clone.appendTo(parentElement);
     }
     
     /**
      * Event : click 
      * Description : toggle API tools
      */
     $(document).on("click", ".api-toggle", function () {
    	 $(this).next(".api").slideToggle();
     });
     
     /**
      * Event : click 
      * Description : toggle api-description (child)
      */
     $(document).on ("click",".api-slide-toggle",function () {
    	 //$(this).next().next().slideToggle();
    	 $(this).closest(".row").next().slideToggle();
    	 
     });
     
     $(document).on ("click",".api-slide-toggle-all",function () {
         //$(this).next().next().slideToggle();
         var buttonAPISlideToggle = $('.api-slide-toggle-all');
         $(".api-slide-toggle").closest(".row").next().slideToggle(function () {
             $(this).is(':hidden') ? buttonAPISlideToggle.text('Expand') : buttonAPISlideToggle.text('Collapse');
         });
     });
     
     /**
      * Event : click 
      * Description : toggle api-parent
      */
     $(document).on ("click",".api-slide-toggle_one_level",function () {
    	 //$(this).next().slideToggle();
    	 if ( $(this).data('goto') == false) {
    		 $(this).data('goto', true);
    	 }else {
    		 $(this).next().slideToggle();
    	 } 
     });
     
     /**
      * window scroll event
      */
     $(window).scroll(function(event){
    	 if ( helper.hash == window.location.hash.substr(1)) {
    		 $("a[data-goto]").data('goto', false);
    	 } else {
    		 helper.hash = window.location.hash.substr(1);
    		 $("a[id = '"+helper.hash+"']").data('goto',true);
        	 $("a[id != '"+helper.hash+"']").data('goto',false);
    	 }
     }); 
     
     /**
      * Event : click 
      * Description : toggle next object
      */
     $(document).on ("click",".description-toggle",function () {
    	 $(this).nextUntil("h3").not("a, div").slideToggle();
     });
     
     /**
      *  copy to clipboard
      */
     var copyCode = new Clipboard('.copy-to-clipboard', {
    	    target: function(trigger) {
    	        return trigger.parentElement;
    	    }
     });
     /**
      * event success or fail
      */
     copyCode.on('success', function(event) {
    	    event.clearSelection();
    	    event.trigger.textContent = ' Copied';
    	    window.setTimeout(function() {
    	        event.trigger.textContent = ' Copy';
    	    }, 1000);
     });
     copyCode.on('error', function(event) { 
    	    event.trigger.textContent = ' Press "Ctrl + C" to copy';
    	    window.setTimeout(function() {
    	        event.trigger.textContent = ' Copy';
    	    }, 1500);
     });
     // Initialize the tooltip.
     $('[data-toggle="tooltip"]').tooltip();
     /**
      * Mouse enter & leave event 
      */
     $( "pre" ).has( "span" )
     .mouseenter(function() {
       $(this).find("span").css("opacity",100);
     })
     .mouseleave(function() {
       $(this).find("span").css("opacity",0);
     });
     
 });
 
 
