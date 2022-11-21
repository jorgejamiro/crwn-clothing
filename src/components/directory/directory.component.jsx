import DirectoryItem from '../directory-item/directory-item.component';
import { useTranslation } from 'react-i18next';

import './directory.style.scss';

const categories = [
    {
      "id": 1,
      "title": {
        "en": "hats",
        "es": "sombreros",
      },
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
      route: 'shop/hats'
    },
    {
      "id": 2,
      "title": {
        "en": "jackets",
        "es": "chaquetas",
      },
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
      route: 'shop/jackets'
    },
    {
      "id": 3,
      "title": {
        "en": "sneakers",
        "es": "zapatillas",
      },
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
      route: 'shop/sneakers'
    },
    {
      "id": 4,
      "title": {
        "en": "women's",
        "es": "mujer",
      },
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
      route: 'shop/womens'
    },
    {
      "id": 5,
      "title": {
        "en": "men's",
        "es": "hombre",
      },
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
      route: 'shop/mens'
    }
];

const Directory = () => {

    return (
        <div className='directory-container'>
            {
            categories.map( (category) => 
                (
                <DirectoryItem key={category.id} category={category} />
                )
            )
            }
        </div>
    );
};

export default Directory;