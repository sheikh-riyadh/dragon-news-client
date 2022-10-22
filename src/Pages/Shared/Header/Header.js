import React, { useContext } from 'react';
import { Button, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import LeftSideNav from '../LeftSideNav/LeftSideNav';


const Header = () => {
    const { user, logOut, ToastContainer, toast } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast("Log out succesfully", { position: "top-center" })
                navigate('/')
            }
            )
            .then(error => {
                console.error(error)
            })
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className='mb-5'>
            <Container>
                <Navbar.Brand><Link to='/'>Drogon news</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    {
                        user?.uid ? <><Link to='/login'>
                            <Button onClick={handleLogOut} variant="light">Logout</Button>
                        </Link></>
                            : <>
                                <Link to='/register'>
                                    <Button variant="light">Register</Button>
                                </Link>
                                <Link to='/login'>
                                    <Button variant="light">Login</Button>
                                </Link>
                            </>
                    }
                    <Nav>
                        <Nav.Link className='mt-2'>{user?.displayName}</Nav.Link>
                        <Link to='/user-profile'>
                            {user?.photoURL ? <Image style={{ with: '40px', height: '40px', borderRadius: "50%" }} src={user?.photoURL}></Image>
                                :
                                <FaUserCircle></FaUserCircle>
                            }
                        </Link>
                    </Nav>
                    <div className="d-lg-none">
                        <LeftSideNav></LeftSideNav>
                    </div>
                </Navbar.Collapse>
            </Container>
            <ToastContainer />
        </Navbar>
    );
};

export default Header;