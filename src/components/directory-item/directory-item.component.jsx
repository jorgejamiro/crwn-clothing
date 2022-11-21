import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles";

const DirectoryItem = ({category}) => {
    const { title, imageUrl, route } = category;
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const lng = i18n.language;

    const onNavigateHandler = () => navigate(route);
    
    return (
            <DirectoryItemContainer onClick={onNavigateHandler} >
                <BackgroundImage imageUrl={imageUrl} />
                <Body>
                    <h2>{title[lng]}</h2>
                    <p>{t('Shop Now')}</p>
                </Body>
            </DirectoryItemContainer>
    );
};

export default DirectoryItem;