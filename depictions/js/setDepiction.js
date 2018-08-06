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
                                         
                                         
                                         var userAgent = navigator.userAgent;
                                         var regExp = /iP(hone|ad; CPU) OS (\d|_){1,}/;
                                         var match = regExp.exec(userAgent);
                                         
                                         if (match != null) {
                                         var iPhoneSupported = document.getElementById("iPhoneSupported").text();
                                         var iPadSupported = document.getElementById("iPadSupported").text();
                                         var unsupportedDevice = false;
                                         var isiPhoneOrPod = false;
                                         var isiPad = false;
                                         var userDevice = "unidentified";
                                         
                                         var deviceString = match.shift();
                                         console.log(deviceString);
                                         var removeDevice = deviceString.replace(/(iPhone OS |iPad; CPU OS )/, "");
                                         
                                         var iPhoneCheckRegExp = /iPhone OS /;
                                         var iPhoneCheck = iPhoneCheckRegExp.exec(deviceString);
                                         
                                         if (iPhoneCheck == null) {
                                         isiPad = true;
                                         } else {
                                         isiPhoneOrPod = true;
                                         }
                                         
                                         if (!iPhoneSupported && isiPhoneOrPod) {
                                         unsupportedDevice = true;
                                         } else if (!iPadSupported && isiPad) {
                                         unsupportedDevice = true;
                                         }
                                         
                                         if (isiPhoneOrPod) {
                                         userDevice = "iPhone/iPod";
                                         } else {
                                         userDevice = "iPad";
                                         }
                                         
                                         if (!unsupportedDevice) {
                                         var version = removeDevice.replace(/\_/g, '.');
                                         
                                         var miniOS = $(this).find("miniOS").text().trim().split('.').map(Number);
                                         console.log("miniOS = " + miniOS);
                                         var maxiOS = $(this).find("maxiOS").text().trim().split('.').map(Number);
                                         console.log("maxiOS = " + maxiOS);
                                         var userOS = version.trim().split('.').map(Number);
                                         console.log("userOS = " + userOS);
                                         
                                         var isLower = false;
                                         var isHigher = false;
                                         
                                         var i = 0;
                                         
                                         if (miniOS.length > userOS.length) {
                                         i = 0;
                                         while (i <= miniOS.length) {
                                         if (userOS[i] == null) {
                                         userOS[i] = 0;
                                         }
                                         if (userOS[i] < miniOS[i]) {
                                         isLower = true;
                                         console.log("isLower = " + isLower);
                                         } else if (userOS[i] != miniOS[i]) {
                                         break;
                                         }
                                         i += 1;
                                         }
                                         } else {
                                         i = 0;
                                         while (i <= miniOS.length) {
                                         if (miniOS[i] == null) {
                                         miniOS[i] = 0;
                                         }
                                         if (userOS[i] < miniOS[i]) {
                                         isLower = true;
                                         console.log("isLower = " + isLower);
                                         } else if (userOS[i] != miniOS[i]) {
                                         break;
                                         }
                                         i += 1;
                                         }
                                         }
                                         
                                         if (maxiOS.length > userOS.length) {
                                         i = 0;
                                         while (i <= userOS.length) {
                                         if (userOS[i] == null) {
                                         userOS[i] = 0;
                                         }
                                         if (userOS[i] > maxiOS[i]) {
                                         isHigher = true
                                         console.log("isHigher = " + isHigher);
                                         } else if (userOS[i] != maxiOS[i]) {
                                         break;
                                         }
                                         i += 1;
                                         }
                                         } else {
                                         i = 0;
                                         while (i <= userOS.length) {
                                         if (maxiOS[i] == null) {
                                         maxiOS[i] = 0;
                                         }
                                         if (userOS[i] > maxiOS[i]) {
                                         isHigher = true
                                         console.log("isHigher = " + isHigher);
                                         } else if (userOS[i] != maxiOS[i]) {
                                         break;
                                         }
                                         i += 1;
                                         }
                                         }
                                         
                                         if (!isLower && !isHigher) {
                                         ocument.getElementById("Compatibility").style["backgroundColor"] = "rgba(109, 255, 145, 1)";
                                         document.getElementById("Compatibility").style["boxShadow"] = "rgba(109, 255, 145, 1) 0px 0px 10px";
                                         document.getElementById("youriOS").innerHTML = "Your " + userDevice + " is compatible.";
                                         document.getElementById("compatibilityIcon").innerHTML = "😆";;
                                         console.log("Your " + userDevice + " is compatible.")
                                         } else if (isLower) {
                                         document.getElementById("Compatibility").style["backgroundColor"] = "rgba(255, 81, 81, 0.75)";
                                         document.getElementById("Compatibility").style["boxShadow"] = "0px 0px 10px rgba(255, 81, 81, 0.75)";
                                         document.getElementById("youriOS").innerHTML = "Your " + userDevice + "'s iOS version is too low, and thus not compatible.";
                                         document.getElementById("compatibilityIcon").innerHTML = "😔";
                                         console.log("Your " + userDevice + "'s iOS version is too low.");
                                         } else if (isHigher) {
                                         document.getElementById("Compatibility").style["backgroundColor"] = "rgba(255, 81, 81, 0.75)";
                                         document.getElementById("Compatibility").style["boxShadow"] = "0px 0px 10px rgba(255, 81, 81, 0.75)";
                                         document.getElementById("youriOS").innerHTML = "Your " + userDevice + "'s iOS version is too high, and thus not compatible.";
                                         document.getElementById("compatibilityIcon").innerHTML = "😔";
                                         console.log("Your " + userDevice + "'s iOS version is too high.");
                                         }
                                         } else {
                                         document.getElementById("Compatibility").style["backgroundColor"] = "rgba(255, 81, 81, 0.75)";
                                         document.getElementById("Compatibility").style["boxShadow"] = "0px 0px 10px rgba(255, 81, 81, 0.75)";
                                         document.getElementById("youriOS").innerHTML = "Your " + userDevice + " is unsupported by this package.";
                                         document.getElementById("compatibilityIcon").innerHTML = "😔";
                                         console.log("Your " + userDevice + " is unsupported by this package.");
                                         }
                                         
                                         } else {
                                         document.getElementById("Compatibility").style["backgroundColor"] = "rgba(255, 215, 0, 0.75)";
                                         document.getElementById("Compatibility").style["boxShadow"] = "0px 0px 10px rgba(255, 215, 0, 0.75)";
                                         document.getElementById("youriOS").innerHTML = "Your device could not be identified.";
                                         document.getElementById("compatibilityIcon").innerHTML = "⚠️";
                                         console.log("Your device is unidentified.");
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
