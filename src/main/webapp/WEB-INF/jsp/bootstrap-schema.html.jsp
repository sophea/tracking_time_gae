<html>
    <head>
        <title>Loading...</title>
        <!-- Bootstrap -->
        <!--<link href="/css/bootstrap.min.css" rel="stylesheet" media="screen"/>-->
        <!--  <link href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css" rel="stylesheet" media="screen" />-->
        <link href="/css/bootstrap.css" rel="stylesheet" media="screen" />
        <style>
            body {
                padding-top: 60px; /* When using the navbar-top-fixed */
            }
        </style>
    </head>
    <body>
        <div class="navbar navbar-fixed-top navbar-inverse">
            <div class="navbar-inner">
                <div class="container">				
                    <a id="tableName" class="brand" href="#">Loading schema...</a>
                    <ul class="nav">
                        <li class="active"><a href="#all-entities" data-toggle="tab">All</a></li>
                        <li ><a href="#create-entity" data-toggle="tab">Create</a></li>
                        <li ><a href="#all-entities" data-toggle="tab" >Edit</a></li>
                    </ul>
                </div>	
            </div>
        </div>

        <div class="container">
            <div class="tabbable">

                <div class="tab-content">
                    <div id="all-entities" class="tab-pane active">
                        <table class="table">
                            <thead>
                                <tr id="allHead"></tr>
                            </thead>
                            <tbody id="allBody">
                            </tbody>
                        </table>
                        <button id="allLoadMore" class="btn" onclick="crudLoadMore();" >Load more...</button>
                    </div>

                    <div id="create-entity" class="tab-pane">
                        <form id="createForm">
                            <fieldset id="createFieldset">


                            </fieldset>
                        </form>
                        <button class="btn btn-primary" id="createButton" onclick="crudCreateEntity();" >Create</button>
                    </div>

                    <div id="update-entity" class="tab-pane">
                        <form class="form-horizontal" id="updateForm">
                            <fieldset id="updateFieldset">


                            </fieldset>
                        </form>
                        <button class="btn btn-primary" id="updateButton" onclick="crudUpdateEntity();" >Update</button>
                    </div>
                </div>
            </div><!-- tabbable -->
        </div><!-- container -->

        
        <script type="text/javascript" src="/js/jquery-1.7.min.js"></script>
        <script type="text/javascript" src="/js/bootstrap.min.js"></script>
        
        <!--  
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
        <script type="text/javascript" src="http://twitter.github.com/bootstrap/assets/js/bootstrap.min.js"></script>
        -->
        
        <!-- either of these will work: -->
        <script type="text/javascript" src="/js/api/crudAPI.js"></script>
        <script type="text/javascript">
var apiUrl = '', baseUrl = '';

$(function() {
    // for dev purposes
    if (-1 < location.href.search('file://')) {
        baseUrl = 'http://localhost:8123';
        apiUrl = 'http://localhost:8123/api/default/_admin/domain/v10/';
    }

    crudLoadSchema();
    crudLoadMore();
});
        </script>
    </body>
</html>