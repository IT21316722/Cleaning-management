import React from 'react';


import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import EmployeeList from "./components/employees-list";
import EditEmployee from "./components/edit-employee";
import CreateEmployee from './components/create-employee';
import ViewEmployee from './components/view-employee';
import qrScanner from './components/QRScanner'
import qrgenerator from './components/Generateqr'
import Nav from './header_footer/Nav';
import Footer from './header_footer/Footer';

function App() {
  return (
    <Router>
      <Nav/>
      <div className = "container"> <br/><br/><br/><br/>
      <Navbar />
      <pdfGenerator />
      
      <Route path="/" exact component={EmployeeList} />
      <Route path="/edit/:id" component={EditEmployee} />
      <Route path="/create" component={CreateEmployee} />
      <Route path="/view/:id" component={ViewEmployee} />
      <Route path="/qrscanner" component={qrScanner} />
      <Route path="/qrgenerator" component={qrgenerator}/>

      <br/>
      
      </div><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </Router>
  );
  
}

export default App;



