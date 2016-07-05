var mobileHover = function () {
    		$('.our-team-image').on('touchstart', function () {
        	$(this).trigger('hover');
    		}).on('touchend', function () {
        		$(this).trigger('hover');
    		});
		};

		mobileHover();

		$('body').on('touchstart', function (e) {
	   $('.benefit-help').each(function () {
	       //the 'is' for buttons that trigger popups
	       //the 'has' for icons within a button that triggers a popup
	       if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.tooltip').has(e.target).length === 0) {
	           $(this).tooltip('hide');
	       }
	   });
	});