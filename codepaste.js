
jetpack.future.import("clipboard");

var prev = null;
var onChange = function(value) {
  //jetpack.notifications.show(value);
  modified = value.replace(/^\d+[:\.] ?/mg, "")
  jetpack.notifications.show(modified);
  prev = modified;
  jetpack.clipboard.set(modified);
};

jetpack.statusBar.append({
  html: "MyFirstJetpack",
  width: 100,
  onReady: function(widget){
    setInterval(function() {
      var current = jetpack.clipboard.get();
      if ( current != prev )
      {
        onChange(current);
        prev = current;
      }
    }, 1000);
  }
});

