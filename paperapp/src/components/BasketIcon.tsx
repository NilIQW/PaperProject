import React from 'react';
import { useAtom } from 'jotai';
import { basketTotalAtom } from '../state/atoms/basketAtom';
import BasketIconSVG from '/assets/basket.svg';
import {useNavigate} from "react-router-dom";

const BasketIcon: React.FC = () => {
    const [totalItems] = useAtom(basketTotalAtom);
    const navigate = useNavigate();

    return (
        <div style={{ position: 'fixed', top: '10px', right: '10px' }} onClick={()=> navigate('/basket')}>
            <img src={BasketIconSVG} alt="Basket" style={{ width: '40px' }} />
            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
                {totalItems}
            </span>
        </div>
    );
};

export default BasketIcon;
