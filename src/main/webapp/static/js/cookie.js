/**
 * Define cookie class
 */
window.cookie = new function() {
	this.getCookie = function(cookieName) {
		var name = cookieName + '=';
		var cookies = this.getCookies();
		var arrCookie = cookies.split(';');
		for(var i = 0; i < arrCookie.length; i++) {
			var cookie = arrCookie[i].trim();
			if (cookie.indexOf(name) != -1) {
				return cookie.substring(name.length, cookie.length);
			}
		}
		return '';
	};

	/**
	 * Get all stored cooked data
	 */
	this.getCookies = function() {
		return document.cookie;
	};

	/**
	 * Save specific cookie value
	 */
	this.setCookie = function(name, value, expireDay) {
		var d = new Date();
		d.setTime(d.getTime() + (expireDay * 60 * 60 * 1000));
		var expires = 'expires=' + d.toGMTString();
		var path = 'path=/';
		document.cookie = name + '=' + value + ';' + expires + ';' + path;
	};

	/**
	 * Check whether cookie is existed by cookie name
	 */
	this.isExisted = function(cookieName) {
		var name = cookieName + '=';
		var cookies = this.getCookies();
		if (cookies.indexOf(name) === -1) {
			return false;
		}
		return true;
	}
};

function getBaseUrl() {
	var pathArray = location.href.split( '/' );
	var protocol = pathArray[0];
	var host = pathArray[2];
	var url = protocol + '//' + host;
	return url;
}

/**
 * Declare cookie object and global params
 */
window.params = {
	cookieKey: 'RUPP_TRACKING_TIME',
	expireDay: 1,
	baseUrl: getBaseUrl()
};

/**
 * Check whether user cookie exists.
 * If not, create one with default value { value = '0' and expireDay = 1 hour }
 * 'user object' = user cookie exists
 * '{}'  = user cookie does not exist and redirect to login
*/
if (! window.cookie.isExisted(window.params.cookieKey)) {
	window.cookie.setCookie(window.params.cookieKey, '{}', window.params.expireDay);
}

/**
 * Check cookie
 */
function checkAuthenticated() {
	var user = $.parseJSON(window.cookie.getCookie(window.params.cookieKey));
	if (user.access_token === null || user.access_token === undefined) {
		document.location.href = window.params.baseUrl + '/login.html';
	}
}