const mongoose= require('mongoose');

const studiesSchema= new mongoose.Schema({
institucion:{
    type: String, required: true
},
logoInstitucion:{
    type: String, required: true
},
estado:{
    type: String, required: true
},
nombre:{
    type: String, required: true
}
}, {
    versionKey: false
  });

const studiesModel= mongoose.model('studies',studiesSchema);

module.exports= studiesModel;