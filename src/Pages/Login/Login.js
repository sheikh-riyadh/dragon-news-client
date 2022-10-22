import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {

    const { loginWithEmailAndPassword, toast, ToastContainer, setLoading } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";


    const handleLogInWithEmailAndPassword = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value
        const password = form.password.value;


        loginWithEmailAndPassword(email, password)
            .then(response => {
                const user = response?.user;
                console.log(user)
                form.reset()
                if (user?.emailVerified) {
                    toast("Login succesful", { position: "top-center" })
                    navigate(from, { replace: true });
                } else {
                    toast.warn("Please verify your email", { position: "top-center" })
                }
            }).catch(error => {
                console.error(error)
                form.reset()
            }).finally(() => {
                setLoading(false)
            })
    }
    return (
        <Form onSubmit={handleLogInWithEmailAndPassword} className='shadow p-4 rounded'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" />
            </Form.Group>
            <div>
                <span>New here?<Link to='/register'> Register</Link></span>
            </div>
            <Button className='mt-3' variant="primary" type="submit">
                Login
            </Button>
            <ToastContainer />
        </Form>
    );
};

export default Login;