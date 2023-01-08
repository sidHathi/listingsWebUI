import React, { useEffect, useState, useContext } from 'react';
import styles from './component-styles.module.scss';
import { QueryContext } from '../QueryContext';
import LocationSelectionContainer from './LocationSelectionContainer';
import NumericalContextModifier from './NumericalContextModifier';
import { SearchLocation } from '../models/locations';
import SearchQuery from '../models/searchQuery';

export const ExpandedSearchStates = {
    location: 'location',
    size: 'size',
    leaseTerm: 'leaseTerm',
}

interface ExpandedSearchProps {
    handleClose: () => void;
    searchState: string;
}

export default function ExpandedSearch(props: ExpandedSearchProps) : JSX.Element {
    // const {query, setQuery} = useContext(QueryContext);
    const { handleClose, searchState } = props;
    const { query, setQuery } = useContext(QueryContext);;

    const handleNewQueryLocation = (newLocation: SearchLocation, newAddress: string) => {
        if (!query || !setQuery) {
            return;
        }
        let newQuery = {...query};

        newQuery.location = newLocation;
        newQuery.address = newAddress;
        setQuery(newQuery);

        handleClose();
    }

    const handleNewQueryVal = (contextKey: keyof SearchQuery, newVal: any) => {
        if (!query) {
            return;
        }
        const newQuery = {
            ...query
        }; 
        switch(contextKey) {
            case 'bedrooms':
                newQuery.bedrooms = newVal;
                break;
            case 'leaseTerm':
                newQuery.leaseTerm = newVal;
                break;
            default:
                return;
        }
        setQuery(newQuery);
        handleClose();
    }

    return (
        <div className={styles.expandedSelectors}>
            {
                searchState === ExpandedSearchStates.location ?
                <LocationSelectionContainer 
                    handleNewQueryLocation={handleNewQueryLocation}
                    usageContext="queryModify" /> :
                searchState === ExpandedSearchStates.size ?
                <NumericalContextModifier 
                    contextKey='bedrooms'
                    handleNewQueryVal={handleNewQueryVal}
                    usageContext="queryModify" /> :
                searchState === ExpandedSearchStates.leaseTerm ?
                <NumericalContextModifier 
                    contextKey='leaseTerm'
                    handleNewQueryVal={handleNewQueryVal}
                    usageContext="queryModify" /> : <></>
            }
        </div>
    )
}