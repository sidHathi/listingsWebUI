import React, { PropsWithChildren } from 'react';
import fbmLogo from '../assets/fbmLogo.png';
import rentLogo from '../assets/rentLogo2.jpeg';
import styles from './ui-styles.module.css';

interface LogoProps {
    providerName: string;
}

export default function ProviderLogo(props: LogoProps) : JSX.Element {
    const { providerName } = props;

    switch(providerName) {
        case 'facebook':
            return (
                <img src={fbmLogo} height="30px" alt="facebook logo" />
            )
        case 'rent.com':
            return (
                <img src={rentLogo} height="30px" alt="rent.com logo" />
            )
        default:
            return (<></>)
    }
}