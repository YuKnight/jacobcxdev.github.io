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
            alert("Please visit this page in another browser to add the Cydia Repository");
        } else {
            window.open("cydia://url/https://cydia.saurik.com/api/share#?source=https://jacobcxdev.github.io");
        }
    } else {
        alert("Please visit this page on your iDevice to add the Cydia Repository");
    }
}
