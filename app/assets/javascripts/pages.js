$(document).ready(function() {
	var chackBoxTag = $(".checked");

    chackBoxTag.click(function(e) {
       // e.preventDefault();
        var taskId = $(this).attr('id');
        var thisChackBox = $(this);
        var task_object = thisChackBox.closest("tr.forchack").find("td.tasks");
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
                        task_object.toggleClass('stroked');
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
                        task_object.removeClass('stroked');
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

var old_project_name = "";
var project_id = null;
var project_title = null;

  $(".edit_project_name").click(function(e){  

    project_id = $(this).prop('id');
    project_title = $("#project_name_" + project_id);/*select by  project_name_id*/
    old_project_name = project_title.text();
    
    project_title.html(" <div class='input-group edit_project_name'> <input class='form-control edit_project_name_field' placeholder='Start typing here to edit a project name...' type='text'> <span class='input-group-btn'> <input type='submit' value='Edit Task' class='btn btn-danger edit_project_name_send_ajax' data-disable-with='Edit Task'> </span> ");
     
    });


  $(document).on("click", ".edit_project_name_send_ajax", function(e){              /* edit project name with Ajax */
    var new_name_of_project = $(this).parents().find("input.form-control.edit_project_name_field").val(); 
    console.log(new_name_of_project + project_id);
    
              $.ajax({
                      method: "POST",
                      url: "/projects/editProjectName/",
                      data: {id: project_id, name: new_name_of_project},
                      success: function(data) { 
                      console.log(data);
                       
                    }
                      
                    })
                      .done(function( msg ) {
                        project_title.text(new_name_of_project);
                      })
                        .error(function (a) {
                          project_title.text(old_project_name);
                          alert('error');
                        });

  });

 });