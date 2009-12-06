jetpack.tabs.onReady(function() {
    var doc = jetpack.tabs.focused.contentDocument;
    var elements = [];
    $(doc).find("a").each(function() {
        var url = $(this).attr("href");
        var title = $(this).text();
        if (typeof(title) == "string" && title.length > 0 ) {
            elements.push({ url: url, title: title});
        }
    });

    $.ajax({
        type: "POST",
        url:  "http://192.168.1.33:4567/",
        data: {data: uneval(elements)},
        success: function(data) {
            $(data, doc).each( function() {
                console.log(uneval(data));
                if( !this.visible) {
                    $(doc).find("a[href=" + this.url + "]").css("color", "#DDDDDD");
                }
            });
            },
        error: function(res) {
            jetpack.notifications.show("error");
            jetpack.notifications.show(res.toString());
        },
        dataType: 'json'
    });
});
