const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: { type: String, required: true},
    phoneNumber: { type: Number, required: true},
    nic: { type: String, required: true},
    address: {type: String, required: true},
    city: { type: String, required: true},
    department: { type: String, required: true},  

}, {
    timestamps: true,
});



const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;