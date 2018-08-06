$(function() {
  var bundle = getQueryVariable('p');
  
  if (bundle != undefined) {
  //Now fetch the appropriate file from this query string
  }
  
  console.log(getQueryVariable('p'));
  console.log("Fetching XML");
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
  var pathTo = baseUrl + "/" + bundle;
  
  $.ajax({
         type: "GET",
         url: pathTo + "info.xml",
         dataType: "xml",
         success: function(xml) {
         console.log("Beginning XML Parsing");
         
         // Parse the xml file and get data
         $(xml).find('packageInfo').each(function() {
                                         $.getScript("setDepicion.js", function() {
                                                     console.log("Script loaded but not necessarily executed.");
                                                     });
         }
         });
  });


$("img").bind('dragstart', function() {
              return false;
              });
$("img").bind('mousedown', function() {
              return false;
              });



function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
