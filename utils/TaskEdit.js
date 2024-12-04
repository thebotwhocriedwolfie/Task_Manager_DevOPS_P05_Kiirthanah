/*const fs = require('fs').promises;

// Function to read a JSON file
async function readJSON(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');  // Read the file contents
        return JSON.parse(data);  // Parse the JSON data and return it
    } catch (error) {
        throw new Error(`Error reading JSON file: ${error.message}`);
    }
}

//function to check date and time input
function validateDateTime(start_time, end_time, timestamp, currentDate) {
    const errors = []; // Collect errors

    // Check if start time and end time are the same
    if (start_time === end_time) {
        errors.push('Start Time and End Time cannot be the same.');
    }

    // Check if start time is after end time
    if (start_time > end_time) {
        errors.push('Start Time cannot be after the End Time.');
    }

    // Check if the selected date has already passed
    if (timestamp < currentDate) {
        errors.push('The chosen date has already passed.');
    }

    return errors; // Return array of error messages
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

        const currentDate = new Date().toISOString().split('T')[0];//getting current date as yy-mm-dd

        // Validate date and time
        const errors = validateDateTime(start_time, end_time, timestamp, currentDate);
        if (errors.length > 0) {
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        //check for dupliacte task name
        /*const allTasks= await readJSON('./utils/tasks.json');
        const isDuplicate = allTasks.some(task => task.id !== id && task.name === name);
        if(isDuplicate){
            return res.status(400).json({message:'Task name should be unique'})
        }//

        //load data from json file into allTasks array
        allTasks= await readJSON('./utils/tasks.json');
        var modified= false;

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

module.exports={editTask,deleteTask};*/

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

//function to check date and time input
function validateDateTime(start_time, end_time, timestamp, currentDate) {
    const errors = []; // Collect errors

    // Check if start time and end time are the same
    if (start_time === end_time) {
        errors.push('Start Time and End Time cannot be the same.');
    }

    // Check if start time is after end time
    if (start_time > end_time) {
        errors.push('Start Time cannot be after the End Time.');
    }

    // Check if the selected date has already passed
    if (timestamp < currentDate) {
        errors.push('The chosen date has already passed.');
    }

    return errors; // Return array of error messages
}

//fuction to update tasks
async function editTask(req, res) {
    try {
        const id = req.params.id;
        const {
            name,
            description,
            category,
            start_time,
            end_time,
            timestamp
        } = req.body;

        // Check if all required fields are present
        if (!id || !name || !description || !category || !start_time || !end_time || !timestamp) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const currentDate = new Date().toISOString().split('T')[0];//getting current date as yy-mm-dd

        // Validate date and time
        const errors = validateDateTime(start_time, end_time, timestamp, currentDate);
        if (errors.length > 0) {
            return res.status(400).json({ message: 'Validation failed', errors });
        }

        // Load data from JSON file into allTasks array
        const allTasks = await readJSON('./utils/tasks.json');

        let modified = false;

        // Iterate through array to find the task and update it
        for (let i = 0; i < allTasks.length; i++) {
            let currentTask = allTasks[i];
            if (currentTask.id == id) {
                //check for duplicate name
                const isDuplicate = allTasks.some(task => task.id !== id && task.name === name);
                if (isDuplicate) {
                    return res.status(400).json({ message: 'Task name should be unique' });
                }

                allTasks[i].name = name;
                allTasks[i].description = description;
                allTasks[i].category = category;
                allTasks[i].start_time = start_time;
                allTasks[i].end_time = end_time;
                allTasks[i].timestamp = timestamp;

                modified = true;
                break;
            }
        }

        if (!modified) {
            // Task with specified ID not found
            return res.status(404).json({ message: 'Task not found with provided ID' });
        } else {
            // Write the updated data back to the JSON file
            await fs.writeFile('./utils/tasks.json', JSON.stringify(allTasks, null, 2), 'utf8');
            return res.status(200).json({ message: 'Task modified successfully' });
        }
    } catch (error) {
        return res.status(500).json({ message: `Unexpected error: ${error.message}` });
    }
}


//function to delete tasks
/*async function deleteTask(req, res) {
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
}*/

module.exports={editTask};