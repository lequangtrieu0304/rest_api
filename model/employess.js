const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    age: {
        type: Number,
    }
});

const employeeModel = mongoose.model('Employees', employeeSchema);

module.exports = employeeModel;