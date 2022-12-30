import React, {useCallback, useState} from 'react';
import styles from './page-styles.module.scss';
import uiStyles from '../ui/ui-styles.module.scss';
import { Link } from 'react-router-dom';
import UiCard, { UiCardMain } from '../ui/UiCard';
import logoUnaltered from '../assets/logo-06.png';
import QueryConstructor from '../components/QueryConstructor';
import nycLine from '../assets/nycLine-01.png';

export default function LandingPage(): JSX.Element {
    const [expanded, setExpanded] = useState(false);

    const imageBG = {
        background: (`url(${nycLine}) center / cover no-repeat`),
        width: '100%',
        height: '100%'
    }

    const getSearchContainerStyle = useCallback(() => {
        if (expanded) {
            return {marginTop: '20px'};
        }
        return {};
    }, [expanded]);

    const getCardStyle = useCallback(() => {
        if (expanded) {
            return {
                boxShadow: 'none', 
                background: 'none', 
                marginTop: 'none',
                padding: 'none',
                overflow: 'visible',
                width: '100%'
            };
        }
        return {};
    }, [expanded]);

    const getInfoStyle = () => {
        if (expanded) {
            return {
                height: '0',
            }
        }
        return {};
    }

    const handleExpand = () => setExpanded(true);
    const handleCollapse = () => setExpanded(false);

    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.landingBg} style={imageBG}>
                <div className={styles.searchContainer} style={getSearchContainerStyle()}>
                    <UiCard style={getCardStyle()}>
                        <div className={styles.searchContent}>
                            <img src={logoUnaltered} className={styles.mainLogo} alt='logo'/>
                            <div className={styles.landingInfo} style={getInfoStyle()}>
                                <h1>Find your new home</h1>
                                <p><strong>Dartspot</strong> is a housing aggregation service designed for Dartmouth students that lets you search for off-term rental listings across the internet.</p>
                            </div>
                        </div>
                        <QueryConstructor handleOpen={handleExpand} handleClose={handleCollapse}/>
                    </UiCard>
                </div>
            </div>
        </div>
    )
}