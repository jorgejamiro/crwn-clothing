import { createSelector } from 'reselect';

import { CategoriesState } from './category.reducer';
import { CategoryMap } from './category.types';

import { RootState } from '../store';

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

// using 'createSelector' output selector is executed only if its corresponding input selector
// changed its value (memoization), so it's going to help us from avoid unnecesary re-renders
export const selectCategories = createSelector(
    [selectCategoryReducer], // array of input selectors
    (categoriesSlice) => categoriesSlice.categories // array of output selectors
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap => 
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);

