import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';

import './category.style.scss';

const category = () => {
    const { category } = useParams(); // in order to retrive param from the route
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);
    
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])
    
    return (
        <Fragment>
            <h2 className='category-title'>{category.toLocaleUpperCase()}</h2>
            <div className='category-container'>
            {
                products && // in order to safeguard, due to async fetching of the products
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
            </div>
        </Fragment>
    );
};

export default category;