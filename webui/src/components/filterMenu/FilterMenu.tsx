import React from "react";
import styles from './filter-styles.module.scss';
import { Container } from "react-bootstrap";
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from "react";
import PriceFilter from "./PriceFilter";

export default function FilterMenu() : JSX.Element {
    const [showFilters, setShowFilters] = useState(false);
    const [showSort, setShowSort] = useState(false);

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

    return (
        <>
            <Container>
                <div className={styles.filterMenuHeaders}>
                    {/* <h5 className={styles.pageTitle}> Matching Rentals: </h5> */}
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
                    <div className={styles.filterMenuExpanded}>
                        <h5> Filter By </h5>
                        <PriceFilter />
                        {/* TO-DO: add filters for name, price, type, pets, transit */}
                    </div>
                }
                {
                    showSort &&
                    <div className={styles.sortMenuExpanded}>
                        <h5> Sort By </h5>
                        {/* TO-DO: add filters for name, price, type, pets, transit */}
                    </div>
                }
            </Container>
        </>
    )
}