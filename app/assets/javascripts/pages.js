$(document).ready(function() {
	var chackBoxTag = $(".checked");

    chackBoxTag.click(function(e) {
        var taskId = $(this).attr('id');
        var thisChackBox = $(this);
        var task_object = thisChackBox.closest("tr.forchack").find("td.tasks");

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

                    })
                      .done(function( msg ) {
                        task_object.toggleClass('stroked');
                        thisChackBox.val(true);

                      })
                        .error(function (a) {
                          thisChackBox.val(false);
                          thisChackBox.prop("checked", false);
                          alert('error');
                        });
          return true;
    	}else{
              $.ajax({
                      method: "POST",
                      url: "/tasks/editTaskStatus/",
                      data: {id: taskId, value: false},
                      success: function(data) { 
                        console.log(data);
                      }
                      
              })
                .done(function( msg ) {
                  task_object.removeClass('stroked');
                  thisChackBox.val(false);
                })
                  .error(function (a) {
                    thisChackBox.val(true);
                    thisChackBox.prop("checked", true);
                    alert('error');
                  });

    	}
      
    });
   

    function strokeCheckedTasks(e){		//strocked//
    	e.each(function(i,elem) {
    	  if (elem.getAttribute('value') == 'true') {
          $(this).prop( "checked", true ); /*add checked to chack_box_tag*/
    	  	$(this).closest(".forchack").find(".tasks").toggleClass('stroked');   
        }

    	});
    };

    strokeCheckedTasks(chackBoxTag); /*set chaced and strocked for all tasks*/   




//var edit_project_links = $(".glyphicon.glyphicon-pencil.edit_project_name");
  $(".edit_project_name").click(function(e){  /**/

    var project_id = $(this).prop('id');
    var project_title = $("#project_name_" + project_id);/*select by  project_name_id*/
    var old_project_name = project_title.text();   
    project_title.html(" <div class='input-group edit_project_name'> <input class='form-control edit_project_name_field' placeholder='Start typing here to edit a project name...' type='text'> <span class='input-group-btn' value='"+old_project_name+"'> <input type='submit' value='Edit Task' class='btn btn-danger edit_project_name_send_ajax' id='bt_"+project_id+"' data-disable-with='Edit Task'> </span> "); 
    
    });

//var current_project_id = null;
  $(document).on("click", ".edit_project_name_send_ajax", function(e){              /* edit project name with Ajax */
    var new_name_of_project = $(this).parent().parent().find("input.form-control.edit_project_name_field").val();
    var current_project_id = $(this).attr('id').replace('bt_', '');
    current_project_title = $("#project_name_" + current_project_id);
    var old_project_name_for_current_project = $(this).parent(".input-group-btn").attr('value');
    //console.log('new_name:'+new_name_of_project + ', pr_id:'+project_id +', current_pr_id: '+ current_project_id);
    
              $.ajax({
                      method: "POST",
                      url: "/projects/editProjectName/",
                      data: {id: current_project_id, name: new_name_of_project},
                      success: function(data) { 
                      console.log(data);
                       
                    }
                      
                    })
                      .done(function( msg ) {
                        current_project_title.text(new_name_of_project);
                      })
                        .error(function (a) {
                          current_project_title.text(old_project_name_for_current_project);
                          alert('error');
                        });

  });

 });