const mongoose =  require('mongoose');
// const now = new Date(Date.now());
// const formattedDate2 = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
// console.log(formattedDate2); // Output: "28/10/2024"

const taskNameSchema = new mongoose.Schema({
    taskn: { type: String, required: true },
    checked: { type: Boolean },
    id: { type: Number },
  });
  
const taskSchema=new mongoose.Schema({
    taskname:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    createddate:{
        type:Date,
        default:Date.now()
    },
    duedate:{
        type:Date

    },
    tasktype:{
      type:String,
      default:"Todo"
    },
    taskdata:{
        type:[taskNameSchema],
        required:true 
    },
    creator_name:{
        type:String,
    },
    assignee_name:{
        type:String,
    },
    creator: [{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }]

})

const Task = mongoose.model("task",taskSchema)
module.exports={
    Task
}