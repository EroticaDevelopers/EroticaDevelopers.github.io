//*HELPERS*//
function activate_player() {
  $('.presentation').css('-webkit-filter', 'blur(10px)');
  $('#videoplayer').removeClass('hidden');
  $('#videoplayer video').get(0).play();
}

function deactivate_player() {
  $('.presentation').css('-webkit-filter', '');
  $('#videoplayer').addClass('hidden');
  $('#videoplayer').removeClass('hidden');
  $('#videoplayer video').get(0).play();
}

//*DOM Manipulation*//
$('.video-link').click(function(event) {
  $('#videoplayer video source').attr('src', $('a',this).prop('href'));
  $('#videoplayer video').load();
  return false;
  activate_player();
});

$('#videoplayer video').hover(function toggleControls() {
  if (this.hasAttribute("controls")) {
    this.removeAttribute("controls");
  } else {
    this.setAttribute("controls", "controls");
  }
});
