$(document).ready(function(){
	$('.owl-carousel').owlCarousel({
		loop:true,
		margin:10,
		dots: true,
		navText: "",
		responsiveClass:true,
		responsive:{
			0 : {
				items:1,
				nav: true,
				dots: false
			},
		    768 : {
		        items:3,
		        nav:true
		    },
		}
	});		
});