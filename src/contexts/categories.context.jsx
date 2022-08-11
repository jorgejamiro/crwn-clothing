import { createContext, useState, useEffect } from "react";

//import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

//import SHOP_DATA from '../shop-data.js';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext({
    catetoriesMap: {},
});

export const CategoriesProvider = ( {children} ) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    /* we did so, because we wanted to save data only once into Firebase db
    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA);
    }, []);
    */

    useEffect(() => {
        // because we need to use an async function inside our useEffect, it's needed to be wrapped
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        };

        getCategoriesMap();
    }, []);
    
    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    );
}