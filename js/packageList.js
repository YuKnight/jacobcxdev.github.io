$.getJSON("https://cydia.s0n1c.org/cydia/?fetch&url=https://jacobcxdev.github.io/", function(data) {
          $.each(data.packages, function(key, value) {
                 
                 var pathTo = value.depict.replace("?p=", "");
                 
                 $.ajax({
                        type: "GET",
                        url: pathTo + "/info.xml",
                        dataType: "xml",
                        success: function(xml) {
                        console.log("Beginning XML Parsing");
                        
                        // Parse the xml file and get data
                        $(xml).find('packageInfo').each(function() {
                                                        
                                                        var sectionIcon = "sections/" + $(this).find("section").text().replace(/ /g, "_") + ".png";
                                                        var sectionIconAlt = $(this).find("section").text();
                                                        
                                                        var name = $(this).find("name").text();
                                                        console.log("Parsed name");
                                                        var version = "v" + $(this).find("version").text();
                                                        console.log("Parsed version");
                                                        var author = $(this).find("author").text();
                                                        console.log("Parsed author");
                                                        
                                                        if (author != "") {
                                                        by = "By";
                                                        }
                                                        
                                                        var package = {
                                                        sectionIcon: sectionIcon,
                                                        sectionIconAlt: sectionIcon,
                                                        name: name,
                                                        version: version,
                                                        author: author,
                                                        by: by
                                                        }
                                                        
                                                        $("#packagesBox").append('<a href="' + value.depict + '" target="_blank"><div class="package"><h1>' + package.name + '</h1><h2 id="version">' + package.version + '</h2><img class="sectionIcon" src="' + package.sectionIcon + '" alt="' + package.sectionIconAlt + '"><h3 id="by">' + package.by + '</h3><h4 id="author">' + package.author + '</h4></div></a>')
                                                        
                                                        });
                        }
                        });
                 });
          });

