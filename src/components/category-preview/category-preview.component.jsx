import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ProductCard from '../product-card/product-card.component';

import './category-preview.style.scss';

const CategoryPreview = ({ title, products }) => {
    const { t } = useTranslation();

    return (
        <div className='category-preview-container'>
            <h2>
                <Link className='title' to={title}>{t(title).toUpperCase()}</Link>
            </h2>
            <div className='preview'>
            {
                // in order to show only the first 4 items
                products.filter((_, idx) => idx < 4 )
                .map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
            </div>
        </div>
    );
};

export default CategoryPreview;