//OVERLAY

	// Add overlay, image, caption variables
	var $overlay = $('<div id="overlay"></div>');
	var $image = $("<img>");
	var $caption = $("<p></p>");
	
	//Append image to overlay
	$overlay.append($image);
	
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
		
		// Show/fade in the overlay
		$overlay.fadeIn(500); 
		
		// Get child img alt attribute and set to caption
		var captionText = $(this).children("img").attr("alt");
		$caption.text(captionText);
	});
	
	// When overlay is clicked
	$overlay.click(function() {
		// Hide/fade out overlay 
		$overlay.fadeOut(500);
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
					
						//Take all parent elements of img to the ul container (li, a)
						$(this).parentsUntil("#imageGallery").fadeOut(1000); //Fade the item out
						
					} else if ($("html").width() < 1024) { //if the viewport is <1024
						$(this).parentsUntil("#imageGallery").fadeIn(1000); //Fade it in
						
					} else { // viewport is > 1024
					  	$(this).parentsUntil("#imageGallery").css("margin-right", "60px").fadeIn(1000); //Fade it in with new right margin
					}
					
	});				
							
			//If the search box is empty and is >= 1024 viewport			
			if ($("#search").val().length < 1 && $("html").width() >= 1024) {
			
					//Restore right margins to original values
					$("#imageGallery li").css("margin-right", "60px");
					$("#imageGallery li:nth-child(4n)").css("margin-right", 0);
					
				} 						
			});	
		

//TO DO

//Forward/backward arrows
	//When clicked, arrows show image prev/next in list
	//When R/L arrow keys clicked, show image prev/next in list

		
		
		
			