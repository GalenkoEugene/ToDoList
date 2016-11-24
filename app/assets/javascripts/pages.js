$(document).ready(function() {
	var chackBoxTag = $(".checked");

    chackBoxTag.click(function(e) {
       	//console.log($(this).attr('value'));
    	if ($(this).attr('value') == 'false') {
    	  $(this).closest(".forchack").toggleClass('stroked');
	    	  /*отправить Ajax, 
	    	  сохранить в базу task.status как 'true', 
	    	  изменить значение value='true', 
	    	  "Задание ВЫПОЛНЕННО"*/
    	}else{
    		$(this).closest(".forchack").removeClass('stroked');
	    	  /*изменить value='false', 
	          task.status = 'false', 
	    	  "Задание НЕ сделано"*/
    		alert("Removed");
    	 }
      
    });
    
    $(".icon-move").click(function(){
    $(this).closest(".forchack").sortable();
    });

    $(function strokeCheckedTasks(){		//strocked//
    	chackBoxTag.each(function(i,elem) {
    	//chackBoxTag.closest(".forchack").toggleClass('stroked');
    	//console.log(elem.getAttribute('value'));
    	//var valueOfCheckbox = elem.getAttribute('value');
    		//alert(valueOfCheckbox);
    	  if (elem.getAttribute('value') == 'true') {
    	  	$(this).closest(".forchack").toggleClass('stroked');
          }

    	});
    	
    });

    $(function removeStrokeForTask(){ /*remove stroked style*/

    });
   
});


