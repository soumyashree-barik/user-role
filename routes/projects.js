const express = require('express');
const router = express.Router();
const {projects }=require('../data');
const {authUser} = require('../basicAuth')
const {canViewProject,scopedProjects,canDeleteProject,canUpdateProject} = require('../permissions/project')

router.get('/',authUser,(req,res)=>{
    res.json(scopedProjects(req.user,projects) );
})

router.get('/:projectId',setProject,authUser,authGetProject,(req,res)=>{
    res.json(req.project)
})

//delete route

router.delete('/:projectId',setProject,authUser,authDeleteProject,(req,res)=>{
    res.send("project DELETED !!")
})

 //update route

 router.put('/:projectId',setProject,authUser,authUpdateProject,(req,res)=>{
    res.send("project UPDATED !!")
})


function setProject(req,res,next){
    const projectId = parseInt(req.params.projectId)
    req.project = projects.find(project => project.id === projectId)

    if (req.project === null){
        res.status(404)
        return res.send('project not found')
    }
    next()
}

function authGetProject(req,res,next){
    if(!canViewProject(req.user,req.project)){
        res.status(401)
        return res.send("Permission denied")
    }
    next()
}

//delete function
function authDeleteProject(req,res,next){
    if(!canDeleteProject(req.user,req.project)){
        res.status(401)
        return res.send("Permission denied")
    }
    next()
}
//update function
function authUpdateProject(req,res,next){
    if(!canUpdateProject(req.user,req.project)){
        res.status(401)
        return res.send("Permission denied")
    }
    next()
}

module.exports = router