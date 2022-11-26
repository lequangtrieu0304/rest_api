
const express = require('express');
const router = express.Router();
const Employees = require('../../model/employess');

router.get('/', async (req, res) => {
    try{
        const employees = await Employees.find({})
        res.json(employees);
    }
    catch(err){
        console.log(err);
    }
})

router.post('/', async (req, res) => {
    const {firstname, lastname, age} = req.body;
    try{
        const employee = await Employees.create({
            firstname: firstname,
            lastname: lastname,
            age: age,
        })

        res.json(employee);
    }
    catch(err){
        console.log(err);
    }
})

router.put('/:id', async (req, res) => {
    const {firstname, lastname, age} = req.body;
    try{
        const employee = await Employees.findById(req.params.id);
        if(!employee){
            return res.status(404).json({message: 'Not found employee'})
        }
        else {
            employee.firstname = firstname || employee.firstname;
            employee.lastname = lastname || employee.lastname;
            employee.age = age || employee.age;
        }

        const updateEmployee = await employee.save();
        res.json({message: 'cap nhat thanh cong', updateEmployee})
    }
    catch(err){
        console.log(err);
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const employee = await Employees.findById(req.params.id);
        const deleteEmployee = await employee.remove();
        res.json({message: 'xoa thanh cong', deleteEmployee});
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;