import React from "react";
import { useContext, useState } from "react";
import { QueryContext } from "../../QueryContext";
import styles from './filter-styles.module.scss';
import { getText } from '../../models/sortingOptions';
import CloseIcon from '@mui/icons-material/Close';

interface FilterFlagsProps {
    relaodResults: () => void;
}

export default function FilterFlags(props: FilterFlagsProps) : JSX.Element {
    const { relaodResults } = props;
    
    const {query, setQueryVal} = useContext(QueryContext);

    const handlePriceRemove = () => {
        setQueryVal('price', undefined);
        console.log(query);
        relaodResults();
    };
    const handleProviderRemove = () => {
        setQueryVal('providerNames', undefined);
        relaodResults();
    };
    const handleNameRemove = () => {
        setQueryVal('name', undefined);
        relaodResults();
    };
    const handlePetsRemove = () => {
        setQueryVal('pets', undefined);
        relaodResults();
    };
    const handleTransitRemove = () => {
        setQueryVal('transit', undefined);
        relaodResults();
    };
    const handleSortRemove = () => {
        setQueryVal('sortBy', undefined);
        relaodResults();
    };

    return (
        <div className={styles.filterFlagsContainer}>
            {
                query && query.price &&
                <button type="button" className={styles.filterFlag} onClick={handlePriceRemove}>
                    ${query.price[0]}-${query.price[1]} <CloseIcon fontSize="small"/>
                </button>
            }
            {
                query && query.providerNames &&
                <button type="button" className={styles.filterFlag} onClick={handleProviderRemove}>
                    {query.providerNames.map((prov) => `From ${prov}, `)} <CloseIcon fontSize="small"/>
                </button>
            }
            {
                query && query.name &&
                <button type="button" className={styles.filterFlag} onClick={handleNameRemove}>
                    {`Name: ${query.name}`} <CloseIcon fontSize="small"/>
                </button>
            }
            {
                query && query.pets &&
                <button type="button" className={styles.filterFlag} onClick={handlePetsRemove}>
                    Pets Allowed <CloseIcon fontSize="small"/>
                </button>
            }
            {
                query && query.transit &&
                <button type="button" className={styles.filterFlag} onClick={handleTransitRemove}>
                    Near transit <CloseIcon fontSize="small"/>
                </button>
            }
            {
                query && query.sortBy && query.sortBy !== 'relevance' &&
                <button type="button" className={styles.filterFlag} onClick={handleSortRemove}>
                    Sort By {getText(query.sortBy)} <CloseIcon fontSize="small"/>
                </button>
            }
        </div>
    );
}