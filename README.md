# Specification :

https://docs.google.com/document/d/1zp6EuTHZwYkK3gaJ_aVvdO-p37RMXBZ0C7IFov07yqk/edit

# To run this backend project :

- 1 : install maven 3 / jdk java7  
- 2 : go to this project location by console
- 3 : create class-path for eclipse :mvn eclipse:eclipse (opening with eclipse / STS)

- 4 : run local environment command :
  mvn clean appengine:devserver

- 5 : sample APIs : monitor api :
   - GET api : http://localhost:8080/monitor
   - test ugly forms : http://localhost:8080/ugly  (checked admin)
     - log wiht credentials first : http://localhost:8080/ugly/Authorization_Client_Credential.html
     - log in with resource owner account 
 
- 6 : doc-rest page :
  - user-security-api :  http://localhost:8080/rest-api/security/api.html
  - backend-api : http://localhost:8080/rest-api/site/apidocs/api.html
 
 
 
# run local environment :
 
mvn clean appengine:devserver 
 
# appengine commands
 mvn help:describe -Dplugin=appengine
 
# ======release version
 mvn release:clean release:prepare

# ==========Admin task======
