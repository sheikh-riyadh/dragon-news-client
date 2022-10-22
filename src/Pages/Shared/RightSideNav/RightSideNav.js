import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import ListGroup from 'react-bootstrap/ListGroup';
import BrandCarousel from '../BrandCarousel/BrandCarousel';
import { AuthContext } from '../../../contexts/AuthProvider';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const RightSideNav = () => {

    const { signInWithGoole, signInWithGitHub, setLoading } = useContext(AuthContext)
    /* Created google auth provider */
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    /* Create user with google account */
    const handleSignInWithGoole = () => {
        signInWithGoole(googleProvider)
            .then(response => {
                const user = response.user;
                console.log(user)
                navigate(from, { replace: true })
            }).catch(error => {
                console.error(error)
            }).finally(() => {
                setLoading(false)
            })
    }

    const handleSignWithGithub = () => {
        signInWithGitHub(githubProvider)
            .then(response => {
                const user = response.user;
                console.log(user)
                navigate(from, { replace: true })
            }).catch(error => {
                console.error(error)
            }).finally(() => {
                setLoading(false)
            })
    }



    return (
        <div>
            <ButtonGroup vertical>
                <Button onClick={handleSignInWithGoole} size="lg" className='mb-2' variant="outline-primary"><FaGoogle /> Continue with google</Button>
                <Button onClick={handleSignWithGithub} size="lg" className='mb-2' variant="outline-dark"> <FaGithub /> Continue with github</Button>
            </ButtonGroup>
            <div className='mt-3'>
                <h5>Follow on </h5>
                <ListGroup>
                    <ListGroup.Item className='mb-3'><FaFacebook /> Facebook</ListGroup.Item>
                    <ListGroup.Item className='mb-3'><FaTwitter /> Twitter</ListGroup.Item>
                    <ListGroup.Item className='mb-3'><FaYoutube /> YouTube</ListGroup.Item>
                    <ListGroup.Item className='mb-3'><FaInstagram /> Instagram</ListGroup.Item>
                    <ListGroup.Item className='mb-2'><FaWhatsapp /> Whats app</ListGroup.Item>
                </ListGroup>
            </div>
            <div>
                <BrandCarousel></BrandCarousel>
            </div>
        </div>
    );
};

export default RightSideNav;