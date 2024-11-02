function addResource() {
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
    request.open("POST", "/add-resource", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response);

        if (response.message === undefined) {
            document.getElementById("message").innerHTML = 'Added Resource: ' + jsonData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");
            
            // Clear input fields
            document.getElementById("name").value = "";
            document.getElementById("start_time").value = "";
            document.getElementById("description").value = "";
            document.getElementById("end_time").value = "";
            
            // Redirect to main page after addition
            window.location.href = 'index.html';
        } else {
            document.getElementById("message").innerHTML = 'Unable to add resource!';
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };
    
    // Send request with data in JSON format
    request.send(JSON.stringify(jsonData));
}
