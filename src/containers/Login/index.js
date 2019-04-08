import React from 'react'
import {Link} from 'react-router-dom'

import {LoginForm} from '../../components'

const Login = ({history}) => (
    <div>
        <Link to="/register">Register</Link>
        <LoginForm history={history}/>
    </div>
);


export default Login