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
    // Check if start time and end time are the same
    if (jsonData.start_time === jsonData.end_time) {
        document.getElementById('editMessage').innerHTML = 'Start Time and End Time cannot be the same.';
        document.getElementById('editMessage').setAttribute('class', 'text-danger');
        return;
    }

    // Check if start time is after end time
    if (jsonData.start_time > jsonData.end_time) {
        document.getElementById('editMessage').innerHTML = 'Start Time cannot be after the End Time.';
        document.getElementById('editMessage').setAttribute('class', 'text-danger');
        return;
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
