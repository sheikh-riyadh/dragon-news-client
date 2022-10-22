import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import { FaShareAlt, FaRegBookmark, FaStar, FaEye } from 'react-icons/fa';

const NewsSummaryCart = ({ category }) => {

    const { _id, title, details, image_url, total_view, author, rating } = category
    return (
        <Card className="mb-4 shadow">
            <Card.Header className='d-flex justify-content-between align-items-center'>
                <div className='d-flex'>
                    <Image
                        src={author?.img} alt="AuthorImage"
                        style={{ width: '50px' }}
                        roundedCircle
                    >
                    </Image>
                    <div className='mx-3'>
                        <span className='d-block'>{author?.name ? author.name : "data not found"}</span>
                        <span className='d-block'>{author?.published_date ? author.published_date : "Data not found"}</span>
                    </div>
                </div>
                <div>
                    <FaShareAlt className='mx-2'></FaShareAlt>
                    <FaRegBookmark className='mx-2'></FaRegBookmark>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Img variant="top" src={image_url} alt="NewsImage" />
                <Card.Text>
                    {
                        details.length > 250 ?
                            <>{details.slice(0, 250) + '...'}<Link to={`/news/${_id}`}>Read more</Link></>
                            :
                            details
                    }
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between align-items-center py-3">
                <div>
                    <FaStar className='text-warning'></FaStar> <span><strong>{rating?.number}</strong></span>
                </div>
                <div>
                    <FaEye></FaEye> <span><strong>{total_view} views</strong></span>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default NewsSummaryCart;