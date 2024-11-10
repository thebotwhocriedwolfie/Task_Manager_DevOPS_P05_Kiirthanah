console.log("editTasks.js loaded");//check
//function to load categories
async function loadCategories(){
    console.log("Loading categories...");//check
    try{
        //fetching Json file containing categories
        const response = await fetch('categories.json');
        const categories = await response.json();

        const dropdown = document.getElementById('categoryDropdown');//dropdown menu in html

        for (let i = 0; i < categories.length; i++) {
            const option = document.createElement('option');
            option.value = categories[i].name; // Set option value to category id
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
    document.getElementById('categoryDropdown').value=selectedTask.category;
    document.getElementById('editStart_time').value=selectedTask.start_time;
    document.getElementById('editEnd_time').value=selectedTask.end_time;
    document.getElementById('editTimestamp').value=selectedTask.timestamp;

    document.getElementById("updateButton").setAttribute('onclick', 'updateTask("'+selectedTask.id+'")');
    
    $('#editTaskModal').modal('show');
}   

/*function updateTask(id) {
    console.log(id);

    const jsonData = {
        name: document.getElementById('editName').value,
        description: document.getElementById('editDescription').value,
        category: document.getElementById('categoryDropdown').value,
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
}*/
function updateTask(id) {
    console.log(id);

    const jsonData = {
        name: document.getElementById('editName').value,
        description: document.getElementById('editDescription').value,
        category: document.getElementById('categoryDropdown').value,
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



/*function updateTask(id){
    console.log(id)
    var response='';

    var jsonData=new Object();
    jsonData.name=document.getElementById('editName').value;
    jsonData.description=document.getElementById('editDescription').value;
    jsonData.category=document.getElementById('categoryDropdown').value;
    jsonData.start_time=document.getElementById('editStart_time').value;
    jsonData.end_time=document.getElementById('editEnd_time').value;
    jsonData.timestamp=document.getElementById('editTimestamp').value;

    //missing data field check
    if( jsonData.name=='' || jsonData.description=='' ||jsonData.category==''|| jsonData.start_time==''||jsonData.end_time==''|| jsonData.timestamp==''){
        document.getElementById('editMessage').innerhtml='All fields are required';
        document.getElementById('editMessage').setAttribute('class','text-danger');
        return
    }
    
    const url = `/tasks/${id}`;

    var request= new XMLHttpRequest();

    request.open('PUT','/edit-task/'+id,true);
    request.setRequestHeader('Content-Type','application/json');

    request.onload=function(){
        response=JSON.parse(request.responseText);

        if (response.message=='Task modified successfully'){
            document.getElementById("editMessage").innerHTML = 'Edited Resource: ' +jsonData.name + '!';
            document.getElementById("editMessage").setAttribute("class","text-success");
            window.location.href = 'index.html';
        }else {
            document.getElementById("editMessage").innerHTML = 'Unable to edit resource!';
            document.getElementById("editMessage").setAttribute("class", "text-danger");
        }
        };
        request.send(JSON.stringify(jsonData));
    }*/

//delete task
function deleteTask(id) {
    var response = "";
    var request = new XMLHttpRequest();
    request.open("DELETE", "/edit-task/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
    response = JSON.parse(request.responseText);
    if (response.message == 'Task deleted successfully') {
    window.location.href = 'index.html';
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
    

    /*const url = `/edit-task/${id}`;
    
    var request = new XMLHttpRequest();
    request.open('PUT', url, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function() {
        try {
            response = JSON.parse(request.responseText);

            if (response.message === 'Task modified successfully') {
                document.getElementById("editMessage").innerHTML = `Edited Resource: ${jsonData.name}!`;
                document.getElementById("editMessage").setAttribute("class", "text-success");
                window.location.href = 'index.html';
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
}*/