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
                                         document.getElementById("name").innerHTML = $(this).find("name").text();
                                         console.log("Parsed name");
                                         document.getElementById("version").innerHTML = "v" + $(this).find("version").text();
                                         console.log("Parsed version");
                                         document.getElementById("author").innerHTML = $(this).find("author").text();
                                         console.log("Parsed author");
                                         
                                         if ($(this).find("author").text() != "") {
                                         document.getElementById("by").innerHTML = "By";
                                         }
                                         
                                         document.getElementById("miniOS").innerHTML = $(this).find("miniOS").text();
                                         document.getElementById("maxiOS").innerHTML = $(this).find("maxiOS").text();
                                         console.log("Parsed miniOS = " + $(this).find("miniOS").text() + " and maxiOS = " + $(this).find("maxiOS").text());
                                         
                                         
                                         var UA = navigator.userAgent;
                                         var regEx = /\iPhone OS ([^)]+)\like/;
                                         var match = regEx.exec(UA);
                                         if (match != null) {
                                         var deviceString = match.pop();
                                         var version = deviceString.replace(/\_/g, '.');
                                         
                                         //Parse ios version
                                         var lowOS = document.getElementById("miniOS").innerHTML.trim().split('.');
                                         console.log("lowOS = " + lowOS);
                                         var highOS = document.getElementById("maxiOS").innerHTML.trim().split('.');
                                         console.log("highOS = " + highOS);
                                         var userOS = version.trim().split('.');
                                         console.log("userOS = " + userOS);
                                         var userIsLower = false;
                                         var userIsHigher = false;
                                         
                                         
                                         if (lowOS.length > userOS.length) {
                                         var i = 0;
                                         for (i = 0; i < userOS.length; ++i) {
                                         if (lowOS[i] > userOS[i])
                                         userIsLower = true;
                                         console.log("userIsLower = true");
                                         if (lowOS[i] < userOS[i])
                                         console.log("userIsLower = false");
                                         break;
                                         }
                                         } else {
                                         var i = 0;
                                         for (i = 0; i < lowOS.length; ++i) {
                                         if (lowOS[i] > userOS[i])
                                         userIsLower = true;
                                         console.log("userIsLower = true");
                                         if (lowOS[i] < userOS[i])
                                         console.log("userIsLower = false");
                                         break;
                                         }
                                         }
                                         
                                         if (highOS.length > userOS.length) {
                                         var i = 0;
                                         for (i = 0; i < userOS.length; ++i) {
                                         if (highOS[i] < userOS[i]) {
                                         userIsHigher = true;
                                         console.log("userIsHigher = true");
                                         }
                                         if (highOS[i] > userOS[i])
                                         console.log("userIsHigher = false");
                                         break;
                                         }
                                         } else {
                                         var i = 0;
                                         for (i = 0; i < highOS.length; ++i) {
                                         if (highOS[i] < userOS[i]) {
                                         userIsHigher = true;
                                         console.log("userIsHigher = true");
                                         }
                                         if (highOS[i] > userOS[i])
                                         console.log("userIsHigher = false");
                                         break;
                                         }
                                         if ((userOS[i] > 0) && (userOS[i - 1] == highOS[i - 1]))
                                         userIsHigher = true;
                                         console.log("userIsHigher = true");
                                         }
                                         
                                         if(userIsHigher == false && userIsLower == false){
                                         document.getElementById("Compatibility").style["backgroundColor"] = "rgba(109, 255, 145, 1)";
                                         document.getElementById("Compatibility").style["boxShadow"] = "rgba(109, 255, 145, 1) 0px 0px 10px";
                                         document.getElementById("youriOS").innerHTML = "Your device is compatible.";
                                         document.getElementById("compatibilityIcon").innerHTML = "😀";
                                         console.log("Device compatible");
                                         
                                         } else {
                                         document.getElementById("Compatibility").style["backgroundColor"] = "rgba(255, 81, 81, 0.75)";
                                         document.getElementById("Compatibility").style["boxShadow"] = "0px 0px 10px rgba(255, 81, 81, 0.75)";
                                         document.getElementById("youriOS").innerHTML = "Your device is not compatible.";
                                         document.getElementById("compatibilityIcon").innerHTML = "😞";
                                         console.log("Device incompatible");
                                         
                                         }
                                         } else {
                                         document.getElementById("Compatibility").style["backgroundColor"] = "rgba(255, 215, 0, 0.75)";
                                         document.getElementById("Compatibility").style["boxShadow"] = "0px 0px 10px rgba(255, 215, 0, 0.75)";
                                         document.getElementById("youriOS").innerHTML = "Your device could not be identified.";
                                         document.getElementById("compatibilityIcon").innerHTML = "⚠️";
                                         console.log("Device unidentified");
                                         
                                         }
                                         
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
