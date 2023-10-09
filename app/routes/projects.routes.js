const express= require('express');
const { createProject, getProjects, updateProject, deleteProjects, getProjectById } = require('../controllers/projects.controller');
const verifyAuthorization = require('../authentication/verifyAuthorization');
const router= express.Router();

router.get("/projects",getProjects);

router.get("/projects/:id",verifyAuthorization, getProjectById);

router.post("/projects/create", verifyAuthorization, createProject);

router.put("/projects/update/:id", verifyAuthorization, updateProject);

router.delete("/projects/delete/:id", verifyAuthorization, deleteProjects);


module.exports= router;