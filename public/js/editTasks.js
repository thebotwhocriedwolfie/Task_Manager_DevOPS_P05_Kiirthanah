console.log("editTasks.js loaded");//check
//function to load categories
async function loadCategoryDropdown() {
    try {
        var request = new XMLHttpRequest();
        request.open('GET', '/view-categories', true);
        request.setRequestHeader('Content-Type', 'application/json');
      
        request.onload = function () {
            var categories = JSON.parse(request.responseText);
            var optionsHtml = '';
            // Clear the current options before adding new ones
            document.getElementById('editCategoryDropdown').innerHTML = '';
            // Display a message if no categories are found
            if (categories.length === 0) {
                optionsHtml = '<option value="">No categories found</option>';
            } else {
                optionsHtml = '<option value="">--Select a Category--</option>';
                // Generate <option> elements for each category
                categories.forEach(category => {
                    optionsHtml += `<option value="${category.name}">${category.name}</option>`;
                });
            }

            // Insert the generated options into the categoryDropdown select element
            document.getElementById('editCategoryDropdown').innerHTML += optionsHtml;
        };
        request.send();
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}
document.addEventListener('DOMContentLoaded', loadCategoryDropdown);

//edit task
function editTask(data){
    var selectedTask= JSON.parse(data);
    document.getElementById("editTaskId").value = selectedTask.id;
    document.getElementById("editName").value= selectedTask.name;
    document.getElementById("editDescription").value= selectedTask.description;
    document.getElementById('editCategoryDropdown').value=selectedTask.category;
    document.getElementById('editStart_time').value=selectedTask.start_time;
    document.getElementById('editEnd_time').value=selectedTask.end_time;
    document.getElementById('editTimestamp').value=selectedTask.timestamp;

    document.getElementById("updateButton").setAttribute('onclick', 'updateTask("'+selectedTask.id+'")');
    
    $('#editTaskModal').modal('show');
}   

function updateTask(id) {
    console.log(id);

    const jsonData = {
        name: document.getElementById('editName').value,
        description: document.getElementById('editDescription').value,
        category: document.getElementById('editCategoryDropdown').value,
        start_time: document.getElementById('editStart_time').value,
        end_time: document.getElementById('editEnd_time').value,
        timestamp: document.getElementById('editTimestamp').value
    };

    // Check for missing data
    if (jsonData.name === '' || jsonData.description === '' || jsonData.category === '' ||
        jsonData.start_time === '' || jsonData.end_time === '' || jsonData.timestamp === '') {
        document.getElementById('editMessage').innerHTML = 'All fields are required';
        document.getElementById('editMessage').setAttribute('class', 'text-danger');
        return;
    }

    //check start time and end time
    if (start_time==end_time){
          document.getElementById('editMessage').innerHTML='Start Time and end Time cannot be the same';     
    }
    //check for valid start time and end time input
    if(start_time>end_time){
        document.getElementById('editMessage').innerHTML='Start time cannot be after the end time'
    }
    //check if date chosen is greater/equal to present day
    if(timestamp<currentDate){
        document.getElementById('editMessage').innerHTML='Date chosen has passed.'
    }
    
    const url = `/tasks/${id}`;

    const request = new XMLHttpRequest();
    request.open('PUT', url, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function() {
        try {
            const response = JSON.parse(request.responseText);

            if (response.message === 'Task modified successfully') {
                document.getElementById("editMessage").innerHTML = 'Edited Resource: ' + jsonData.name + '!';
                document.getElementById("editMessage").setAttribute("class", "text-success");
                window.location.href = 'index.html';
                alert(response.message);
            } else {
                document.getElementById("editMessage").innerHTML = 'Unable to edit resource!';
                document.getElementById("editMessage").setAttribute("class", "text-danger");
            }
        } catch (error) {
            console.error("Error parsing response:", error);
            document.getElementById("editMessage").innerHTML = 'Invalid response format!';
            document.getElementById("editMessage").setAttribute("class", "text-danger");
        }
    };

    request.onerror = function() {
        console.error("Request encountered an error");
        document.getElementById("editMessage").innerHTML = 'Network error!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
    };

    request.send(JSON.stringify(jsonData));
}




//delete task
function deleteTask(id) {
    var response = "";
    var request = new XMLHttpRequest();
    request.open("DELETE", "/tasks/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
    response = JSON.parse(request.responseText);
    if (response.message == 'Task deleted successfully') {
    window.location.href = 'index.html';
    alert(response.message);
    }
    else {
    alert('Unable to delete task!');
    }
    };
    request.send();
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Find the modal element by its ID
        var editTaskModal = document.getElementById('editTaskModal');
    
        // Add the 'shown.bs.modal' event listener to load categories when the modal opens
        editTaskModal.addEventListener('shown.bs.modal', function () {
            loadCategories(); // Call the function to load categories
        });
    });
    

    