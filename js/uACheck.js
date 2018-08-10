function uACheck() {
    var searchString = /(iP(hone|ad)|Cydia)/;
    var uASearch = navigator.userAgent.exec(searchString);
    console.log(uASearch);
    
    if (uASearch != null) {
        var cydia = /Cydia/;
        var cydiaSearch = navigator.userAgent.exec(cydia);
        console.log(cydiaSearch);
        
        if (cydiaSearch != null) {
            confirm("Please visit this page in another browser to add the Cydia Repository");
        } else {
            window.open = "cydia://url/https://cydia.saurik.com/api/share#?source=https://jacobcxdev.github.io";
        }
    } else {
        confirm("Please visit this page on your iDevice to add the Cydia Repository");
    }
}
