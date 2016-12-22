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

  $(".fancybox-video").click(function() {
		$.fancybox({
			'padding'		: 0,
			'autoScale'		: false,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none',
			'title'			: this.title,
			'width'			: 840,
			'height'		: 485,
			'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
			'type'			: 'swf',
			'swf'			: {
  			'wmode'				: 'transparent',
  			'allowfullscreen'	: 'true'
			}
		});

		return false;
	});

});

$('#responsive').orbit({bullets: true, fluid: true});
