import React, { Component } from 'react';
import axios from 'axios';


export default class EditEmployee extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeNic = this.onChangeNic.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        name: '',
        phoneNumber: '',
        nic: '',
        address: '',
        city: '',
        department: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/employees/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          phoneNumber: response.data.phoneNumber,
          nic: response.data.nic,
          address: response.data.address,
          city: response.data.city,
          department: response.data.department,       
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangePhoneNumber(e) {
    const input = e.target.value;
    const phoneNumber = input.replace(/\D/g, ""); // remove non-digits from input

    if (phoneNumber.length <= 9) { // validate the length
      this.setState({ phoneNumber });
    }
  }

  onChangeNic(e) {
    this.setState({
      nic: e.target.value
    })
  }

  onChangeAddress(e) {
    this.setState({
        address: e.target.value
    })
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value
    })
  }

  onChangeDepartment(e) {
    this.setState({
        department: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const employee = {
        name: this.state.name,
        phoneNumber: this.state.phoneNumber,
        nic: this.state.nic,
        address: this.state.address,
        city: this.state.city,
        department: this.state.department
    }

    console.log(employee);

    axios.post('http://localhost:5000/employees/update/' + this.props.match.params.id, employee)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Details</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group">
          <label>Phone Number: </label>
          <input 
              type="text"
              className="form-control"
              value={this.state.phoneNumber}
              onChange={this.onChangePhoneNumber}
              pattern="[0-9]{9}"
              placeholder='702218188'
              title="Please enter a valid Phone Number in the format 702218188"
              required
              />
              
        </div>
        <div className="form-group">
          <label>Nic: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.nic}
              onChange={this.onChangeNic}
              pattern="[0-9]{12}"
              title="Please enter a valid NIC in the format 200122202896"
              required
              />
        </div>

        <div className="form-group">
          <label>Address: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
              required
              />
        </div>

        <div className="form-group">
          <label>City: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.city}
              onChange={this.onChangeCity}
              required
              />
        </div>

        <div className="form-group">
            <label>Department:</label>
            <select
              className="form-control"
              value={this.state.department}
              onChange={this.onChangeDepartment}
              required
            >
              <option value="">-- Select Department --</option>
              <option value="Company">Company</option>
              <option value="Home">Home</option>
              <option value="Appartments">Appartments</option>
              <option value="Furniture">Furniture</option>
              <option value="Gardening">Gardening</option>
              <option value="Glass Cleaning">Glass Cleaning</option>
              <option value="Flows">Flows</option>
            </select>
          </div>


        <div className="form-group">
          <input type="submit" value="Edit Details" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}