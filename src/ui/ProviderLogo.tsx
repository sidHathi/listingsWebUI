import React, { PropsWithChildren } from 'react';
import fbmLogo from '../assets/fbmLogo.png';
import rentLogo from '../assets/rentLogo2.jpeg';
import apartmentsLogo from '../assets/apartmentsLogo.png';
import zillowLogo from '../assets/zillowLogo.png';
import airbnbLogo from '../assets/airbnbLogo.png';
import styles from './ui-styles.module.css';

interface LogoProps {
    providerName: string;
}

export default function ProviderLogo(props: LogoProps) : JSX.Element {
    const { providerName } = props;

    const height: string = '24px'

    switch(providerName) {
        case 'facebook':
            return (
                <img src={fbmLogo} height={height} alt="facebook logo" />
            )
        case 'rent.com':
            return (
                <img src={rentLogo} height={height} alt="rent.com logo" />
            )
        case 'zillow':
            return (
                <img src={zillowLogo} height={height} alt="zillow logo" />
            )
        case 'apartments.com':
            return (
                <img src={apartmentsLogo} height={height} alt="apartments.com logo" />
            )
        case 'airbnb':
            return (
                <img src={airbnbLogo} height={height} alt="airbnb logo" />
            )
        default:
            return (<></>)
    }
}