import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { CategoryContainer, Title } from './category.style';

type CategoryRouteParams = {
    category: string;
}

const category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams; // in order to retrive param from the route
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);
    
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])
    
    return (
        <Fragment>
            <Title>{category.toLocaleUpperCase()}</Title>
            {
                isLoading ? (
                    <Spinner />
                ) : ( 
                    <CategoryContainer>
                    {
                        products && // in order to safeguard, due to async fetching of the products
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    }
                    </CategoryContainer>
                )
            }
        </Fragment>
    );
};

export default category;