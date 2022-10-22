import React from 'react';
import { useLoaderData } from 'react-router-dom';
import NewsSummaryCart from '../../Shared/NewsSummaryCart/NewsSummaryCart';

const Category = () => {
    const categoryData = useLoaderData()
    console.log(categoryData)
    return (
        <div>
            {
                categoryData.length === 0 ? <h3 className='text-center'>No data found</h3> : <h3>Available news {categoryData.length}</h3>
            }
            {
                categoryData.map(category => <NewsSummaryCart
                    key={category._id}
                    category={category}

                ></NewsSummaryCart>)
            }
        </div>
    );
};

export default Category;