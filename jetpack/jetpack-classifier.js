jetpack.tabs.onReady(function() {
    var doc = jetpack.tabs.focused.contentDocument;
    var elements = [];
    jetpack.notifications.show("preparing");
    $(doc).find("a").each(function() {
        var url = $(this).attr("href");
        var title = $(this).text();
        if (typeof(title) == "string" && title.length > 0 ) {
            elements.push({ url: url, title: title});
        }
    });
    jetpack.notifications.show("loading");
    $.ajax({
        type: "POST",
        url:  "http://192.168.1.33:4567/",
        data: {data: uneval(elements)},
        success: function(data) {
            jetpack.notifications.show("success");
            $(data, doc).each( function() {
                if( !this.visible) {
                    $(doc).find("a[href=" + this.url + "]").css("color", "#DDDDDD");
                }
            });
            },
        error: function(res) {
            jetpack.notifications.show("error");
        },
        dataType: 'json'
    });
});
