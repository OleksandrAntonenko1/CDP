import React, {Component} from 'react'
import {
    Route,
    Switch,
    NavLink,
} from 'react-router-dom'

import {AuthContext} from '../../AuthContext'
import {
    Home,
    NotFound,
    Login,
    Register,
} from '../'

import './styles.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            login: this.login,
            logout: this.logout,
        }

    }

    login = (email, password) => {
        this.setState({authenticated: true})
    };

    logout = () => {
        this.setState({authenticated: false})
    };

    render() {
        return (
            <AuthContext.Provider value={this.state}>
                <div className="app">
                    <nav>
                        <NavLink to="/home">home</NavLink>
                        <NavLink to="/register">register</NavLink>
                        <NavLink to="/">login</NavLink>
                    </nav>
                    <div className="container">
                        <Switch>
                            <Route
                                exact path="/"
                                component={Login}
                            />
                            <Route
                                exact path="/home"
                                component={Home}
                            />
                            <Route
                                exact path="/register"
                                component={Register}
                            />
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </div>
            </AuthContext.Provider>
        );
    }
}

export default App