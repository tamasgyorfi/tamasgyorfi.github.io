
var BASE_URL = "https://tamasgyorfi.github.io";

function getQueryParam(name) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(name);
}

function queryParamExists(field) {
	var url = window.location.href;
	if(url.indexOf('?' + field + '=') != -1)
    	return true;
	else if(url.indexOf('&' + field + '=') != -1)
    	return true;
	return false
}

function redirect() {
    window.location.replace(BASE_URL);
  }