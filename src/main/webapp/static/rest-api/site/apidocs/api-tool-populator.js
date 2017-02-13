/****************************************************************
 * api-tool-populator.js 
 * Description : using this script to populate api-tool elements. 
 ****************************************************************/

/* Constant value */
var consts = {
    TITLE_USER_ACCOUNT: 'Client credentials type. ',
    TITLE_LOGIN_AUTHORIZATION: 'Resource owner password. ',

    USER_ACCOUNT: "user-account",
    LOGIN_NAME_VERIFY_LOGIN_CREDENTIALS_TYPE: "loginNameVerifyLoginCredentialsType",
    PASSWORD_VERIFY_LOGIN_CREDENTIALS_TYPE: "passwordVerifyLoginCredentialsType",
    VERIFY_USER_ACCOUNT_CREDENTIALS_TYPE_BUTTON: "verifyUserAccountCredentialsTypeButton",
    VERIFY_USER_ACCOUNT_CREDENTIALS_TYPE_RESPONSE: "verifyUserAccountCredentialsTypeResponse",
    VERIFY_USER_ACCOUNT_CREDENTIALS_TYPE_RESPONSE_CODE: "verifyUserAccountCredentialsTypeResponseCode",

    LOGIN_AUTHORIZATION: "login-authorization",
    LOGIN_NAME_VERIFY_LOGIN: "loginNameVerifyLogin",
    PASSWORD_VERIFY_LOGIN: "passwordVerifyLogin",
    VERIFY_LOGIN_BUTTON: "verifyLoginButton",
    VERIFY_LOGIN_RESPONSE: "verifyLoginResponse",
    VERIFY_LOGIN_RESPONSE_CODE: "verifyLoginResponseCode"
   
};

/**************************** Group tools populate ***********************/

/**
 * Method : populateElement
 * Description : populate HTML Element 
 * @param elementName
 * @param attrs
 * @param childElements
 * @param textNode
 * @returns
 */
function populateElement(elementName, attrs, childElements, textNode) {

    var element = document.createElement(elementName);

    // add attributes
    if (attrs != null) {
        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                var attr = document.createAttribute(key);
                attr.value = attrs[key];
                element.setAttributeNode(attr);
            }
        }
    }
    // appendChild node
    if (childElements != null) {
        for (var i = 0; i < childElements.length; i++) {
            element.appendChild(childElements[i]);
        }
    }
    // appendChild text
    if (textNode != null) {
        var text = document.createTextNode(textNode);
        element.appendChild(text);
    }

    return element;
}
/**
 * Method : convert child elements to array 
 * @returns
 */
function toArray(){
	return Array.from(arguments);
}
/**
 * Method : populate input field
 * @param attrs
 */
function populateInputField(attrs) {
    return populateElement("input", attrs);
}

/**
 * Method : populate Options
 * Description : populate Options
 * @param requestMethod
 */
function populateOptions(requestMethod) {

    var selected = {
        "selected": "selected"
    };
    switch (requestMethod) {
        case "GET":
            return setDefaultOptions(selected, null, null, null);
        case "POST":
            return setDefaultOptions(null, selected, null, null);
        case "PUT":
            return setDefaultOptions(null, null, selected, null);
        case "DELETE":
            return setDefaultOptions(null, null, null, selected);
        default:
            return setDefaultOptions(selected, null, null, null);
    }

}

/**
 * Method : setDefaultOptions
 * Description : set default option
 */
function setDefaultOptions(optGet, optPost, optPut, optDelete) {
    var options = [];
    options.push(populateElement("option", optGet, null, "GET"));
    options.push(populateElement("option", optPost, null, "POST"));
    options.push(populateElement("option", optPut, null, "PUT"));
    options.push(populateElement("option", optDelete, null, "DELETE"));
    return options;
}

/**
 * Method : populateServerUrls
 * Description : populate list Server Urls from readme-docrest.txt
 * @param urls
 */
function populateServerUrls(urls) {
    var options = [], columns = [], select, button, lable;
    
    if (typeof urls !== 'undefined' & urls !== null) {
        urls.forEach(function (value, index, array) {
            // here value is the array element being iterated
            options.push(populateElement("option", null, null, value));
        });
    }
    
    select = populateElement("select", {
        "class": "form-control serverUrl"
    }, options);
    
    label = populateElement("label", null, null, "Server URL");
    
    button = populateElement("button", {
        "type": "button",
        "class": "btn btn-primary submit",
        "style": "width :100%"
    }, null, "Send");
    
    columns.push ( populateElement("div", { "class": "col-md-2"}, toArray(label)) );
    columns.push ( populateElement("div", { "class": "col-md-8" }, toArray(select)) );
    columns.push ( populateElement("div", { "class": "col-md-2"}, toArray(button)) );

    return populateElement("div", {"class": "row serverUrls"}, columns);
}
/** <<<<< End : populateServerUrls >>>>> */


