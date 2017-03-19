function requeteAPI(url, id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = this.responseText;
            var jsonPretty = JSON.stringify(JSON.parse(myObj), null, 2);
            document.getElementById(id).innerHTML = jsonPretty;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function homePageLoading() {
    requeteAPI("http://bitcoin.mubiz.com/info", "info");
    requeteAPI("http://bitcoin.mubiz.com/blockchaininfo", "blockchaininfo");
    requeteAPI("http://bitcoin.mubiz.com/mininginfo", "mininginfo");
    requeteAPI("http://bitcoin.mubiz.com/peerinfo", "peerinfo");
}
