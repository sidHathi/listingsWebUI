import React, { useContext, useState } from "react";
import { useEffect } from "react";
import SearchQuery from "../models/searchQuery";
import { QueryContext } from "../QueryContext";
import { NumberSlider } from "./selectors/NumberRange";
import styles from './component-styles.module.scss';
import globalStyles from '../styles/global-styles.module.scss';
import { Button, Spinner } from "react-bootstrap";

interface NumericalContextModifierProps {
    contextKey: keyof SearchQuery;
    handleClose: () => void;
}

export default function NumericalContextModifier(props: NumericalContextModifierProps) : JSX.Element {
    const { contextKey, handleClose } = props;
    const { query, setQuery } = useContext(QueryContext);

    const [ startValue, setStartValue ] = useState<number | null>(null);
    const [ value, setValue ] = useState<number | null>(null);
    const [ allowSave, setAllowSave ] = useState<boolean>(false);

    useEffect(() => {
        if (value != null || !query || !contextKey) {
            return;
        }

        const newVal = query[contextKey];
        console.log(newVal);
        if (newVal !== undefined && typeof newVal === 'number') {
            setValue(newVal);
            setStartValue(newVal);
        }
    }, [setValue, contextKey, query, value]);

    const getMin = () => {
        switch(contextKey) {
            case 'bedrooms':
                return 1;
            case 'leaseTerm':
                return 3;
            default:
                return 0;
        }
    }

    const getMax = () => {
        switch(contextKey) {
            case 'bedrooms':
                return 4;
            case 'leaseTerm':
                return 12;
            default:
                return 0;
        }
    }

    const getStep = () => {
        switch(contextKey) {
            case 'bedrooms':
                return 1;
            case 'leaseTerm':
                return 3;
            default:
                return 1;
        }
    }

    const handleNewValue = (
        event : Event, 
        value: number | number[], 
        activeThumb: number
    ) => {
        if (typeof value === 'number') {
            setValue(value);
            if (value !== startValue) {
                setAllowSave(true);
            } else {
                setAllowSave(false);
            }
        }
    }

    const getLabel = () => {
        switch(contextKey) {
            case 'bedrooms':
                return 'Number of bedrooms';
            case 'leaseTerm':
                return "Minimum lease term";
            default: 
                return contextKey
        }
    }

    const handleConfirmChanges = () => {
        console.log(value);
        if (!setQuery || !query || !value) {
            return
        }
        console.log('saving query');
        const newQuery = {
            ...query
        }; 
        switch(contextKey) {
            case 'bedrooms':
                newQuery.bedrooms = value;
                break;
            case 'leaseTerm':
                newQuery.leaseTerm = value;
                break;
            default:
                return;
        }
        setQuery(newQuery);
        handleClose();
    }

    if (!startValue) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    return (
        <div className={styles.numberSelectionContainer}>
            <div className={styles.rangeContainer}>
                {<NumberSlider 
                    min={getMin()} 
                    max={getMax()} 
                    step={getStep()}
                    value={startValue}
                    onChange={handleNewValue}
                />}
                <p className={globalStyles.label}> {getLabel()} </p>
                {
                    allowSave &&
                    <Button onClick={handleConfirmChanges} className={styles.confirmButton}> Confirm changes </Button>
                }
            </div>
        </div>
    );
}