/**
 * Method : populateRequestUrl 
 * Description : populate RequestUrl. This method will use when the populateServerUrls () method is not defined.
 */
function populateRequestUrl() {
	var columns = [], label, inputfield, button;
	
    label = populateElement("label", null, null, "Server URL");
    columns.push (populateElement("div", {"class": "col-md-2"}, toArray(label)));
    
    inputField = populateInputField({
        "type": "text",
        "class": "form-control col-md-8 url_request",
        "placeholder": "Enter request URL"
    });
    columns.push ( populateElement("div", {
       "class": "col-md-8"
    }, toArray(inputField)) );

    button = populateElement("button", {
        "type": "button",
        "class": "btn btn-primary submit",
        "style": "width :100%"
    }, null, "Send");
    
    columns.push( populateElement("div", {"class": "col-md-2"}, toArray(button)) );

    return populateElement("div", {"class": "row requestUrl"}, columns);
}
/** <<<<< End : populateRequestUrl >>>>> */


/**
 * Method : populateRestPath
 * Description : populate rest path url with default value
 * @param requestMethod
 * @param restPath 
 */
function populateRestPath(requestMethod, restPath) {
	var columns = [], label, inputfield, button, span, input, inputGroup, option, select, spanGroupButton;
    
	label = populateElement("label", null, null, "REST API");
    columns.push( populateElement("div", {
        "class": "col-md-2"
    }, toArray(label) ));

    inputField = populateInputField({
        "type": "text",
        "class": "form-control col-md-8 restPaths",
        "placeholder": "Enter API Path",
        "value": restPath
    });
    
    button = populateElement("button", {
        "type": "button",
        "class": "btn btn-default param"
    }, null, "Param");
    span = populateElement("span", {
        "class": "input-group-btn"
    }, toArray(button));
    
    inputGroup = populateElement("div", {
        "class": "input-group"
    }, toArray(inputField, span));
    
    columns.push ( populateElement("div", {
        "class": "col-md-8"
    }, toArray(inputGroup)) );

    options = populateOptions(requestMethod);
    select = populateElement("select", {
        "class": "form-control request_method"
    }, options);

    spanGroupButton = populateElement("span", {
        "class": "input-group-btn"
    }, toArray(select));
    columns.push ( populateElement("div", {
        "class": "col-md-2"
    }, toArray(spanGroupButton)) );
    return populateElement("div", {"class": "row"},columns);
}
/** <<<<< End : populateRestPath >>>>> */


/**
 * Method : populateRequestParam
 * Description : populate request param for GET 
 * @param keyValuePairs
 */
function populateRequestParam(keyValuePairs) {
    rows = getPrameterKeyValuePairRows (keyValuePairs);
    var attrs = keyValuePairs.length > 0 ? {"class": "request_param"}: {"class": "request_param", "style" :"display:none;"};
    return populateElement("div",attrs, rows);
}

/**
 * Method : anonymous
 * Description : create row of key-value-pair  
 */
var keyValueForm = function(focusClassName, hiddenClassName, key, value) {
	
	var columns = [], inputFiend, span, button;;
    inputField = populateInputField({
        "type": "text",
        "class": "form-control col-md-4 keys "+ focusClassName,
        "name": "key[]",
        "placeholder": "key",
        "value" : key
    });
    columns.push ( populateElement("div", {
        "class": "col-md-4 col-md-offset-2"
    }, toArray(inputField)) );

    inputField = populateInputField({
        "type": "text",
        "class": "form-control col-md-4 values "+ focusClassName,
        "name": "param[]",
        "placeholder": "value",
        "value" : value
    });
    columns.push (populateElement("div", { "class": "col-md-4" }, toArray(inputField)));
    
    span = populateElement("span", {
        "class": "glyphicon glyphicon-minus"
    });
    button = populateElement("button", {
        "type": "button",
        "class": "btn btn-danger removeButton " + hiddenClassName,
        "style": "padding: 9px 12px;"
    }, toArray(span));
    columns.push (populateElement("div", {
        "class": "col-md-1"
    }, toArray(button)) );
    
    var row = populateElement("div", {
        "class": "row"
    }, columns);
    
    return row;
}

