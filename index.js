/*
 * Rakugakiya Script
 *
 *  Used: jQuery 1.2.6
 */
$(function() {
  $('#image').click(function() {
      var img = new Image();
		    img.src = $(this).attr('src');
		    window.open(img.src, '_blank', 'width='+img.width+',height='+img.height+',scrollbars=no,resizable=yes');
	  });
  $('#illust a').click(function() {
    $('#illust a').css('color', 'black');
    $(this).css('color', 'red');
    $('#image').attr('src', $(this).attr('href'));
    
    return false;
  });
  $('h2').click(function() {
    $('+ul', this).toggle();
  });
  
  $('h2').css('cursor', 'pointer');
  $('#image').css('cursor', 'pointer');
  $('#link').css('display', 'none');
});
