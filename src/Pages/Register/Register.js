import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Register = () => {

    const [accept, setAccept] = useState(false)
    const { registerWithEmailAndPassword, userEmailVerify, userProfileUpdate, ToastContainer, toast } = useContext(AuthContext)

    const navigate = useNavigate()

    const handlerUserRegistration = (event) => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoUrl = form.photoUrl.value




        const handleEmailVerification = () => {
            userEmailVerify()
                .then(() => {
                    toast("Please verify your email", { position: "top-center" })
                }).catch(error => {
                    console.error(error)
                })
        }

        registerWithEmailAndPassword(email, password)
            .then(response => {
                userProfileUpdate({ displayName: name, photoURL: photoUrl })
                handleEmailVerification()
                navigate('/login')
            }).catch(error => {
                error.message === "Firebase: Error (auth/email-already-in-use)." && toast("User already exisit", { position: "top-center" })
                form.reset()
            })

    }
    const isAccept = (event) => {
        setAccept(event.target.checked)
    }
    return (
        <Form onSubmit={handlerUserRegistration} className='shadow p-4 rounded mb-4'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" name="name" placeholder="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Photo url</Form.Label>
                <Form.Control type="url" name="photoUrl" placeholder="photo url" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" />
            </Form.Group>
            <div>
                <Form.Check className='d-inline-block' onClick={isAccept} type="checkbox" label="Accept " /> <Link to='/trams-and-condition'>Trams and condition</Link>
                <p>Already have an account?<Link to='/login'> Login</Link></p>
            </div>
            <Button className={`mt-3`} variant="primary" type="submit"
                disabled={!accept}
            >
                Register
            </Button>
            <ToastContainer />
        </Form>
    );
};

export default Register;