/**
 * Method : getPrameterKeyValuePairRows
 * Description : get key-value-pair *rows  
 */
function getPrameterKeyValuePairRows (keyValuePairs) {
	var rows = [], inputFiend, span, button;
	
	if (keyValuePairs.length > 0) {
        
		for (var index in keyValuePairs) {
			var key = keyValuePairs[index].key; var value = keyValuePairs[index].value;
	        rows.push(keyValueForm("","", key, value));
		}
	}
	
    rows.push(keyValueForm("focus-add","hidden", "", ""));
    return rows;
}
/** <<<<< End : populateRequestParam >>>>> */


/**
 * Method : populateAccessToken
 * Description : populate access token row 
 */
function populateAccessToken() {
	var  columns= [] , checkbox, label, inputField, button;
    
	checkbox = populateInputField({
        "type": "checkbox",
        "class": "cbo_access_token"
    });
    label = populateElement("label", null, toArray(checkbox), "AccessToken");
    classCheckbox = populateElement("div", {
        "class": "checkbox"
    }, toArray(label));
    columns.push ( populateElement("div", {
        "class": "col-md-2"
    }, toArray(classCheckbox)) );

    inputField = populateInputField({
        "type": "text",
        "class": "form-control col-md-8 access_token",
        "placeholder": "Enter AccessToken",
        "disabled": "true"
    })
    columns.push ( populateElement("div", {
        "class": "col-md-8"
    }, toArray(inputField)) );
    
    button = populateElement("button", {
        "type": "button",
        "class": "btn btn btn-link",
        "style": "padding-left: 0px; display:none;",
        "data-toggle":"modal",
        "data-target":"#auth-dialog-modal"
    }, null, "Generate AccessToken");
    columns.push ( populateElement("div", {
        "class": "col-md-1 "
    }, toArray(button)));
    
    return populateElement("div", {"class": "row"},columns);
}

/** <<<<< End : populateAccessToken >>>>> */


/**
 * Method : populateRequestBody
 * Description : populate Request body row for both raw (json) and x-www-from-urlencode 
 * @param number - index of api test
 */
function populateRequestBody(number) {
    var rows = [], columns = [], radio, firstLable, secondLable, inputField, button, span, label, textare;
	radio = populateInputField({
        "type": "radio",
        "name": "radio_" + number,
        "value": "application/x-www-form-urlencoded; charset=utf-8",
        "id": "form-urlencoded"
    });
    firstLabel = populateElement("label", {
        "class": "radio-inline"
    }, toArray(radio), "x-www-form-urlencode");

    radio = populateInputField({
        "type": "radio",
        "name": "radio_" + number,
        "value": "application/json; charset=utf-8",
        "id": "json"
    });
    secondLabel = populateElement("label", {
        "class": "radio-inline"
    }, toArray(radio), "raw");
    
    columns.push ( populateElement("div", {
        "class": "col-md-4 col-md-offset-2"
    }, toArray(firstLabel, secondLabel)));
    
    rows.push ( populateElement("div", { "class": "row"}, columns ));
    
    columns = [];
    inputField = populateInputField({
        "type": "text",
        "class": "form-control col-md-4 keys focus-add",
        "name": "key[]",
        "placeholder": "key"
    });
    columns.push ( populateElement("div", {
        "class": "col-md-4 col-md-offset-2"
    }, toArray(inputField)));
    
    inputField = populateInputField({
        "type": "text",
        "class": "form-control col-md-4 values focus-add",
        "name": "param[]",
        "placeholder": "value"
    });
    columns.push ( populateElement("div", {
        "class": "col-md-4"
    }, toArray(inputField)));
    
    
    span = populateElement("span", {
        "class": "glyphicon glyphicon-minus"
    });
    button = populateElement("button", {
        "type": "button",
        //"class": "btn btn-success addButton",
        "class": "btn btn-danger removeButton hidden",
        "style": "padding: 9px 12px;"	
    }, toArray(span));
    
    columns.push ( populateElement("div", {
        "class": "col-md-1"
    }, toArray(button)));
    
    var childRow = populateElement("div", {
        "class": "row"
    },columns);
    
    columns = [];
    button = populateElement("button", {
        "type": "button",
        "class": "btn btn btn-link generate-default-form",
        "style": "display : none;"
        
    }, null, "Sample resource");
    
    columns.push ( populateElement("div", {
        "class": "col-md-2 col-md-offset-2",
        "style": "padding-left: 2px;"	
    }, toArray(button)));
    
    var childRow2 = populateElement("div", {
        "class": "row" 
    },columns);
    
    rows.push ( populateElement("div", {
        "class": "x_wwww_form"
    }, toArray(childRow2,childRow)));
    
    columns = [];
    label = populateElement("label", {
        "for": "raw_request_body"
    }, null, "Body:");
    button = populateElement("button", {
        "type": "button",
        "class": "btn btn btn-link generate-default-json",
        "style": "display : none;" 
    }, null, "Sample resource");
    textare = populateElement("textarea", {
        "class": "form-control raw_request_body",
        "rows": "10",
        "style": "resize: none;"
    });
    columns.push ( populateElement("div", {
        "class": "col-md-8 col-md-offset-2"
    }, toArray(label, button, textare)));
    rows.push (populateElement("div", {
        "class": "row raw"
    }, columns));

    return populateElement("div", {
        "class": "request_body"
    }, rows);
}
/** <<<<< End : populateRequestBody >>>>> */


