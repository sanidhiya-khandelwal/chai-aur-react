import React from 'react'
import UserContext from '../context/UserContext';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { setUser } = React.useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({ username, password })
    }
    return (
        <div>
            <h2>Login</h2>
            <input type="text"
                value={username}
                placeholder='username'
                onChange={(e) => setUsername(e.target.value)}
            />
            {" "}
            <input type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login