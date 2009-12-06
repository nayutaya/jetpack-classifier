jetpack.tabs.onReady(function(doc) {
    if (doc.defaultView.frameElement) {
        return;
    }
    var elements = [];
    $(doc).find("a").each(function() {
        var url = $(this).attr("href");
        var title = $(this).text();
        if (typeof(title) == "string" && title.length > 0 ) {
            elements.push({ url: url, title: title});
        }
    });
    $(doc).find("a").css({"background-image": 'url("http://wedictionary.appspot.com/image/ajax.gif")', "background-repeat": 'no-repeat'});
    $.ajax({
        type: "POST",
        url:  "http://192.168.1.33:4567/",
        data: {data: uneval(elements)},
        success: function(data) {
               $(data, doc).each( function() {
//                    if (this.visible) {
//                        $(doc).find("a[href=" + this.url + "]").wrap("<marquee></marquee>");
//                    }
                $(doc).find("a[href=" + this.url + "]").css("font-size", this.visible ? "150%" : "50%");
            });
            },
        error: function(res) {
            jetpack.notifications.show("error");
        },
        complete: function() {
            $(doc).find("a").css('background-image', 'none');
        },
        dataType: 'json'
    });
});
