import React from 'react';
import bostonBg from '../assets/boston.jpeg';
import styles from './ui-styles.module.scss';
import seattleBg from '../assets/seattle.jpeg';
import nycBg from '../assets/nyc.jpeg';
import sanFranBg from '../assets/sanFran.jpeg';
import gotham from '../assets/gotham.jpeg';
import dcBg from '../assets/dcBanner.jpeg';

interface CityBannerProps {
    city: string;
}

export default function CityBanner(props: CityBannerProps) : JSX.Element {
    const { city } = props;

    const getImage = () => {
        switch(city.toLowerCase()) {
            case 'boston, ma':
                return bostonBg;
            case'seattle, wa':
                return seattleBg;
            case'san francisco, ca':
                return sanFranBg;
            case'new york city, ny':
                return nycBg;
            case 'washington, dc., usa':
                return dcBg
            default:
                return gotham;
        }
    }
    
    return (
        <div className={styles.cityBanner} style={{background: `url(${getImage()}) center / cover no-repeat`}}>
            <div className={styles.darken}>
                <h1>{city}</h1>
            </div>
        </div>
    )
}