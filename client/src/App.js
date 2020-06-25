import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import NavBar from './components/layout/NavBar'
import Home from './components/home/Home'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import store from './store'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import CreateStaff from './components/staff-form/CreateStaff'
import PrivateRoute from './components/routing/PrivateRoute'
import PermissionPage from './components/routing/PermissionPage'
import PermissionRoute from './components/routing/PermissionRoute'
import EditStaff from './components/staff-form/EditStaff'
import ChangeCredentials from './components/staff-form/ChangeCredentials'
import Course from './components/course/Course'
import AssignCourse from './components/staff-form/AssignCourse'
import Profile from './components/profile/Profile'
import AddEducation from './components/profile-form/AddEducation'
import AddExperience from './components/profile-form/AddExperience'
import CreateCourse from './components/course-form/CreateCourse'
import EditCourse from './components/course-form/EditCourse'
import Topic from './components/topic/Topic'
import CreateTopic from './components/topic-form/CreateTopic'
import EditTopic from './components/topic-form/EditTopic'
import AssignTopic from './components/staff-form/AssignTopic'
import Category from './components/category/Category'
import CreateCategory from './components/category-form/CreateCategory'
import EditCategory from './components/category-form/EditCategory'

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser())
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <NavBar />

                <div className='fixed-top alert-position'>
                    <Alert />
                </div>

                <section className='container'>
                    <Switch>
                        <Route exact path='/login' component={Login} />

                        <PrivateRoute
                            exact
                            path='/403error'
                            component={PermissionPage}
                        />
                        <PrivateRoute exact path='/' component={Home} />
                        <PermissionRoute
                            exact
                            path='/profile/:id'
                            component={Profile}
                            permissions={['admin', 'training-staff', 'trainer', 'trainee']}
                        />
                        <PermissionRoute
                            exact
                            path='/profile/:id/edit'
                            component={EditStaff}
                            permissions={['training-staff', 'trainee', 'trainer']}
                        />
                        <PermissionRoute
                            exact
                            path='/course/create'
                            component={CreateCourse}
                            permissions={['training-staff']}
                        />
                        <PermissionRoute
                            exact
                            path='/topic/create'
                            component={CreateTopic}
                            permissions={['training-staff']}
                        />
                        <PermissionRoute
                            exact
                            path='/category/create'
                            component={CreateCategory}
                            permissions={['training-staff']}
                        />
                        <PermissionRoute
                            exact
                            path='/course/:id/edit'
                            component={EditCourse}
                            permissions={['training-staff']}
                        />
                        <PermissionRoute
                            exact
                            path='/topic/:id/edit'
                            component={EditTopic}
                            permissions={['training-staff']}
                        />
                        <PermissionRoute
                            exact
                            path='/category/:id/edit'
                            component={EditCategory}
                            permissions={['training-staff']}
                        />
                        <PrivateRoute exact path='/profile/:id/education' component={AddEducation} />
                        <PrivateRoute exact path='/profile/:id/experience' component={AddExperience} />
                        <PermissionRoute
                            exact
                            path='/profile/:id/change-credentials'
                            component={ChangeCredentials}
                            permissions={['admin', 'training-staff']}
                        />
                        <PermissionRoute
                            exact
                            path='/staff/profile'
                            component={CreateStaff}
                            permissions={['admin', 'training-staff']}
                        />
                        <PermissionRoute
                            exact
                            path='/course'
                            component={Course}
                            permissions={['training-staff']}
                        />
                        <PermissionRoute
                            exact
                            path='/topic'
                            component={Topic}
                            permissions={['training-staff']}
                        />
                        <PermissionRoute
                            exact
                            path='/category'
                            component={Category}
                            permissions={['training-staff']}
                        />
                        <PermissionRoute
                            exact
                            path='/staff/:id/course'
                            component={AssignCourse}
                            permissions={['training-staff']}
                        />
                        <PermissionRoute
                            exact
                            path='/staff/:id/topic'
                            component={AssignTopic}
                            permissions={['training-staff']}
                        />
                    </Switch>
                </section>
            </Router>
        </Provider>
    )
}

export default App
