import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

// using 'createSelector' output selector is executed only if its corresponding input selector
// changed its value (memoization), so it's going to help us from avoid unnecesary re-renders
export const selectCategories = createSelector(
    [selectCategoryReducer], // array of input selectors
    (categoriesSlice) => categoriesSlice.categories // array of output selectors
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => 
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);

