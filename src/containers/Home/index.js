import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import {AuthContext} from "../../AuthContext";

class Home extends Component {
    static contextType = AuthContext;

    render() {
        const {
            authenticated,
            logout,
        } = this.context;

        if(!authenticated){
            return (
                <Redirect to="/" />
            )
        }

        return (
            <div className="not-found">
                <h1>
                    Welcome
                </h1>
                <button onClick={logout}>Log out</button>
            </div>
        );
    }
}

export default Home