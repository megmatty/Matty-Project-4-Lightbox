//OVERLAY

	// Add overlay, image, caption variables
	var $overlay = $('<div id="overlay"></div>');
	var $image = $("<img>");
	var $caption = $("<p></p>");
	var $iframe = $('<iframe src="" frameborder="0"></iframe>'); //for video holder?
	
	// Counter variable for arrows
	var $index = 0;
	
	// Add arrow variables
	var $nextArrow = $('<button class="next"><span class="lnr lnr-chevron-right"></span></button>');
	var $prevArrow = $('<button class="prev"><span class="lnr lnr-chevron-left"></span></span></button>');
	
	//Append image to overlay
	$overlay.append($image);
	
//	$overlay.append($iframe); i guess append the iframe here? or append in if statement
	
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
		
		var imageLocation = $(this).attr("href"); //gets img link attribute in variable
//		var videoLocation = $(this).attr("href"); //gets video link attr? but its the same?
        
//      $iframe.attr("src", imageLocation); //?????no idea if this is right

    // Update the overlay with the image linked in the link
            $image.attr("src", imageLocation);      
        
           
        //where i get stuck - no idea how to implement video with my existing code
        //add a class ".video" to video a elements
        //if $(this).hasClass("video") then $iframe.append to overlay
        //else do the rest of code?

		//Update the index to the current image
		$index = $(this).parent().index(); 
		
		// Show/fade in the overlay
		$overlay.fadeIn(500); 
		
		// Get child img alt attribute and set to caption
		var captionText = $(this).children("img").attr("alt");
		$caption.text(captionText);
		
	});
	
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

//PREV_NEXT ARROW NAVIGATION - needs better fades
var $galleryLength = $("#imageGallery li").length; //holds the length of the gallery list items

var imgUpdate = function(prev) { //function for updating the overlay img

	if(!prev) { //if function not true, iterate forwards
	    $index++; 
	} 
	    else {  //otherwise, iterate backwards
	        $index--; 
	    } 

	if ($index < 0) { //sets correct index when going backward
	    $index = $galleryLength - 1;	
	} 
	
	if ($index >= $galleryLength) { //loops back to first image
	    $index = 0;	
	} 

	var newImg = $("#imageGallery li").get($index).getElementsByTagName('a'); //gets anchor tag
	
	var imageLocation = $(newImg).attr("href"); //holds location for new img
	var captionText = $(newImg).children("img").attr("alt"); //holds caption for new img
	
	$image.fadeOut(50); //find better way to fade, this is a fake
	
	$image.attr("src", imageLocation); //set new image in overlay
	
	$image.fadeIn(1000); //find better way to fade
	
	$caption.text(captionText); //set new caption text in overlay

};

//OVERLAY IMAGE NAVIGATION

//When prevArrow is clicked
$prevArrow.click(function(event) {
	imgUpdate(true);
	return false; //keeps overlay from closing when clicking arrow
});

//When nextArrow is clicked
$nextArrow.click(function(event) {
	imgUpdate();
	return false; //keeps overlay from closing when clicking arrow
});		

//Arrow keys for prev/next
$(document).keydown(function(event) {
    if (event.which === 37) {
        imgUpdate(true);
    } else if (event.which === 39) {
        imgUpdate();
    }
});

//Mobile swipe events
$('#overlay img').swipeleft(function(event) {
    imgUpdate(true);
});

$('#overlay img').swiperight(function(event) {
    imgUpdate();
});

//EXIT OVERLAY BY CLICKING ON IT

//	 When overlay is clicked
	$overlay.click(function() {
		//Hide/fade out overlay 
		$overlay.fadeOut(500);
	});	




//TO DO

//Find a way to preload/cache images for overlay scrolling
//Find a way to only iterate through images displayed from active search
//Find a way to show arrows only on mouse hover
		