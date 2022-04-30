
const express = require('express');
const {getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee} = require("../../controllers/employeeController");
const router = express.Router();
const {ROLES_LIST} = require('../../configs/roles_list');
const {rolesVerifyHandler} = require("../../middlewares/rolesVerifyHandler");



router
	.route('/')
	.get(getAllEmployees)
	.post(rolesVerifyHandler(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
	.put(rolesVerifyHandler(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
	.delete(rolesVerifyHandler(ROLES_LIST.Admin), deleteEmployee);

router
	.route('/:id')
	.get(getEmployee)

module.exports = router;
