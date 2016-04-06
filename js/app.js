//SEARCH

//When text typed in Search box
	$("#search").keyup(function() {
	//Take the input and store it in var filter
		var filter= $(this).val();
		//Check each image in the gallery
		$("#imageGallery img").each(function() {
			//If the alt text of the image doesn't match (< 0) the typed input
			//"gi" means global(all matches), case insensitive
			if ($(this).attr("alt").search(new RegExp(filter, "gi")) < 0 ) {
			
				//Select all parent elements of img (li, a)
				$(this).parents("li").fadeOut(1000); //Fade the item out
				
			} else {
			  	$(this).parents("li").addClass('filtered').fadeIn(1000); //Fade it in with new right margin (added by .filtered)
			}
			//If the search box is empty			
			if ( $("#search").val().length < 1) {
				$(this).parents("li").removeClass('filtered'); //remove the .filtered class to restore margins to normal
			} 						
		});				
	
	});	


//OVERLAY

	// Add overlay, image, caption variables
	var $overlay = $('<div id="overlay"></div>');
	var $image = $("<img>");
	var $caption = $("<p></p>");
	
	// Index variable for arrows
	var $index = 0;
	
	// Add arrow variables
	var $nextArrow = $('<button class="next"><span class="lnr lnr-chevron-right"></span></button>');
	var $prevArrow = $('<button class="prev"><span class="lnr lnr-chevron-left"></span></span></button>');
	
	//Append image to overlay
	$overlay.append($image);
	
	//Append buttons to overlay
	$overlay.append($prevArrow);
	$overlay.append($nextArrow);
	
	//Append caption to overlay
	$overlay.append($caption);
	
	// Append overlay to body
	$("body").append($overlay);
	
	
	// Capture click event on a link to an image
	$("#imageGallery a").click(function(event) {
		event.preventDefault(); //prevents link from opening in dead end
		
		var imageLocation = $(this).attr("href"); //gets link attribute in variable
		
		// Update the overlay with the image linked in the link
		$image.attr("src", imageLocation);

		//Update the index to the current image
		$index = $(this).parent().index(); 
		
		// Show/fade in the overlay
		$overlay.fadeIn(500); 
		
		// Get child img alt attribute and set to caption
		var captionText = $(this).children("img").attr("alt");
		$caption.text(captionText);
	});


//PREV_NEXT ARROW NAVIGATION - needs better fades
var $galleryLength = $("#imageGallery li").length; //holds the length of the gallery list items

var imgUpdate = function(prev) { //function for updating the overlay img

	if(!prev) {$index++; } //if function not true, iterate forwards
	else { $index--; } //otherwise, iterate backwards

	if ($index < 0) { $index = $galleryLength - 1;	} //sets correct index when going backward
	if ($index >= 12) { $index = 0;	} //loops back to first image

	var newImg = $("#imageGallery li").get($index).getElementsByTagName('a'); //gets anchor tag
	
	var imageLocation = $(newImg).attr("href"); //holds location for new img
	var captionText = $(newImg).children("img").attr("alt"); //holds caption for new img
	
	$image.fadeOut(50); //find better way to fade, this is a fake
	
	$image.attr("src", imageLocation); //set new image in overlay
	
	$image.fadeIn(1000); //find better way to fade
	
	$caption.text(captionText); //set new caption text in overlay

}


//BUTTON FUNCTIONS

//when prevArrow is clicked
$prevArrow.click(function(event) {
	imgUpdate(true);
});

//when nextArrow is clicked
$nextArrow.click(function(event) {
	imgUpdate();
});
		
		


//EXIT OVERLAY BY CLICKING ON IT

//when nextArrow is clicked
	$nextArrow.click(function(event) {
		return false; //Don't exit
	});
//when prevArrow is clicked
	$prevArrow.click(function(event) {
		return false; //Don't exit
	});

//	 When overlay is clicked
	$overlay.click(function() {
		//Hide/fade out overlay 
		$overlay.fadeOut(500);
	});	
		
			