/**
 * Method : populateResponseBody
 * Description : populate response body area
 */
function populateResponseBody() {
	var pre, label, column, span;
    label = populateElement("label", null, null, "Response Body:");
    span = populateElement("span");
    pre = populateElement("pre", {
        "style": "background-color: #ffffff; position:relative;", id:"pre-response-body"
    },toArray(span));
    column = populateElement("div", {
        "class": "col-md-8 col-md-offset-2"
    }, toArray(label, pre));
    return populateElement("div", {
        "class": "row response_body"
    }, toArray(column));
}
/** <<<<< End : populateResponseBody >>>>> **/

/*
 * Method: populateCurlElement
 * Description: populate curl area
 * */
function populateCurlElement(){
    
    var pre, label, column, span;
    label = populateElement("label", null, null, "Curl");
    span = populateElement("span");
    pre = populateElement("pre", {
        "style": "background-color: #ffffff; position:relative;", id:"curl"
    },toArray(span));
    column = populateElement("div", {
        "class": "col-md-8 col-md-offset-2"
    }, toArray(label, pre));
    return populateElement("div", {
        "class": "row curl-area hide-element"
    }, toArray(column));
}

/* <<<<<<< End: populateCurl >>>>>>>>>*/

/**
 * Method : populateTemplate
 * Description : populate template for row KeyValuePair 
 */
function populateTemplate() {
    var columns= [], inputfield, span, button;
    
	inputField = populateInputField({
        "type": "text",
        "class": "form-control col-md-4 keys",
        "name": "key[]",
        "placeholder": "key"
    });
	
	columns.push ( populateElement("div", {
        "class": "col-md-4 col-md-offset-2"
    }, toArray(inputField)));
	
    inputField = populateInputField({
        "type": "text",
        "class": "form-control col-md-4 values",
        "name": "param[]",
        "placeholder": "value"
    });
    columns.push ( populateElement("div", {
        "class": "col-md-4"
    }, toArray(inputField)));

    span = populateElement("span", {
        "class": "glyphicon glyphicon-minus"
    });
    
    button = populateElement("button", {
        "type": "button",
        "class": "btn btn-danger removeButton",
        "style": "padding: 9px 12px;"
    }, toArray(span));
    columns.push (populateElement("div", {
        "class": "col-md-1"
    }, toArray(button)));
    return populateElement("div", {"class": "row hide template"},columns);
}
/** <<<<< End : populateTemplate >>>>> */

/**
 * Method : isEnableServerUrls 
 * Description : check if User enableServerUrls
 * @return
 */
function isEnableServerUrls() {
    return (typeof serverUrls === 'undefined' || serverUrls === null || serverUrls.length < 1) ? false : true;
}
/** <<<<< End : isEnableServerUrls >>>>> */


/**
 * Method : enableUserSecurity 
 * Description : check if User enableUserSecurity 
 * @return
 */
function enableUserSecurity () {
    return (typeof isEnableUserSecurity !== 'undefined' && isEnableUserSecurity === true ) ? true : false ;
}
/** <<<<< End : enableUserSecurity >>>>> */


/**
 * Method : populateAPI 
 * Description : populate test-tool for test APIs.
 */
