//OVERLAY

	// Add overlay, image, caption, iframe variables
	var $overlay = $('<div id="overlay"></div>');
	var $image = $("<img>");
	var $caption = $("<p></p>");
	var $iframe = $('<iframe src="" frameborder="0"></iframe>'); //empty video holder
	
	// Add counter variable for slideshow
	var $index = 0;
	
	// Add arrow variables
	var $nextArrow = $('<button class="next"><span class="lnr lnr-chevron-right"></span></button>');
	var $prevArrow = $('<button class="prev"><span class="lnr lnr-chevron-left"></span></span></button>');
	
	//Append image to overlay
	$overlay.append($image);
	
	//Append iframe to overlay
	$overlay.append($iframe); 
	
	//Append buttons to overlay
	$overlay.append($prevArrow);
	$overlay.append($nextArrow);
	
	//Append caption to overlay
	$overlay.append($caption);
	
	// Append overlay to body
	$("body").append($overlay);
	
	
	//Create a function to show the desired gallery item
	function showGalleryItem(item) {
	
	    var item = $(item); //create a variable for item to reuse
	    
	    if (item.hasClass("video") ) { //if the item has a class 'video'
	        var showItem = $iframe; //define variable to show the iframe
	        var hideItem = $image; //define variable to hide the image
	    } else { //if the item is not a video
	        var showItem = $image; //redefine variable to show the image
	        var hideItem = $iframe;//redefine variable to hide the iframe
	    }
	
	    hideItem.hide(); //hide the item based on the met condition
	    showItem.show().fadeOut(0).fadeIn(1000); //show the item, fadeout quick then fade back in slow
	
	    showItem.attr("src", item.attr('href')); //set the src of the item to the link
	
	    //Update the index to the current image
	    $index = item.parent().index();
	    
	    //Get item's children's (img) alt attribute and set to caption
	    var captionText = item.children("img").attr("alt");
	    $caption.text(captionText);
	    
	    //Fade in the overlay
	    $overlay.fadeIn(500);
	}
	
	
	// Capture click event on a thumbnail link to an image
	$("#imageGallery a").click(function(event) {
		event.preventDefault(); //prevents link from opening in dead end
		
        var item_to_show = $(this); //get THIS link in a variable
		
		showGalleryItem(item_to_show); //call function to show the item

	});
	
	
//SEARCH

    //When text typed in Search box
    	$("#search").keyup(function() {
    	
    	    //Take the input and store it in a variable
    		var filter= $(this).val();
    		
		    //Check each image in the gallery
    		$("#imageGallery img").each(function() {

    			//If the alt text of the image doesn't match (< 0) the typed input
    			if ($(this).attr("alt").search(new RegExp(filter, "gi")) < 0 ) { //"gi" = global(all matches), case insensitive
    			
    				//Select all parent elements of img (li, a)
    				$(this).parents("li").fadeOut(1000); //Fade the item out
    				
    			} else {
    			  	$(this).parents("li").addClass('filtered').fadeIn(1000); //Fade it in with new right margin (added by .filtered)
    			}
    			
    			//If the search box is empty			
    			if ( $("#search").val().length < 1) {
    				$(this).parents("li").removeClass('filtered'); //remove .filtered to restore margins
    			} 						
    		});				
    	
    	});	


//OVERLAY IMAGE NAVIGATION

    var $galleryLength = $("#imageGallery li").length; //holds the length of the gallery list items
    
    var imgUpdate = function(move) { //function for updating the overlay img when prev/next clicked
    
        $index += move; //variable to advance or retreat
    
    	if ($index < 0) { //sets correct index when going backward
    	    $index = $galleryLength - 1;	
    	} 
    	
    	if ($index >= $galleryLength) { //loops back to first image when end is reached
    	    $index = 0;	
    	} 
    
    	var item_to_show = $("#imageGallery li a").eq($index); //selects an item with the current index number	
    
        showGalleryItem(item_to_show);

        };


//PREV_NEXT ARROW FUNCTIONS

    //When Left Arrow is clicked
    $prevArrow.click(function(event) {
    	imgUpdate(-1); //move -1
    	return false; //keeps overlay from closing when clicking arrow
    });
    
    //When Right Arrow is clicked
    $nextArrow.click(function(event) {
    	imgUpdate(1); //move +1
    	return false; //keeps overlay from closing when clicking arrow
    });		
    
    //Arrow keys for prev/next
    $(document).keydown(function(event) {
        if (event.which === 37) { //keycode for left arrow key
            imgUpdate(-1); //move -1
        } else if (event.which === 39) { //keycode for right arrow key
            imgUpdate(1); //move +1
        }
    });
    
    //Mobile swipe events (provided by custom jquery mobile script)
    $('#overlay img').swipeleft(function(event) {
        imgUpdate(-1); //move -1
    });
    
    $('#overlay img').swiperight(function(event) {
        imgUpdate(1); //move +1
    });


//EXIT OVERLAY BY CLICKING ON IT
    
    //	 When overlay is clicked
    	$overlay.click(function() {
    		//Hide/fade out overlay 
    		$overlay.fadeOut(500);
    	});	




//TO DO

//Find a way to only iterate through images displayed from active search
//Find a way to show arrows only on mouse hover
		