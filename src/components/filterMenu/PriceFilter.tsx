import React, { useState } from "react";
import { QueryContext } from "../../QueryContext";
import { RangeSlider } from "../selectors/NumberRange";
import styles from './filter-styles.module.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect } from "react";

interface PriceFilterProps {
    defaultValue?: number[];
    onChange?: (value: number[] | undefined) => void;
}

export default function PriceFilter(props: PriceFilterProps) : JSX.Element {
    const {defaultValue, onChange} = props;

    const [expanded, setExpanded] = useState(defaultValue !== undefined);
    const [value, setValue] = useState<number[] | undefined>(defaultValue || undefined);

    useEffect(() => {
        if (value !== undefined) {
            return;
        }
        setValue([0, 6000]);
    }, [value, setValue])

    const getContainerStyle = () => {
        if (expanded) {
            return {boxShadow: 'rgba(139, 40, 143, 0.2) 0px 0px 8px'};
        }
        return {}
    }

    const handleToggleExpanded = () => {
        if (!onChange) {
            setExpanded(!expanded);
            return;
        }
        if (expanded) {
            onChange(undefined);
        } else {
            onChange(value);
        }
        setExpanded(!expanded);
    }

    const handleChange = (
        event: Event, 
        value: number | number[], 
        activeThumb: number) => {
        if (onChange && typeof value !== 'number') {
            onChange(value)
        }
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
                expanded && value !== undefined &&
                <div className={`${styles.filterContent} ${styles.extraPadding}`}>
                    <RangeSlider
                        min={0}
                        max={6000}
                        step={100}
                        stepsPerMark={20}
                        value={value}
                        onChange={handleChange}
                    />
                </div>
            }
        </div>
    )
}