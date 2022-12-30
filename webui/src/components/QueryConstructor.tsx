import React, {useState, useEffect, useContext} from "react";
import { SearchLocation } from "../models/locations";
import styles from './component-styles.module.scss';
import LocationSelectionContainer from "./LocationSelectionContainer";
import NumericalContextModifier from "./NumericalContextModifier";
import SearchQuery from "../models/searchQuery";
import { QueryContext } from "../QueryContext";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

interface QueryConstructorProps {
    handleOpen: () => void;
    handleClose: () => void;
}

export default function QueryConstructor(props: QueryConstructorProps) : JSX.Element {
    const { handleOpen, handleClose } = props;
    const { query, setQuery }  = useContext(QueryContext);
    const navigate = useNavigate();

    const [locationExpanded, setLocationExpanded] = useState(false);
    const [sizeExpanded, setSizeExpanded] = useState(false);
    const [termExpanded, setTermExpanded] = useState(false);

    const [searchEnabled, setSearchEnabled] = useState(false);


    const getOuterSearchClasses = () => {
        if (locationExpanded || sizeExpanded || termExpanded) {
            return `${styles.searchBar} ${styles.searchExpanded}`;
        }
        return `${styles.searchBar}`;
    }

    const getActiveInactiveClasses = (headerKey: string) => {
        switch (headerKey) {
            case 'location':
                if (locationExpanded) {
                    return `${styles.selectionHeader} ${styles.active} ${styles.primaryHeader}`
                } else if (sizeExpanded || termExpanded) {
                    return `${styles.selectionHeader} ${styles.inactive}`
                } else {
                    return `${styles.selectionHeader} ${styles.primaryHeader}`
                }
            case 'size':
                if (sizeExpanded) {
                    return `${styles.selectionHeader} ${styles.active} ${styles.primaryHeader}`
                } else if (locationExpanded || termExpanded){
                    return `${styles.selectionHeader} ${styles.inactive}`
                } else {
                    return `${styles.selectionHeader}`
                }
            case 'term':
                if (termExpanded) {
                    return `${styles.selectionHeader} ${styles.active} ${styles.primaryHeader}`
                } else if (locationExpanded || sizeExpanded){
                    return `${styles.selectionHeader} ${styles.inactive}`
                } else {
                    return `${styles.selectionHeader}`
                }
            default:
                break;
        }
        return '';
    }

    const handleToggleLocationExpand = () => {
        if (locationExpanded) {
            handleClose()
        } else {
            handleOpen()
        }
        setLocationExpanded(!locationExpanded);
        setSizeExpanded(false);
        setTermExpanded(false);
    }

    const handleToggleSizeExpand = () => {
        console.log(query);
        if (sizeExpanded) {
            handleClose()
        } else {
            handleOpen()
        }
        if (!query) {
            handleToggleLocationExpand();
            return;
        }
        setSizeExpanded(!sizeExpanded);
        setLocationExpanded(false);
        setTermExpanded(false);
    }

    const handleToggleTermExpand = () => {
        console.log(query);
        if (termExpanded) {
            handleClose()
        } else {
            handleOpen()
        }
        if (!query) {
            handleToggleLocationExpand();
            return;
        }
        setTermExpanded(!termExpanded);
        setSizeExpanded(false);
        setLocationExpanded(false);
    }

    const handleConfirmLocation = (location: SearchLocation, newAddress: string) => {
        const newQuery = {
            location: location,
            address: newAddress
        }
        setQuery(newQuery);
        setSizeExpanded(!sizeExpanded);
        setLocationExpanded(false);
        setTermExpanded(false);
        setSearchEnabled(true);
    }

    const handleNewQueryVal = (contextKey: string, newVal: any) => {
        if (!query) {
            return;
        }
        const newQuery = {
           ...query,
            [contextKey]: newVal,
        }
        setQuery(newQuery);
        if (contextKey === 'bedrooms') {
            handleToggleTermExpand();
        } else {
            handleSearch();
        }
    }

    const handleSearch = () => {
        navigate('/results');
        return;
    }

    return (
        <>
        <div className={getOuterSearchClasses()}>
            <div className={styles.searchHeaders}>
                <button 
                    className={getActiveInactiveClasses('location')} 
                    onClick={handleToggleLocationExpand}
                    style={{borderRight: '1px solid lightgray', flex: '1 1 auto'}}>
                    Select a location
                </button>
                <button 
                    className={getActiveInactiveClasses('size')} 
                    onClick={handleToggleSizeExpand}
                    style={{borderRight: '1px solid lightgray'}}>
                    Select a size
                </button>
                <button className={getActiveInactiveClasses('term')} onClick={handleToggleTermExpand}>
                    Select a lease duration
                </button>
            </div>
            { searchEnabled && 
                <button className={styles.searchButton}>
                    <SearchIcon fontSize='small' />
                </button>
            }
        </div>
        {
            (locationExpanded || sizeExpanded || termExpanded) &&
            <div className={styles.expandedContent}>
                {
                    locationExpanded &&
                    <LocationSelectionContainer 
                        handleNewQueryLocation={handleConfirmLocation}
                        usageContext='queryConstruct' />
                }
                {
                    sizeExpanded &&
                    <NumericalContextModifier 
                        contextKey="bedrooms" 
                        handleNewQueryVal={handleNewQueryVal}
                        usageContext='queryConstruct' />
                }
                {
                    termExpanded &&
                    <NumericalContextModifier 
                        contextKey="leaseTerm" 
                        handleNewQueryVal={handleNewQueryVal}
                        usageContext='queryConstruct' />
                }
            </div>
        }
        </>
    );
}