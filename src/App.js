import React, { Component }  from 'react';
import Navbar from "./layout/Navbar";
import AddUser from "./forms/AddUser";
import UpdateUser from "./forms/UpdateUser";
import Users from "./components/Users";
import Test from "./components/Test";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Contribute from './pages/Contribute'
import './App.css';

const Error = () => {
  return ( <h3>Error Page</h3>)
}


class App extends Component {
// <Route exact path = "/" component = {Home}/>
// <Route exact path = "/about" render = { () => { return <h3>About Page</h3>}}/>
 
  
  render()  
  {

  return (
    <Router>
      <div className="container">
        <Navbar title = "User-app"/>
        <hr/>
        <Switch>
          <Route exact path = "/" component = {Users} />
          <Route exact path = "/add" component = {AddUser} />
          <Route exact path = "/git" component = {Contribute} />
          <Route exact path = "/edit/:id" component = {UpdateUser} />
          <Route exact path = "/test" component = {Test} />
          <Route component = {Error}/>
        </Switch>
      </div>
    </Router>
  );
}
}

export default App;

