async function addTask() {
    const jsonData = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        start_time: document.getElementById("start_time").value,
        end_time: document.getElementById("end_time").value,
        owner: document.getElementById("owner").value // Make sure there's an "owner" field in the HTML form
    };

    if (!jsonData.name || !jsonData.description || !jsonData.start_time || !jsonData.end_time || !jsonData.owner) {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (response.ok) {
            document.getElementById("message").innerHTML = `Added Task: ${jsonData.name}!`;
            document.getElementById("message").setAttribute("class", "text-success");
        } else {
            document.getElementById("message").innerHTML = 'Failed to add task!';
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("message").innerHTML = 'An error occurred.';
        document.getElementById("message").setAttribute("class", "text-danger");
    }
}
