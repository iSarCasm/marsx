$(document).ready(function() {
  Tipped.create('.box');

  $('#maintitle').addClass('wide');

  $('.fancybox-image').fancybox({
    'transitionIn'	:	'elastic',
		'transitionOut'	:	'elastic',
		'speedIn'		:	600,
		'speedOut'		:	200,
		'overlayShow'	:	false
  });
});

$('#responsive').orbit({bullets: true, fluid: true});
