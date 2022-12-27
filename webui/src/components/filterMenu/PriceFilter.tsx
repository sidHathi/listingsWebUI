import React, { useState } from "react";
import { QueryContext } from "../../QueryContext";
import { RangeSlider } from "../selectors/NumberRange";
import globalStyles from '../../styles/global-styles.module.scss'
import styles from './filter-styles.module.scss';
import AddIcon from '@mui/icons-material/Add';
import Add from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from "@mui/material";

export default function PriceFilter() : JSX.Element {
    const [expanded, setExpanded] = useState(false);

    const getContainerStyle = () => {
        if (expanded) {
            return {boxShadow: 'rgba(49, 49, 146, 0.05) 0px 4px 6px'};
        }
        return {}
    }

    const handleToggleExpanded = () => {
        setExpanded(!expanded);
    }

    return (
        <div className={styles.filterContainer} style={getContainerStyle()}>
            <button className={styles.filterHeader} onClick={handleToggleExpanded}>
                <p>Price Range</p>
                {
                    !expanded ?
                    <AddIcon className={styles.addRemoveIcon} /> :
                    <RemoveIcon className={styles.addRemoveIcon} />
                }
            </button>
            {
                expanded &&
                <div className={styles.priceFilter}>
                    <RangeSlider
                        min={0}
                        max={6000}
                        step={100}
                        stepsPerMark={20}
                        value={[500, 2000]}
                        onChange={(
                            event: Event, 
                            value: number | number[], 
                            activeThumb: number) => {}}
                    />
                </div>
            }
        </div>
    )
}