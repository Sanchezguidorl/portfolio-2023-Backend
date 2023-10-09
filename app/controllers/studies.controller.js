const { response } = require("express");
const studiesModel = require("../models/studies.model");

const getStudies = async (req, res) => {
  try {
    const allStudies = await studiesModel.find();
    res.json({ success: true, data: allStudies });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

const getStudyById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.json({ success: false, error: "Id no proporcionado" });
  }
  try {
    const study = await studiesModel.findOne({ _id: id });
    if (!study) {
      return res.json({ success: false, data: null });
    } else {
      res.json({ success: true, data: study });
    }
  } catch (error) {
    console.log(id);
    res.json({ error: error });
  }
};

const createStudie = async (req, res) => {
  const { nombre, institucion, logoInstitucion, estado } = req.body;

  const inputsEmpty = Object.entries(req.body)
    .filter((input) => input[1] === "")
    .map((input) => input[0]);

  if (inputsEmpty.length > 0) {
    return res.json({
      success: false,
      error: "Ningun campo debe estar vacío. Campos vacíos: " + inputsEmpty,
    });
  }

  try {
    const newStudy = new studiesModel({
      nombre: nombre,
      institucion: institucion,
      logoInstitucion: logoInstitucion,
      estado: estado,
    });
    const saveStudy = await newStudy.save();

    if (saveStudy) {
      res.json({ success: true, data: newStudy });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error,
    });
  }
};

const updateStudy = async (req, res) => {
  const { nombre, institucion, logoInstitucion, estado } = req.body;
  const id = req.params.id;
  console.log(req.body);
  const inputsEmpty = Object.entries(req.body)
    .filter((input) => input[1] === "")
    .map((input) => input[0]);

  if (inputsEmpty.length > 0) {
    return res.json({
      success: false,
      error: "Ningun campo debe estar vacío. Campos vacíos: " + inputsEmpty,
    });
  }

  try {
    const saveUpdate = await studiesModel.findOneAndUpdate(
      { _id: id },
      {
        nombre: nombre,
        institucion: institucion,
        logoInstitucion: logoInstitucion,
        estado: estado,
      },
      { new: true }
    );

    if (saveUpdate) {
      res.json({ success: true, data: saveUpdate });
    }
  } catch (error) {
    res.json({ succsess: false, error: error });
  }
};


const deleteStudie = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deletedStudy = await studiesModel.findOneAndDelete({ _id: id });

    if (deletedStudy) {
      console.log("eleiminado");
      res.json({ success: true, data: deletedStudy });
    } else {
      res.json({
        success: false,
        error: "No se encontró el estudio con ID " + id,
      });
    }
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

module.exports = {
  getStudies,
  createStudie,
  updateStudy,
  deleteStudie,
  getStudyById,
};
