import { useState, useEffect } from 'react';


import * as brandService from '~/apiServices/brandsService';
import BrandCarousel from '~/pages/component/BrandCarousel';
function BrandGenuine() {
    const [brandGenuine, setBrandGenuine] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result_brand = await brandService.getBrandsByType('genuine');
            if (result_brand) {
                setBrandGenuine(result_brand);
            }
        };
        fetchApi();
    }, []);

    return <BrandCarousel brands={brandGenuine}></BrandCarousel>;
}
export default BrandGenuine;
