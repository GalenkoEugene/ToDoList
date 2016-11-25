$(document).ready(function() {
	var chackBoxTag = $(".checked");

    chackBoxTag.click(function(e) {
       	//console.log($(this).attr('value'));
    	if ($(this).attr('value') == 'false') {
            /*отправить Ajax, 
              сохранить в базу task.status как 'true', 
              изменить значение value='true', 
              "Задание ВЫПОЛНЕННО"*/
    	  $(this).closest(".forchack").toggleClass('stroked');
          $(this).val(true);
          return true;
    	}else{
              /*изменить value='false', 
              task.status = 'false', 
              "Задание НЕ сделано"*/
    		$(this).closest(".forchack").removeClass('stroked');
            $(this).val(false);
    		alert("Removed");
    	 }
      
    });
    
    $(".icon-move").click(function(){
    $(this).closest(".forchack").sortable();
    });

    function strokeCheckedTasks(e){		//strocked//
    	e.each(function(i,elem) {
    	//chackBoxTag.closest(".forchack").toggleClass('stroked');
    	//console.log(elem.getAttribute('value'));
    	//var valueOfCheckbox = elem.getAttribute('value');
    	//alert(valueOfCheckbox);
    	  if (elem.getAttribute('value') == 'true') {
            //console.log($(this));
            $(this).prop( "checked", true ); /*add checked to chack_box_tag*/
    	  	$(this).closest(".forchack").toggleClass('stroked');
            
          }

    	});
    };


    function removeStrokeForTask(){ /*remove stroked style*/

    };


    strokeCheckedTasks(chackBoxTag); /*set chaced and strocked for all tasks*/   
});


