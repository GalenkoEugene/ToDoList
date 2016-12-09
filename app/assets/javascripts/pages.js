$(document).ready(function() {
	var chackBoxTag = $(".checked");

    chackBoxTag.click(function(e) {
        var taskId = $(this).attr('id');
        var thisChackBox = $(this);
        var task_object = thisChackBox.closest("tr.forchack").find("td.tasks");

    	if ($(this).attr('value') == 'false') {

              $.ajax({
                      method: "POST",
                      url: "/tasks/editTaskStatus/",
                      data: {id: taskId, value: true},
                      success: function(data) { 
                        task_object.toggleClass('stroked');
                        thisChackBox.val(true);
                      }

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
                        task_object.removeClass('stroked');
                        thisChackBox.val(false);
                      }
                      
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

  $(".edit_project_name").click(function(e){  /**/
    var project_id = $(this).prop('id');
    var project_title = $("#project_name_" + project_id);/*select by  project_name_id*/
    var old_project_name = project_title.text();   
    project_title.html(" <div class='input-group edit_project_name'> <input class='form-control edit_project_name_field' placeholder='"+old_project_name+"' type='text'> <span class='input-group-btn' value='"+old_project_name+"'> <input type='submit' value='Edit Task' class='btn btn-danger edit_project_name_send_ajax' id='bt_"+project_id+"' data-disable-with='Edit Task'> </span> ");    
  });

  $(document).on("click", ".edit_project_name_send_ajax", function(e){              /* edit project name with Ajax */
    var new_name_of_project = $(this).parent().parent().find("input.form-control.edit_project_name_field").val();
    var current_project_id = $(this).attr('id').replace('bt_', '');
    current_project_title = $("#project_name_" + current_project_id);
    var old_project_name_for_current_project = $(this).parent(".input-group-btn").attr('value');
    
              $.ajax({
                      method: "POST",
                      url: "/projects/editProjectName/",
                      data: {id: current_project_id, name: new_name_of_project},
                      success: function(data) { 
                        current_project_title.text(new_name_of_project);                  
                      }
                      
                    })
                        .error(function (a) {
                          current_project_title.text(old_project_name_for_current_project);
                          alert('error');
                        });

  });
  
  $(".edit_task_bt").click(function(){                                    /*edit task in projects*/
    var this_elem = $(this);
    var task_id = this_elem.attr('id').replace('bt_edit_id_', '');
    var editable_field = this_elem.closest("tr.forchack").find(".tasks");
    var editable_text = editable_field.text();
    editable_field.html("<div class='input-group edit_task_name'> <input class='form-control edit_task_name_field' placeholder='"+editable_text+"', value='"+editable_text+"' type='text'> <span class='input-group-btn' value='"+editable_text+"'> <input type='submit' value='Save' class='btn btn-warning edit_task_name_send_ajax' id='bt_edit_id_copy_"+task_id+"'> </span>"); 
    console.log(editable_text);
    
  });

  $(document).on("click", ".edit_task_name_send_ajax", function(e){              /* edit task name with Ajax */
    var new_name_of_task = $(this).parent().parent().find("input.form-control.edit_task_name_field").val();
    var current_task_id = $(this).attr('id').replace('bt_edit_id_copy_', '');
    current_edited_task = $(this).closest("tr.forchack").find(".tasks");
    var old_task_name_for_current_project = $(this).parent(".input-group-btn").attr('value');
    //console.log('new_name:'+new_name_of_project + ', pr_id:'+project_id +', current_pr_id: '+ current_project_id);
    
              $.ajax({
                      method: "POST",
                      url: "/tasks/editTaskName/",
                      data: {id: current_task_id, name: new_name_of_task},
                      success: function(data) { 
                      console.log(data);
                       
                    }
                      
                    })
                      .done(function( msg ) {
                        current_edited_task.text(new_name_of_task);
                      })
                        .error(function (a) {
                          current_edited_task.text(old_task_name_for_current_project);
                          alert('error');
                        });

  });

  var for_replace_controls_bt;
  var this_dedline_calc;
  $(".glyphicon-calendar.deadline").click(function(){                                       /***** deadline datepicker *****/

    if($(".temporary").length) {
        return false;
    }else{
      this_dedline_calc = $(this);
      var all_controls_bt = this_dedline_calc.parents(".forchack").find(".control");
      for_replace_controls_bt = all_controls_bt.not(".calendar").detach();
      all_controls_bt.after("<td colspan='4' class='temporary'><div class='input-group select_deadline_field_input'> <input class='form-control save_deadline_field datepicker' placeholder='Click here' type='text'> <span class='input-group-btn'> <input type='submit', value='S' class='btn btn-info save_deadline_send_ajax' id='bt_save_deadline'> </span></td>");
  
      $(".datepicker").datepicker({ 
        format: 'dd.mm.yyyy',  // Date Format used
        todayHighlight: true,
        toggleActive: true,
        daysOfWeekHighlighted: '06',
        startDate: new Date(),
        title: 'Take the "deadline"',
        autoclose: true,
        weekStart: 1  
      });
    }

  });

  $(document).on("click", ".save_deadline_send_ajax", function(e){                                  /*****set deadline*****/
    var day_of_deadline = $(this).parents(".select_deadline_field_input").find(".datepicker").val();
    var task_id = $(this).parents(".forchack").attr('id').replace('tr_task_id_', '');
    
      $.ajax({
        method: "POST",
        url: "/tasks/setDeadline/",
        data: {id: task_id, deadline: day_of_deadline},
        success: function(data) { 
          $(".temporary").remove();
          this_dedline_calc.parent().after(for_replace_controls_bt);
          this_dedline_calc.prop('title', day_of_deadline);         
        }
      })
        .error(function (a) {
          alert('error');
          $(".temporary").remove();
          this_dedline_calc.parent().after(for_replace_controls_bt);
        });
  });

  $(".glyphicon-arrow-down, .glyphicon-arrow-up").click(function(){                                   /*****swap tasks*****/
    var current_row = $(this).parents(".forchack");
    var task_id_one = current_row.attr('id').replace('tr_task_id_', '');
    var other_row = null;
    var it_is_down = $(this).attr('class').indexOf('down') != -1;

    if(it_is_down){
      other_row = $(this).parents(".forchack").next(".forchack");
    }else{
      other_row = $(this).parents(".forchack").prev(".forchack");
    }  
    
    if(other_row.length){
      var task_id_two = other_row.attr('id').replace('tr_task_id_', '');

      $.ajax({
          method: "POST",
          url: "/tasks/swapTasks/",
          data: {id_one: task_id_one, id_two: task_id_two},
                  
          success: function(data) { 
            if(it_is_down){
              var new_position_row = current_row.detach();
              other_row.after(new_position_row);
            }else{
              var new_position_row = current_row.detach();
              other_row.before(new_position_row);
             }
            }             
      })                  
    }else{
      alert("Oops");
    }
  });


  $(document).on("submit", "#new_project", function(e){  /* Create new project Ajax */
    
    $.ajax({
          method: "POST",
          url: $(this).attr('action'), /*insted of '/projects/' */ //$(this).attr('action')
          data: $(this).serialize(),
                  
          success: function(h) { 

            $("#new_project")[0].reset();
            $("#new_project").find('input[type="submit"]').prop('disabled', false);
            $('#modal_add_project').modal('hide');
            $(".table.table-hover").first().before(h);
          } 
    })
    e.preventDefault();

  });
/*
$("#new_project").submit(function(e){
  e.preventDefault();
});
*/
$(document).on("submit", ".new_task", function(e){  /* Add new Task to project Ajax */
    console.log($(this));
    var form = $(this);
    var put_here = $(this).parents("table").find(".forchack").first();
    $.ajax({
          method: "POST",
          url: $(this).attr('action'), /*insted of '/projects/' */ //$(this).attr('action')
          data: $(this).serialize(),
                  
          success: function(h) {
            //$(".new_task")[0].reset();
            //form.find(".btn.btn-success.addTask").prop('disabled', false);
            //console.log(form.find("input.btn.btn-success.addTask"));
            e.prop('disabled', false);
            //form.parents(".add_tast_to_project").find('input[type="submit"]').prop('disabled', false);
            put_here.before(h);
          } 
    })
    e.preventDefault();

  });


 });