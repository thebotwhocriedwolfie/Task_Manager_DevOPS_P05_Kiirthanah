function loadTasks() {
    var response = "";
    var request = new XMLHttpRequest();
    request.open("GET", "/view-tasks", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
      response = JSON.parse(request.responseText);
      var html = "";
      for (var i = 0; i < response.length; i++) {
        html +=
          "<tr>" +
          "<td>" +
          (i + 1) +
          "</td>" +
          "<td>" +
          response[i].name +
          "</td>" +
          "<td>" +
          response[i].category +
          "</td>" +
          "<td>" +
          response[i].description +
          "</td>" +
          "<td>" +
          response[i].start_time +
          "</td>" +
          "<td>" +
          response[i].end_time +
          "</td>" +
          "<td>" +
          response[i].timestamp +
          "</td>" +
          "<td>" +
          '<button type="button" class="btn btn-warning" onclick="editTask(\'' +
          JSON.stringify(response[i]).replaceAll('"', "&quot;") +
          "')\">Edit</button> " +
          '<button type="button" class="btn btn-danger" onclick="deleteTask(' +
          response[i].id +
          ')"> Delete</button>' +
          "</td>" +
          "</tr>";
      }
      document.getElementById("tableContent").innerHTML = html;
    };
    request.send();
  }