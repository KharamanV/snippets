$('#btn-canvas').click(function() {
    $('.wrapper').addClass('active');
    $('body').addClass('disable-scroll');
    
});
$('.mask').click(function() {
    $('.wrapper').removeClass('active');
    $('body').removeClass('disable-scroll');
});