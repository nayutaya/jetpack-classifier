jetpack.future.import("slideBar");


    jetpack.tabs.onReady(function() {
    var doc = jetpack.tabs.focused.contentDocument;
    var elements = [];
    jetpack.notifications.show("preparing");
        $(doc).find("a").each(function() {
        var url = this.href;
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
            var visibles = [];
            $(data, doc).each( function() {
                $(doc).find("a[href=" + this.url + "]").css("font-size", this.visible ? "150%" : "50%");
                if (this.visible) visibles.push(this);
            });
            var content = "<h1>JR</h1>";
            console.log(uneval(visibles));
            $(data, doc).each(function() {
                content += "<div><a href='" + decodeURIComponent(this.url) + "'>" + this.title + "</a></div>";
            });
            jetpack.slideBar.append({
                width: 250,
                icon: 'http://www.kix.in/misc/jetpacks/notes.png',
                html: content,
                onReady: function(slide) {
                    cb = slide;
                },
                onSelect: function(slide) {
                    jetpack.notifications.show('onSelect');
                }
            });

            },
        error: function(res) {
            jetpack.notifications.show("error");
        },
        dataType: 'json'
    });
});