function populateAPI(index, contentType, requestMethod, restPath, keyValuePairs, urls) {
	var rows = [];
	rows.push ( populateServerUrls(urls) );
	rows.push ( populateRequestUrl() );
	rows.push ( populateRestPath(requestMethod, restPath) );
	rows.push ( populateRequestParam(keyValuePairs) );
	rows.push ( populateAccessToken() );
	rows.push ( populateRequestBody(index) );
	rows.push ( populateCurlElement() );
	rows.push ( populateResponseBody() );

    return populateElement("div", { "class": "api well wellCustom", "data-content-type" : contentType }, rows);
}
/** <<<<< End : populateAPI >>>>> */


/**************************** Group Dialog ***********************/

/**
 * Method : populateDialogServerUrlsRow 
 * Description : check if User enableServerUrls
 * @param urls
 * @return
 */
function populateDialogServerUrlsRow(urls) {
	var h5, options = [], select, column;
    
	h5 = populateElement("h5", null, null, "Server URL");
   
    if (typeof urls !== 'undefined' & urls !== null) {
        urls.forEach(function (value, index, array) {
            // here value is the array element being iterated
            options.push(populateElement("option", null, null, value));
        });
    }
    select = populateElement("select", {
        "class": "form-control",
        "id": "dialogServerUrls"
    }, options);
    column = populateElement("div", {
        "class": "col-md-12"
    }, toArray(h5, select));
    
    return populateElement("div", {
        "class": "row serverUrls"
    }, toArray(column));
}

/**
 * Method : populateDialogRequestUrl 
 * Description : populate dialog Request url. This method will use when the populateDialogServerUrlsRow () method is not defined.
 */
function populateDialogRequestUrl() {
	var h5, inputField, column;
    h5 = populateElement("h5", null, null, "Server URL");
    inputField = populateInputField({
        "type": "text",
        "class": "form-control",
        "id": "dialogRequestUrl",
        "placeholder": "Enter request URL"
    });
    column = populateElement("div", {
        "class": "col-md-12"
    }, toArray(h5, inputField));

    return populateElement("div", {
        "class": "row requestUrl"
    }, toArray(column));
}

/**
 * Method : populateDialogBody 
 * Description : populate dialog body.
 */
function populateDialogBody(title, mainClass, loginId, passwordId, buttonId, responseId,account,password) {
	var p, post, inputField, pre, button, column, rows = [];
    p = populateElement("p", {
        "style": "color:#fff; font-weight: bold; font-size:14px;"
    }, null, title + "POST : /api/oauth2/token");
    post = populateElement("div", {
        "style": "background-color: #cc0000; padding: 10px 5px"
    }, toArray(p));
    column = populateElement("div", {
        "class": "col-md-12"
    }, toArray(post));
    rows.push (populateElement("div", {
        "class": "row"
    }, toArray(column)));

    inputField = populateInputField({
        "type": "text",
        "class": "form-control",
        "placeholder": "Login name",
        "id": loginId,

    });
    column = populateElement("div", {
        "class": "col-md-12"
    }, toArray(inputField));
    rows.push (populateElement("div", {
        "class": "row"
    }, toArray(column)));

    inputField = populateInputField({
        "type": "password",
        "class": "form-control",
        "placeholder": "Password",
        "id": passwordId,
    });
    column = populateElement("div", {
        "class": "col-md-12"
    }, toArray(inputField));
    rows.push ( populateElement("div", {
        "class": "row"
    }, toArray(column)));

    pre = populateElement("pre", {
        "id": responseId
    }, null, "Response Body");
    column = populateElement("div", {
        "class": "col-md-12"
    }, toArray(pre));
    rows.push ( populateElement("div", {
        "class": "row response",
        "style": "display: block;"
    }, toArray(column)));
    
    button = populateElement("button", {
        "class": "btn btn-primary btn-block",
        "style": "margin-bottom : 10px;",
        "id": buttonId
    }, null, "Submit");
    column = populateElement("div", {
        "class": "col-md-offset-8 col-md-4"
    }, toArray(button));
    rows.push( populateElement("div", {
        "class": "row"
    }, toArray(column)));
    return populateElement("div", {
        "class": mainClass
    }, rows);

}

/**
 * Method : anonymous 
 * Description : populate full dialog.
 */
