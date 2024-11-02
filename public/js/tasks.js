function addTask() {
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    jsonData.start_time = document.getElementById("start_time").value;
    jsonData.description = document.getElementById("description").value;
    jsonData.end_time = document.getElementById("end_time").value;

    // Check if essential fields are provided
    if (jsonData.name === "" || jsonData.description === "" || jsonData.start_time === "" || jsonData.end_time === "") {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();
    request.open("POST", "/addTasks", true); // Updated endpoint here
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            response = JSON.parse(request.responseText);
            console.log(response);

            // Display success message
            document.getElementById("message").innerHTML = 'Added Task: ' + jsonData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");
            
            // Clear input fields
            document.getElementById("name").value = "";
            document.getElementById("start_time").value = "";
            document.getElementById("description").value = "";
            document.getElementById("end_time").value = "";
            
            // Optionally redirect to main page after addition
            // window.location.href = 'index.html'; // Uncomment if needed
        } else {
            // Handle error response
            document.getElementById("message").innerHTML = 'Unable to add task! Status: ' + request.status;
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };
    
    // Send request with data in JSON format
    request.send(JSON.stringify(jsonData));
}
