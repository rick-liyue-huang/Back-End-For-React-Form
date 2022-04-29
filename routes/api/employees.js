
const express = require('express');
const {getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee} = require("../../controllers/employeeController");
const router = express.Router();



router
	.route('/')
	.get(getAllEmployees)
	.post(createNewEmployee)
	.put(updateEmployee)
	.delete(deleteEmployee);

router
	.route('/:id')
	.get(getEmployee)

module.exports = router;
