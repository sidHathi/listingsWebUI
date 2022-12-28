import React from 'react';
import styles from './page-styles.module.scss';
import { Link } from 'react-router-dom';

export default function LandingPage(): JSX.Element {
    return (
        <div className={styles.landingPageContainer}>
            <Link to={'/results'} > Search Results </Link>
        </div>
    )
}