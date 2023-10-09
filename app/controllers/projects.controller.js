const projectsModel = require("../models/projects.model");

const getProjects= async(req,res)=>{
try {
    const projects= await projectsModel.find();
    res.json({success: true, data:projects});
} catch (error) {
    res.json({success:false, error: error});
}
};

const getProjectById= async(req,res)=>{
    const id=req.params.id;
try {
    const project= await projectsModel.findOne({_id:id});
if(project){
  return  res.json({success: true, data:project});
}else{
  return  res.json({success: false, data:null});
}
} catch (error) {
    res.json({success:false, error: error});
}
};

const createProject= async(req,res)=>{
    const {imagen, nombre, url, descripcion}= req.body;
    const inputsEmpty= Object.entries(req.body).filter(input=> input[1]==='').map(input=>input[0]);

    if(inputsEmpty.length>0){
      return  res.json({success: false, error: "Todos los campos son obligatorios: "+inputsEmpty});
    }
try {
    const newProject= new projectsModel({
        imagen:imagen, nombre: nombre, url: url, descripcion: descripcion
    });
    const saveProject= await newProject.save();

    res.json({success:true, data: saveProject});
} catch (error) {
    res.json({success:false, error: error});
}
};

const updateProject= async(req,res)=>{
    const {imagen, nombre, url, descripcion}= req.body;
    const inputsEmpty= Object.entries(req.body).filter(input=> input[1]==='').map(input=>input[0]);
    const id= req.params.id;
    if(inputsEmpty.length>0){
      return  res.json({success: false, error: "Todos los campos son obligatorios: "+inputsEmpty});
    }
try {
    const updatedProject= await projectsModel.findByIdAndUpdate({_id: id},{
       _id:id ,imagen:imagen, nombre: nombre, url: url, descripcion: descripcion
    }, {new: true});

    if(updatedProject){
        res.json({success:true, data: updatedProject});
    }else{
        res.json({success:false, data:null})
    }
} catch (error) {
    res.json({success:false, error: error});
}
};

const deleteProjects= async(req, res)=>{
   const id= req.params.id;

   try {
    const deletedProject= await projectsModel.findByIdAndDelete({_id:id});

    if(deletedProject){
        res.json({success: true, data: deletedProject});
    }
   } catch (error) {
    res.json({success:false, error: error});
   }
};


module.exports= {getProjects, createProject, updateProject, deleteProjects, getProjectById};