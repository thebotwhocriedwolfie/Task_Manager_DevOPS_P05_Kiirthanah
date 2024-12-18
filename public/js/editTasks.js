console.log("editTasks.js loaded");//check

//function to load categories
async function EditLoadCategories() {
    console.log("Loading categories..."); // Check if loading categories starts
    try {
        // Fetch the JSON file containing categories
        const response = await fetch('categories.json');
        const categories = await response.json();

        const dropdown = document.getElementById('editCategoryDropdown'); // Dropdown menu in HTML


        // Dynamically add options from categories JSON
        for (let i = 0; i < categories.length; i++) {
            const option = document.createElement('option');
            option.value = categories[i].name; // Set option value to category name
            option.textContent = categories[i].name; // Display category name in dropdown
            dropdown.appendChild(option);
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}
//date and time check
function validateDateTime(start_time, end_time, timestamp, currentDate) {
    let errors = []; // Collect errors

    // Check if start time and end time are the same
    if (start_time === end_time) {
        errors.push('Start Time and End Time cannot be the same.');
    }

    // Check if start time is after end time
    if (start_time > end_time) {
        errors.push('Start Time cannot be after the End Time.');
    }

    // Check if the selected date is in the past
    if (timestamp < currentDate) {
        errors.push('The chosen date has already passed.');
    }

    // Display all errors
    if (errors.length > 0) {
        document.getElementById('editMessage').innerHTML = errors.join('<br>'); // Separate errors by line breaks
        document.getElementById('editMessage').setAttribute('class', 'text-danger');
        return false; // Prevent further processing
    }

    // If no errors, clear the message
    document.getElementById('editMessage').innerHTML = '';
    return true; // Validation passed
}

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
    //check for dates and time
    const currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    if (!validateDateTime(jsonData.start_time, jsonData.end_time, jsonData.timestamp, currentDate)) {
        return; // Stop if validation fails
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
                setTimeout(function() {
                    window.location.href = 'index.html';
                }, 1000); // Delay by 1s
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
/*function deleteTask(id) {
    var response = "";
    var confirm = window.confirm("Are you sure you want to delete this product?");
    
    // If confirm then proceed with deletion of task
    if (confirm) {
        var request = new XMLHttpRequest();
        request.open("DELETE", "/tasks/" + id, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == 'Task deleted successfully') {
            window.location.href = 'index.html';
            alert(response.message);
        }else {
            alert('Unable to delete task!');
        }
        };
        request.send();   
    }
}

    document.addEventListener('DOMContentLoaded', function () {
        // Find the modal element by its ID
        var editTaskModal = document.getElementById('editTaskModal');
    
        // Add the 'shown.bs.modal' event listener to load categories when the modal opens
        editTaskModal.addEventListener('shown.bs.modal', function () {
            EditLoadCategories(); // Call the function to load categories
        });
    });*/