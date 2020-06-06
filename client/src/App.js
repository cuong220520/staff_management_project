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
import AdminTrainerRoute from './components/routing/AdminTrainerRoute'
import EditStaff from './components/staff-form/EditStaff'

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

                        <PrivateRoute exact path='/403error' component={PermissionPage} />
                        <PrivateRoute exact path='/' component={Home} />
                        <PrivateRoute exact path='/profile/:id' component={EditStaff} />

                        <AdminTrainerRoute exact path='/staff/profile' component={CreateStaff} />
                    </Switch>
                </section>
            </Router>
        </Provider>
    )
}

export default App
