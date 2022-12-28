import React from "react";
import styles from './filter-styles.module.scss';
import { Container } from "react-bootstrap";
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from "react";
import PriceFilter from "./PriceFilter";
import NameFilter from "./NameFilter";
import BooleanFilter from "./BooleanFilter";
import { Button } from "@mui/material";
import SortContainer from "./SortContainer";
import { SortKey } from "../../models/sortingOptions";
import { useContext } from "react";
import { QueryContext } from "../../QueryContext";
import { useEffect } from "react";
import SearchQuery from "../../models/searchQuery";
import { Provider } from '../../models/providers'
import ProviderFilter from "./ProviderFilter";
import FilterFlags from "./FilterFlags";

interface FilterMenuProps {
    reloadResults: () => void;
}

export default function FilterMenu(props: FilterMenuProps) : JSX.Element {
    const { reloadResults } = props;
    const { query, setQuery } = useContext(QueryContext);

    const [showFilters, setShowFilters] = useState(false);
    const [showSort, setShowSort] = useState(false);

    const [priceRange, setPriceRange] = useState<number[] | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [pets, setPets] = useState<boolean | undefined>(undefined);
    const [transit, setTransit] = useState<boolean | undefined>(undefined);
    const [providerNames, setProviderNames] = useState<Provider[] | undefined>(undefined);
    const [sortBy, setSortBy] = useState<SortKey | undefined>(undefined);

    useEffect(() => {
        if (!query) {
            return;
        }

        setPriceRange(query.price);
        setName(query.name);
        setPets(query.pets);
        setTransit(query.transit);
        setSortBy(query.sortBy);
        setProviderNames(query.providerNames);
    }, [query, setSortBy, setPets, setTransit, setName, setPriceRange])

    const selectedButtonStyle = {
        backgroundColor: "white",
        marginBottom: '0',
        borderRadius: '8px 8px 0 0',
    }

    const handleFilterButtonSelect = () => {
        setShowFilters(!showFilters)
        setShowSort(false);
    }

    const handleSortButtonSelect = () => {
        setShowSort(!showSort)
        setShowFilters(false);
    }

    const handlePriceChange = (newPriceRange: number[] | undefined) => {
        setPriceRange(newPriceRange);
    }

    const handleNameChange = (newName: string | undefined) => {
        setName(newName);
    }

    const handlePetsChange = (newPets: boolean | undefined) => {
        setPets(newPets);
    }

    const handleTransitChange = (newTransit: boolean | undefined) => {
        setTransit(newTransit);
    }

    const handleProviderNamesChange = (newProviderNames: Provider[] | undefined) => {
        setProviderNames(newProviderNames);
    }

    const handleSortKeyChange = (newSort: SortKey | undefined) => {
        setSortBy(newSort);
    }

    const handleFilterApply = () => {
        if (!query) {
            return;
        }
        const newQuery = {...query}
        newQuery['price'] = priceRange;
        newQuery['name'] = name;
        newQuery['pets'] = pets;
        newQuery['transit'] = transit;
        newQuery['sortBy'] = sortBy;
        newQuery['providerNames'] = providerNames;
        setQuery(newQuery as SearchQuery);
        setShowFilters(false);
        setShowSort(false);
        reloadResults();
    }

    return (
        <>
            <Container>
                <div className={styles.filterMenuHeaders}>
                    {/* <h5 className={styles.pageTitle}> Matching Rentals: </h5> */}
                    { !showFilters && !showSort && 
                    <FilterFlags relaodResults={reloadResults} />
                    }
                    <button 
                        className={`${styles.menuButton} ${styles.leftMost}`}
                        style={showSort ? selectedButtonStyle : {}}
                        onClick={handleSortButtonSelect}>
                        {!showSort ? 
                            <><SortIcon />  Sort</> :
                            <>Close   <ExpandLessIcon /></>
                        }
                    </button>
                    <button 
                        className={styles.menuButton}
                        style={showFilters ? selectedButtonStyle : {}}
                        onClick={handleFilterButtonSelect}>
                        {!showFilters ? 
                            <><FilterListIcon />  Filter</> :
                            <>Close   <ExpandLessIcon /></>
                        }
                    </button>
                </div>
                {
                    showFilters &&
                    <div className={`${styles.filterMenuExpanded} ${styles.cornerFold}`}>
                        <div className={styles.filterRow}> 
                            <h5> Filter by: </h5>
                            <div className={styles.centerBlock}>
                                <PriceFilter defaultValue={priceRange} onChange={handlePriceChange}/>
                                {/* <NameFilter defaultValue={name} onChange={handleNameChange}/> */}
                                <ProviderFilter defaultValue={providerNames} onChange={handleProviderNamesChange}/>
                                <BooleanFilter name='Allows pets' value={pets} onChange={handlePetsChange}/>
                                <BooleanFilter name='Close to transit' value={transit} onChange={handleTransitChange}/>
                            </div>
                            <Button className={styles.confirmButton} onClick={handleFilterApply}> Apply </Button>
                        </div>
                    </div>
                }
                {
                    showSort &&
                    <div className={styles.filterMenuExpanded}>
                        <div className={styles.filterRow}> 
                            <h5> Sort by: </h5>
                            <SortContainer sortVal={sortBy || 'relevance'} onChange={handleSortKeyChange}/>
                            <Button className={styles.confirmButton} onClick={handleFilterApply}> Apply </Button>
                        </div>
                        {/* TO-DO: add filters for name, price, type, pets, transit */}
                    </div>
                }
            </Container>
        </>
    )
}