import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import EditProject from './components/projects/EditProject';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import UsersList from './components/users/UsersList';
import UserProfile from './components/users/UserProfile';
import EditUser from './components/users/usercp/EditUser';
import RolesList from './components/users/roles/RolesList';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/page/:page" component={Dashboard} />
            <Route exact path="/project/:id" component={ProjectDetails} />
            <Route path="/project/edit/:id" component={EditProject} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} />
            <Route path='/users' component={UsersList} />
            <Route path='/user_roles' component={RolesList} />
            <Route exact path="/user/:id" component={UserProfile} />
            <Route exact path="/user/edit/:id" component={EditUser} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
