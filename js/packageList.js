$.getJSON("https://cydia.s0n1c.org/cydia/?fetch&url=https://jacobcxdev.github.io/", function(data) {
          $.each(data.packages, function(key, value) {
                 
                 var pathTo = value.depict.replace("?p=", ""),
                 split = pathTo.split("/"),
                 bundle = split[split.length - 2],
                 package = null;
                 console.log(bundle);
                 
                 $.getJSON(pathTo + "/info.json", function(data) {
                           
                           var sectionIcon = "sections/" + data.section.replace(/ /g, "_") + ".png";
                           var sectionIconAlt = value.section;
                           
                           var name = data.name;
                           console.log("Parsed name = " + data.name);
                           var version = "v" + data.version;
                           console.log("Parsed version = " + data.version);
                           var author = data.author;
                           console.log("Parsed author = " + data.author);
                           
                           var by = "";
                           
                           if (author != "") {
                           by = "By";
                           }
                           
                           package = {
                           sectionIcon: sectionIcon,
                           sectionIconAlt: sectionIcon,
                           name: name,
                           version: version,
                           author: author,
                           by: by
                           }
                           
                           $("#packagesBox").append('<a href="' + value.depict + '"><div class="package"><h1>' + package.name + '</h1><h2 id="version">' + package.version + '</h2><img class="sectionIcon" src="' + package.sectionIcon + '" alt="' + package.sectionIconAlt + '"><h3 id="by">' + package.by + '&nbsp;</h3><h4 id="author">' + package.author + '</h4></div></a>');
                           
                           });
                 });
          });
