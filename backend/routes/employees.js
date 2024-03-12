const router = require('express').Router();
let Employee = require('../models/model');

router.route('/').get((req, res) => {
  Employee.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const phoneNumber = Number(req.body.phoneNumber);
  const nic = req.body.nic;
  const address = req.body.address;
  const city = req.body.city;
  const department = req.body.department;

  const newEmployee = new Employee({
    name,
    phoneNumber,
    nic,
    address,
    city,
    department
  });

  newEmployee.save()
  .then(() => res.json('Employee added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Employee.findById(req.params.id)
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json('Employee deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Employee.findById(req.params.id)
    .then(employee => {
        employee.name = req.body.name;
        employee.phoneNumber = Number(req.body.phoneNumber);
        employee.nic = req.body.nic;        
        employee.address = req.body.address;
        employee.city = req.body.city;
        employee.department = req.body.department;


      employee.save()
        .then(() => res.json('Employee updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;


