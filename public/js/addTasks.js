console.log("addTasks.js loaded"); // Check if the script loads

// Function to load categories
async function loadCategories() {
    console.log("Loading categories..."); // Check if loading categories starts
    try {
        // Fetch the JSON file containing categories
        const response = await fetch('categories.json');
        const categories = await response.json();

        const dropdown = document.getElementById('categoryDropdown'); // Dropdown menu in HTML

        // Static "Test" option
        const testOption = document.createElement('option');
        testOption.value = "Test";
        testOption.textContent = "Test";
        dropdown.appendChild(testOption);

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

// Function to add a new task
async function addTask() {
    const jsonData = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        category: document.getElementById("categoryDropdown").value,
        start_time: document.getElementById("start_time").value,
        end_time: document.getElementById("end_time").value,
        timestamp: new Date().toISOString() // Current timestamp
    };

    // Check for missing data
    if (!jsonData.name || !jsonData.description || !jsonData.category ||
        !jsonData.start_time || !jsonData.end_time) {
        document.getElementById('addMessage').innerHTML = 'All fields are required';
        document.getElementById('addMessage').setAttribute('class', 'text-danger');
        return;
    }

    try {
        const response = await fetch('/add-tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById("addMessage").innerHTML = `Added Task: ${jsonData.name}!`;
            document.getElementById("addMessage").setAttribute("class", "text-success");
            window.location.href = 'index.html'; // Redirect to main page
        } else {
            document.getElementById("addMessage").innerHTML = 'Failed to add task!';
            document.getElementById("addMessage").setAttribute("class", "text-danger");
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("addMessage").innerHTML = 'An error occurred.';
        document.getElementById("addMessage").setAttribute("class", "text-danger");
    }
}

// Load categories when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    loadCategories(); // Call the function to load categories on page load
});
