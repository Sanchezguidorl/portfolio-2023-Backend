const express = require("express");
const {
  getStudies,
  createStudie,
  updateStudy,
  deleteStudie,
  getStudyById,
} = require("../controllers/studies.controller");
const verifyAuthorization = require("../authentication/verifyAuthorization");
const router = express.Router();

router.get("/studies", getStudies);

router.post("/studies/create", verifyAuthorization, createStudie);

router.post("/studies/update/:id", verifyAuthorization, updateStudy);

router.delete("/studies/delete/:id", verifyAuthorization, deleteStudie);

router.get("/studies/:id", verifyAuthorization, getStudyById);

module.exports = router;
