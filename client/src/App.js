import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import store from './store'
import Login from './components/auth/Login'

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

                <Route exact path='/' component={Landing} />
                <section className='container'>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                    </Switch>
                </section>
            </Router>
        </Provider>
    )
}

export default App
