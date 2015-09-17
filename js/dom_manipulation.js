//*HELPERS*//
function activate_player(background) {
  $('.presentation').css('-webkit-filter', 'blur(2px)');
  $('.presentation').css('background-image', 'url('+background+')');
  $('#videoplayer').removeClass('hidden');
  $('#videoplayer video').get(0).play();
}

function deactivate_player() {
  $('.presentation').css('-webkit-filter', '');
  $('#videoplayer').addClass('hidden');
  $('#videoplayer').removeClass('hidden');
  $('#videoplayer video').get(0).play();
}

$('#load').on('click', function() {
  gallery.setState(function(){
    debugger;
    return {
      skip: this.state.skip + this.state.limit,
      limit: this.state.limit
    };
  });
});

//*DOM Manipulation*//
// $('.video-link').click(function(event) {
//   $('#videoplayer video source').attr('src', $('a',this).prop('href'));
//   $('#videoplayer video').load();
//   return false;
//   activate_player();
// });

// $('#videoplayer video').hover(function toggleControls() {
//   if (this.hasAttribute("controls")) {
//     this.removeAttribute("controls");
//   } else {
//     this.setAttribute("controls", "controls");
//   }
// });
