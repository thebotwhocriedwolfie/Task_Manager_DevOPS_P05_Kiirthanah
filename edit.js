//fuction to update tasks
async function editTask(req,res) {
    try{
        const id= req.params.id;
        const name= req.body.name;
        const description= req.body.description;
        const start_time= req.body.start_time;
        const end_time= req.body.end_time;
        const timestamp= req.body.timestamp;

        const allTasks= await readJSON('utils/resources.json');
        var modified= false;

        for( var i=0; i< allTasks.length; i++){
            var currentTask=allTasks[i];
            if(currentTask.id==id){
                allTasks[i].name=name;
                allTasks[i].description=description;
                allTasks[i].start_time=start_time;
                allTasks[i].end_time=end_time;
                allTasks[i].timestamp=timestamp;

                modified=true;
            }
        } 
        if(modified){
            await FileSystem.writeFile('utils/tasks.json',JSON,stringyfy(allTasks),'utf8');
            return res.status(201).json({message:'Task modified successfully' });
        }else{
            return res.status(500).json({message:'Error occurred, unable to modify!'});
        } 
    }catch(error){
        return res.status(500).json({message:error.message});
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
            await fs.writeFile('utils/tasks.json', JSON.stringify(allTasks),'utf8');
            return res.status(201).json({message:'Task deleted successfully'});
        }else{
            return res.status(500).json({message:'Error occurred, unable to delete!'});
        }
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

module.exports={
    editTask,deleteTask
};