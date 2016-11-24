$(document).ready(function() {
	var chackBoxTag = $(".checked");

    chackBoxTag.click(function(e) {
      $(this).closest(".forchack").toggleClass('stroked');
    });
    
    $(".icon-move").click(function(){
    $(this).closest(".forchack").sortable();
    });

    $(function strokeCheckedTasks(){		//strocked//
    	chackBoxTag.each(function(i,elem) {
    		//chackBoxTag.closest(".forchack").toggleClass('stroked');
    		console.log(elem.getAttribute('value'));
    		var valueOfCheckbox = elem.getAttribute('value');
    		//alert(valueOfCheckbox);
    	  if (valueOfCheckbox == 'true') {
    	  	
    	  	$(this).closest(".forchack").toggleClass('stroked');
    	  }
    	});
    	
    });
   
});


