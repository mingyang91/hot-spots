/**
 * Created by famer.me on 15-7-27.
 */
var socket = io();
$(document).ready(function () {
  if (window.location.search.indexOf('?view') === 0) {

    socket.on('receive', function (msg) {
      $(document).scrollTop(msg.height);
    });
  } else {


    $(document).on('scroll', function (e) {
      var msg = {
        timeStamp: e.timeStamp,
        height: $(document).scrollTop()
      };
      console.log(msg);

      socket.emit('scroll', msg);
    });

  }
});
