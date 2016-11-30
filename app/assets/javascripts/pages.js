$(document).ready(function() {
	var chackBoxTag = $(".checked");

    chackBoxTag.click(function(e) {
       // e.preventDefault();
        var taskId = $(this).attr('id');
        var thisChackBox = $(this);
    //console.log($(this).attr('value'));
    	if ($(this).attr('value') == 'false') {
            /*отправить Ajax, 
              сохранить в базу task.status как 'true', 
              изменить значение value='true', 
              "Задание ВЫПОЛНЕННО"*/
              $.ajax({
                      method: "POST",
                      url: "/tasks/editTaskStatus/",
                      data: {id: taskId, value: true},
                      success: function(data) { 
                      console.log(data);
                       
                    }
                      /*dataType: "json"*/
                    })
                      .done(function( msg ) {
                        thisChackBox.closest(".forchack").toggleClass('stroked');
                        thisChackBox.val(true);
                       // thisChackBox.attr("checked", true);
                        /*alert( "Data Saved: " + msg );*/
                      })
                        .error(function (a) {
                          thisChackBox.val(false);
                          thisChackBox.prop("checked", false);
                          alert('error');
                        });
          return true;
    	}else{
              /*изменить value='false', 
              task.status = 'false', 
              "Задание НЕ сделано"*/
              $.ajax({
                      method: "POST",
                      url: "/tasks/editTaskStatus/",
                      data: {id: taskId, value: false},
                      success: function(data) { 
                      console.log(data);
                       
                    }
                      /*dataType: "json"*/
                    })
                      .done(function( msg ) {
                        thisChackBox.closest(".forchack").removeClass('stroked');
                        thisChackBox.val(false);
                      //  thisChackBox.attr("checked", false);
                        /*alert( "Data Saved: " + msg );*/
                      })
                        .error(function (a) {
                          thisChackBox.val(true);
                          thisChackBox.prop("checked", true);
                          alert('error');
                        });
    		//$(this).closest(".forchack").removeClass('stroked');
        //$(this).val(false);
    		//alert("Removed");
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
    	  	$(this).closest(".forchack").find(".tasks").toggleClass('stroked');
            
          }

    	});
    };

    strokeCheckedTasks(chackBoxTag); /*set chaced and strocked for all tasks*/   


  $(".edit_project_name").click(function(e){  /* edit project name with Ajax */
    var project_id = $(this).prop('id');
    var project_title = $("#project_name_" + project_id);
    var project_title_text = project_title.text();
    //project_title.hide();
    //project_title.append("<input class='form-control' value='Edit Task' placeholder='Start typing here to edit a task...' type='text' > <span class='input-group-btn'> <input type='submit' value='Save changes' class='btn btn-danger' data-disable-with='Edit Task' > </span>"); 
    //project_title.html(" <div class='input-group'> <input class='form-control' placeholder='Start typing here to edit a task...' type='text'> <span class='input-group-btn'> <input type='submit' value='Edit Task' class='btn btn-success' data-disable-with='Edit Task'> </span> ");
    //project_title.html("<input class='form-control' value='Edit Task' placeholder='Start typing here to edit a task...' type='text' > <span class='input-group-btn'> <input type='submit' value='Save changes' class='btn btn-danger' data-disable-with='Edit Task' > </span>");
    
      project_title.html(" <div class='input-group'> <input class='form-control' placeholder='Start typing here to edit a task...' type='text'> <span class='input-group-btn'> <input type='submit' value='Edit Task' class='btn btn-success' data-disable-with='Edit Task'> </span> ");
     /* $.ajax({
        complete:function(request){},
        data:'address='+ $('#address').val(),
        dataType:'script',
        type:'get',
        url: '[ROUTE TO ACTION]' 
      })*/
  });

});


