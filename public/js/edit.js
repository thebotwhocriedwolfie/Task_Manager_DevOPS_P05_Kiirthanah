const fs = require('fs').promises;

// Function to read a JSON file
async function readJSON(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');  // Read the file contents
        return JSON.parse(data);  // Parse the JSON data and return it
    } catch (error) {
        throw new Error(`Error reading JSON file: ${error.message}`);
    }
}

//function to load categories
async function loadCategories(){
    try{
        //fetching Json file containing categories
        const response = await fetch('./utils/categories.json');
        const categories = await response.json();

        const dropdown = document.getElementById('categoryDropdown');//dropdown menu in html

        for (let i = 0; i < categories.length; i++) {
            const option = document.createElement('option');
            option.value = categories[i].id; // Set option value to category id
            option.textContent = categories[i].name; // Display category name in dropdown
            dropdown.appendChild(option);
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}


//fuction to update tasks
async function editTask(req,res) {
    try{
        const id= req.params.id;
        const {
            name,
            description,
            category,
            start_time,
            end_time,
            timestamp
        }= req.body;

        // Check if all required fields are present
        if (!id || !name || !description || !category || !start_time || !end_time || !timestamp) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        //load data from json file into allTasks array
        const allTasks= await readJSON('./utils/tasks.json');

        var modified= false;//...

        //iterate through array 
        for( var i=0; i< allTasks.length; i++){
            var currentTask=allTasks[i];
            if(currentTask.id==id){
                allTasks[i].name=name;
                allTasks[i].description=description;
                allTasks[i].category=category;
                allTasks[i].start_time=start_time;
                allTasks[i].end_time=end_time;
                allTasks[i].timestamp=timestamp;

                modified=true;
                break;
            }
        }

        if (!modified) {
            // Task with specified ID not found
            return res.status(404).json({ message: 'Task not found with provided ID' });
        }else{
            // Write the updated data back to the JSON file
            await fs.writeFile('./utils/tasks.json', JSON.stringify(allTasks, null, 2), 'utf8')
            return res.status(200).json({ message: 'Task modified successfully' });

        }

    } catch (error) {
        return res.status(500).json({ message: `Unexpected error: ${error.message}` });
    }
}

//function to delete tasks
async function deleteTask(req, res) {
    try{
        const id=req.params.id;
        
        const allTasks=await readJSON('utils/tasks.json');
        var index=-1;

        for(var i=0; i<allTasks.length;i++){
            var currentTask=allTasks[i];
            if(currentTask.id==id){
                index=i;
            } 
        }if(index!=-1){
            allTasks.splice(index,1);
            await fs.writeFile('./utils/tasks.json', JSON.stringify(allTasks),'utf8');
            return res.status(201).json({message:'Task deleted successfully'});
        }else{
            return res.status(500).json({message:'Error occurred, unable to delete!'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

module.exports={editTask,deleteTask,loadCategories};