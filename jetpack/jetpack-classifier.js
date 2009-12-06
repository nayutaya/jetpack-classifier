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

    // XXX: mock
    $.extend({
        ajax: function(args) {
            var elements = [];
                $(doc).find("a").each(function() {
                    var url = $(this).attr("href");
                    var title = $(this).text();
                    if (typeof(title) == "string" && title.length > 0 ) {
                        elements.push({ url: url, title: title, visible: (Math.random() > 0.5)});
                    }
                });
                args.success(elements);
            }
        }
    );

    $.ajax({
        type: "POST",
        url:  "http://localhost/",
        data: {data: uneval(elements)},
        success: function(data) {
            $(data, doc).each( function() {
                if( !this.visible) {
                    $(doc).find("a[href=" + this.url + "]").css("visibility", "hidden");
                }
            });
            },
        error: function(res) {
            jetpack.notifications.show(res.toString());
        },
        dataType: 'json'
    });
});
