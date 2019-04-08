import React, {Component} from 'react'

import {AuthContext} from "../../AuthContext";

class RegisterForm extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
        };
    }

    handleChange = (event) => {
        const {
            target: {
                name,
                value,
            },
        } = event;

        this.setState({[name]: value});
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { login } = this.context;
        const { history } = this.props;
        try{
            const result = await fetch('http://localhost:5000/register', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': 'application/json'
                }
            });
            const { email, password } = result;

            login(email, password);
            history.push('/home')
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const {
            username,
            email,
            password,
        } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="Password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}

export default RegisterForm