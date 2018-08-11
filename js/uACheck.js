function uACheck() {
    var userAgent = navigator.userAgent;
    console.log(userAgent);
    var searchString = /(iP(hone|ad)|Cydia)/;
    var uASearch = searchString.exec(userAgent);
    console.log(uASearch);
    
    if (uASearch != null) {
        var cydia = /Cydia/;
        var cydiaSearch = cydia.exec(userAgent);
        console.log(cydiaSearch);
        
        if (cydiaSearch != null) {
            confirm("Confirm to visit this page in Safari to add the Cydia Repository");
            if (confirm) {
                window.open("cydia://url/https://cydia.saurik.com/api/share#?source=https://jacobcxdev.github.io/", "_system");
            }
        } else {
            window.open("cydia://url/https://cydia.saurik.com/api/share#?source=https://jacobcxdev.github.io/");
        }
    } else {
        alert("Please visit this page on your iDevice to add the Cydia Repository");
    }
}
