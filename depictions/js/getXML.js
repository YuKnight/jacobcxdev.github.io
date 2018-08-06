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
                                         $.getScript(baseUrl + "/js/setDepiction.js", function() {
                                                     console.log("Script loaded but not necessarily executed.");
                                                     });
                                         
                                         $(xml).find('description').each(function() {
                                                                         document.getElementById("description").innerHTML = $(this).text();
                                                                         console.log("Parsed description: " + $(this).text());
                                                                         });
                                         
                                         $(xml).find('dependency').each(function() {
                                                                        $("#dependencies").append('<li>' + $(this).text() + '</li>');
                                                                        console.log("Parsed dependency: " + $(this).text());
                                                                        });
                                         
                                         $(xml).find('linkName').each(function() {
                                                                      $("#links").append('<li>' + $(this).text() + '</li>');
                                                                      console.log("Parsed link: " + $(this).text());
                                                                      });
                                         
                                         $(xml).find('change').each(function() {
                                                                    $("#changeLog").append('<li>' + '<h1>' + $(this).find("changeVersion").text() + '</h1>');
                                                                    $(this).find('changeDescription').each(function() {
                                                                                                           $("#changeLog").append('<h2>' + $(this).text() + '<h2>');
                                                                                                           console.log("Parsed changeDescription: " + $(this).text());
                                                                                                           });
                                                                    $("#changeLog").append('<li>');
                                                                    console.log("Parsed changeVersion: " + $(this).text());
                                                                    });
                                         
                                         $(xml).find('screen').each(function() {
                                                                    $("#screenshots").append('<li>' + '<img src="' + pathTo + "/" + $(this).text() + '" draggable="false" />' + '</li>');
                                                                    console.log("Parsed screenshot: " + $(this).text());
                                                                    });
                                         });
         }
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
  });
