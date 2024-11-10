function loadCategoryDropdown() {
  var request = new XMLHttpRequest();
  request.open('GET', '/view-categories', true);
  request.setRequestHeader('Content-Type', 'application/json');

  request.onload = function () {
      var categories = JSON.parse(request.responseText);
      var optionsHtml = '';
      // Clear the current options before adding new ones
      document.getElementById('categoryDropdownBox').innerHTML = '';

      // Display a message if no categories are found
      if (categories.length === 0) {
          optionsHtml = '<option value="">No categories found</option>';
      } else {
        optionsHtml = '<option value="">All</option>';
        // Generate <option> elements for each category
        categories.forEach(category => {
          optionsHtml += `<option value="${category.name}">${category.name}</option>`;
        });
      }

      // Insert the generated options into the categoryDropdown select element
      document.getElementById('categoryDropdownBox').innerHTML += optionsHtml;
  };

  request.send();
}

// Call loadCategoryDropdown when the page loads to display category options
document.addEventListener('DOMContentLoaded', loadCategoryDropdown);

function loadTasks(category = "") {
    var response = "";
    var request = new XMLHttpRequest();
    request.open("GET", "/view-tasks", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
      response = JSON.parse(request.responseText);
      filteredTasks = response;

      // Filter tasks by category if a category is provided
      if (category) {
        filteredTasks = response.filter(task => task.category === category);
      }

      var html = "";
      for (var i = 0; i < filteredTasks.length; i++) {
        html +=
          "<tr>" +
          "<td>" + (i + 1) + "</td>" +
          "<td>" + filteredTasks[i].name + "</td>" +
          "<td>" + filteredTasks[i].category + "</td>" +
          "<td>" + filteredTasks[i].description + "</td>" +
          "<td>" + filteredTasks[i].start_time + "</td>" +
          "<td>" + filteredTasks[i].end_time + "</td>" +
          "<td>" +

          response[i].timestamp +
          "</td>" +
          "<td>" +

          '<button type="button" class="btn btn-warning" onclick="editTask(\'' +
          JSON.stringify(response[i]).replaceAll('"', "&quot;") + "')\">Edit</button> " +
          '<button type="button" class="btn btn-danger" onclick="deleteTask(' +
          response[i].id + ')"> Delete</button>' +
          "</td>" +
          "</tr>";
      }
      // Display a message if no tasks are found
      if (html === "") {
        html = "<tr><td colspan='8' class='text-center'>No tasks found</td></tr>";
      }
      document.getElementById("tableContent").innerHTML = html;
    };
    request.send();
  }