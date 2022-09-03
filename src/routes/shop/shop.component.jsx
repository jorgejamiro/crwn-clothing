// in order to leverage nested routes for Shop
import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { fetchCategoriesStart } from '../../store/categories/category.action';

import './shop.style.scss'

const Shop = () => {    
    const dispatch = useDispatch();

    useEffect(() => {
        // we need to use a wrapping async function inside our useEffect 
        // (it's implicitly defined on 'fetchCategoriesAsync')
        dispatch(fetchCategoriesStart());
    }, []);


    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
