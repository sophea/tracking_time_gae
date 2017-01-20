<pre>
This backend is about for handling endpoints REST-APIs and response as Json format. 
JSON format and response back to client-apps (iOS, Android,Mobile-Web, 3rd party and more...)

Each REST-API Request must start with /api. 

=======Authentication==========
There are 2 types of authentication.
 
1 oAuth2 Client Credentials flow (Minimum that every App (web/iOS/Android) must use & Third Party Systems that integrate into backend).

ex : clientId and secret is sent as Basic Auth headers.
 
curl --user  {clientId}:{clientSecret}   -k -d "grant_type=client_credentials" -H  "Content-Type: application/x-www-form-urlencoded" http://localhost:8080/api/oauth2/token
  
response json :
{
"token_type" : "bearer",
"access_token":"1390812012543_m8vo1iuirp60s7lusdcysamck8dflgylyc0j5ye945l1j3tdkeps7nswxfk1zw80otpkn6f6gwutmvubzo0kjwmfzvcg3ogmfd5ngbcmf00c05mku0_5770237022568448",
"expires_in":1390816226099,
"userId":32433
}
 
error json :  {"httpCode":401,"errorCode":0,"message":" invalid credentials!"}


Success response will return json back, you can access the APIs.

You need to pass access_token value either in the request param ("access_token") or from cookie to access BACKEND API.


ex:Request param : http://localhost:8080/api/oauth2/v1/user/me?access_token={o1iuirp60s7lusdcysamck8dflgy...}

ex : Cookie mode : curl --cookie "access_token=cookieValue" -H  "Content-Type: application/x-www-form-urlencoded" http://localhost:8080/api/oauth2/v1/user/me 


2 oAuth2 Resource Owner Password flow (Username, password)


====================================================================

Backend most REST-APIs supported request Content-Type : <b>"application/x-www-form-urlencoded"  , "application/x-www-form-urlencoded charset=utf-8" </b>

App client should use this Content-Type when making a call REST-API Backend.

However some REST-APIs are supported request Content-Type : application/json  as well , please ses REST-DOC API documentation below:  

 

Date format both request and response is accepted with this format : yyyy-MM-dd'T'HH:mm:ssZ ex : "2015-11-09T11:14:05+0700"

<br/>
Date request can support
1 - yyyy-MM-dd               ex : 2015-09-20
2 - yyyy-MM-dd'T'HH:mm:ssZ   ex : "2015-11-09T11:14:05+0700"
3 - yyyy-MM-dd'T'HH:mm:ss'Z' ex : "2015-11-09T11:14:05Z"
===================================================================
Monitor REST-API for Server:  http://localhost:8080/monitor

</pre>
<!-- server URLs -->
<script type="text/javascript">
    var serverUrls =["https://rupp-timetracking-test.appspot.com"];
    var isEnableUserSecurity = true;
</script>