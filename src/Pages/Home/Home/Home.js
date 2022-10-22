import React from 'react';
import { useLoaderData } from 'react-router-dom';
import NewsSummaryCart from '../../Shared/NewsSummaryCart/NewsSummaryCart';

const Home = () => {

    const news = useLoaderData()
    return (
        <div>
            {
                news.map((category => <NewsSummaryCart key={category._id} category={category}></NewsSummaryCart>))
            }
        </div>
    );
};

export default Home;