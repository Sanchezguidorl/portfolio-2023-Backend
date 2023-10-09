const mongoose= require('mongoose');

const projectsSchema= new mongoose.Schema({
nombre:{
    type: String, required: true
},
imagen:{
    type: String, required: true
},
descripcion:{
    type: String, required: true
},
url:{
    type: String, required: true
}
}, {
    versionKey: false
  });

const projectsModel= mongoose.model('projects',projectsSchema);

module.exports= projectsModel;