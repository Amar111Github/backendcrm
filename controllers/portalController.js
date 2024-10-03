const Joi = require('joi');
const { EducationValidation } = require('../validations/educationValidation');
const { Education } = require('../models/educationModel');
const { Employee } = require('../models/employeeModel');
const { Portal } = require('../models/portalModel');
const { PortalValidation } = require('../validations/portalValidation');

const getAllPortal = async (req, res) => {
    Portal.find().populate({ path: "projects" }).exec(function (err, portalData) {
        if (err) {
          res.send("err");
          console.log(err);
        }
        res.send(portalData);
      });
  }
  
  // create a city 
  const createPortal = async (req, res) => {
    Joi.validate(req.body, PortalValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newPortal;
          newPortal = {
            PortalName: req.body.PortalName,
            Status: req.body.Status
          };
    
          Portal.create(newPortal, function (err, portalData) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              res.send(portalData);
            
            }
          });
   
        }
      });
  }
  
  // find and update the city 
  const updatePortal = async (req, res) => {
    Joi.validate(req.body, PortalValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let updatePortal;
          updatePortal = {
            PortalName: req.body.PortalName,
            Status: req.body.Status
          };
          Portal.findByIdAndUpdate(req.body._id, updatePortal, function (
            err,
            Portal
          ) {
            if (err) {
              res.send("error");
            } else {
              res.send(updatePortal);
            }
          });
        }

      });
  }
  
  // find and delete the city 
  const deletePortal = async (req, res) => {
    try {
      const portal = await Portal.findByIdAndRemove(req.params.id);
      if (!portal) {
        return res.status(404).send({ message: "Portal not found" });
      }
      
      await Project.deleteMany({ portals: portal.id });
      
      res.status(200).send({ message: "Portal and associated projects deleted successfully", portal });
    } catch (err) {
      res.status(500).send({ message: "An error occurred", error: err.message });
    }
  };
  
  
  
  module.exports = {
    getAllPortal,
    createPortal,
    updatePortal,
    deletePortal
  }