var dialog = function (urls) {
	var span, button, h4;
    
	span = populateElement("span", {
        "aria-hidden": "true"
    }, null, "x");
    button = populateElement("button", {
            "type": "button",
            "class": "close",
            "data-dismiss": "modal",
            "aria-label": "close"
        },
        toArray(span));

    h4 = populateElement("h4", {
        "class": "modal-title",
        "id": "gridModalLabel"
    }, null, "Authorization");
    var modalHeader = populateElement("div", {
        "class": "modal-header"
    }, toArray(button, h4));
    
    var requestUrl = populateDialogRequestUrl();
    var requestServerUrl = populateDialogServerUrlsRow(urls);
    
    var userAccount = populateDialogBody(consts.TITLE_USER_ACCOUNT, 
    									 consts.USER_ACCOUNT, 
    									 consts.LOGIN_NAME_VERIFY_LOGIN_CREDENTIALS_TYPE, 
    									 consts.PASSWORD_VERIFY_LOGIN_CREDENTIALS_TYPE, 
    									 consts.VERIFY_USER_ACCOUNT_CREDENTIALS_TYPE_BUTTON, 
    									 consts.VERIFY_USER_ACCOUNT_CREDENTIALS_TYPE_RESPONSE);
    
    var loginAuthorization = populateDialogBody(consts.TITLE_LOGIN_AUTHORIZATION, 
                                                consts.LOGIN_AUTHORIZATION, 
                                                consts.LOGIN_NAME_VERIFY_LOGIN, 
                                                consts.PASSWORD_VERIFY_LOGIN, 
                                                consts.VERIFY_LOGIN_BUTTON, 
                                                consts.VERIFY_LOGIN_RESPONSE);
    var containerBody = populateElement("div", {"class": "container-fluid"}, 
                                        toArray(
                                                requestUrl,
                                                requestServerUrl,
                                                populateElement("hr"),
                                                userAccount, 
                                                loginAuthorization
                                        ));
    var modalBody = populateElement("div", {
        "class": "modal-body"
    }, toArray(containerBody));
    
    /* 
    var buttonDismiss = populateElement("button", {"type" : "button", "class" : "btn btn-default", "data-dismiss" : "modal"},null,"Close");
    var modalFooter = populateElement ("div",{"class" : "modal-footer"},toArray(buttonDismiss));
    */
    var modalContent = populateElement("div", {
        "class": "modal-content"
    }, toArray(modalHeader, modalBody));


    var modalDialog = populateElement("div", {
        "class": "modal-dialog",
        "role": "document"
    }, toArray(modalContent));

    var modal = populateElement("div", {
        "class": "modal fade",
        "id": "auth-dialog-modal",
        "tabindx": "-1",
        "role": "dialog",
        "aria-labelledby": "gridModalLabel",
        "aria-hidden": "true"
    }, toArray(modalDialog));

    var popUpDialog = populateElement("button", {
        "type": "button",
        "class": "btn btn-md btn-dialog-popup hidden-print",
        "data-toggle": "modal",
        "data-target": "#auth-dialog-modal",
        "style": "margin-bottom: 20px"
    }, null, "Authorization");
    return populateElement("div", null, toArray(modal, popUpDialog));
}

/**
 * Method :  
 * Description : Jquery function 
 */
$(function () {
    // populate api tool
    $(".api-toggle").each(function (index) {
        /* auto populate request method "GET, POST, PUT, DELETE" */
        var requestMethod = $(this).data("request-method");
        if (requestMethod.trim().indexOf(',') > -1) {
            requestMethod = requestMethod.trim().slice(0, requestMethod.indexOf(','));
        }

        /* auto populate query param */
        var tableId = $(this).data("table-index");
        var paramList = $("#"+tableId).find("tr").children("td[id]").map(function(){
            return $(this).text();       
        }).get();
        var keyValuePairs = [];
        for (var i = 0 ; i < paramList.length ; i+=2) {
            var paramKeypair = {};
            paramKeypair.key = paramList[i].trim();
            paramKeypair.value = paramList[i+1].trim();
            keyValuePairs.push (paramKeypair);
        }
        
        /* auto populate Rest Path */
        var restPath = "/api" + $(this).data("path");
        
        var contentType = $(this).data("content-type");
        /* populate an API tool */
        var api = isEnableServerUrls() ? populateAPI(index, contentType, requestMethod, restPath, keyValuePairs, serverUrls) : populateAPI(index, contentType, requestMethod, restPath, keyValuePairs);
        $(this).after(api);
    });
    
    // populate dialog
    if (enableUserSecurity()){
        isEnableServerUrls() ? $(".authorization-dialog").append(dialog(serverUrls)) : $(".authorization-dialog").append(dialog());
    } 
    
    //populate template of element key-value-pair 
    $("body").append(populateTemplate());
});
