import React from 'react';
import { Card } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';

const News = () => {
    const singleNews = useLoaderData()

    const { title, details, image_url } = singleNews

    return (
        <Card>
            <Card.Img variant="top" src={image_url} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {details}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default News;