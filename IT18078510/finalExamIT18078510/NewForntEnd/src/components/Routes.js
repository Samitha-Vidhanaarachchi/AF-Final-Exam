import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import TablesPage from './pages/TablesPage';
import MapsPage from './pages/MapsPage';
import NotFoundPage from './pages/NotFoundPage';
import UserDetails from "./views/UserManagement/UserManage";
import Courses from "./views/CourseManagement/CourseManagement"
import CourseAdd from "./views/CourseManagement/CourseAdd"
import Login from "./views/Login/Login"

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={UserDetails} />
        {/*<Route path='/profile' component={ProfilePage} />*/}
          <Route exact path='/studentManagement' component={UserDetails}/>
          <Route exact path='/lecture' component={Courses}/>
          <Route exact path='/lectureManagement' component={CourseAdd}/>
          <Route exact path='/logout' component={Login}/>
        <Route path='/404' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
