function requeteAPI(url, id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = this.responseText;
            var jsonPretty = JSON.stringify(JSON.parse(myObj), null, 2);
            document.getElementById(id).innerHTML = syntaxHighlight(jsonPretty);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function homePageLoading() {
    requeteAPI("https://bitcoin.mubiz.com/info", "info");
    requeteAPI("https://bitcoin.mubiz.com/blockchaininfo", "blockchaininfo");
    requeteAPI("https://bitcoin.mubiz.com/mininginfo", "mininginfo");
    requeteAPI("https://bitcoin.mubiz.com/peerinfo", "peerinfo");
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
