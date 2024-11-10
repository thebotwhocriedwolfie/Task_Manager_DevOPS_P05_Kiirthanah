function addCategory() {
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("categoryName").value;
    var request = new XMLHttpRequest();
    request.open("POST", "/add-category", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)
        if (response.message == undefined) {
            document.getElementById("categoryMessage").innerHTML = 'Added Resource: ' + jsonData.name + '!';
            document.getElementById("categoryMessage").setAttribute("class", "text-success");
            document.getElementById("categoryName").value = "";
            window.location.href = 'index.html';
        } else if (response.message == 'Enter the name of the category!') {
            document.getElementById("categoryMessage").innerHTML = 'Enter the name of the category!';
            document.getElementById("categoryMessage").setAttribute("class", "text-danger");
        } else if (response.message == 'Category already exists!') {
            document.getElementById("categoryMessage").innerHTML = 'Category already exists!';
            document.getElementById("categoryMessage").setAttribute("class", "text-danger");
        } else if (response.message == 'Name cannot be only spaces!') {
            document.getElementById("categoryMessage").innerHTML = 'Name cannot be only spaces!';
            document.getElementById("categoryMessage").setAttribute("class", "text-danger");
        }else {
            document.getElementById("categoryMessage").innerHTML = 'Unable to add resource!'; document.getElementById("message").setAttribute("class", "textdanger");
            document.getElementById("categoryMessage").setAttribute("class", "text-danger");
        }
    };
    request.send(JSON.stringify(jsonData));
}

function viewCategories() {
    var response = '';
    var request = new XMLHttpRequest();

    request.open('GET', '/view-categories', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);
        var html = ''
        for (var i = 0; i < response.length; i++)
        {
            html += '<tr>' +
                '<td>' + response[i].name + '</td>' +
            '</tr>'
        }

        document.getElementById('categoriesTable').innerHTML = html;
    };
    
    request.send();
}