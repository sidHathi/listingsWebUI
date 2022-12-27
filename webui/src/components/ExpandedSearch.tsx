import React, { useEffect, useState, useContext } from 'react';
import styles from './component-styles.module.scss';
import { QueryContext } from '../QueryContext';
import LocationSelectionContainer from './LocationSelectionContainer';
import NumericalContextModifier from './NumericalContextModifier';

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

    return (
        <div className={styles.expandedSelectors}>
            {
                searchState === ExpandedSearchStates.location ?
                <LocationSelectionContainer handleClose={handleClose} /> :
                searchState === ExpandedSearchStates.size ?
                <NumericalContextModifier 
                    contextKey='bedrooms'
                    handleClose={handleClose} /> :
                searchState === ExpandedSearchStates.leaseTerm ?
                <NumericalContextModifier 
                    contextKey='leaseTerm'
                    handleClose={handleClose} /> : <></>
            }
        </div>
    )
}