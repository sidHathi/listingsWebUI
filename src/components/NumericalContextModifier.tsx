import React, { useContext, useState } from "react";
import { useEffect } from "react";
import SearchQuery from "../models/searchQuery";
import { QueryContext } from "../QueryContext";
import { NumberSlider } from "./selectors/NumberRange";
import styles from './component-styles.module.scss';
import globalStyles from '../styles/global-styles.module.scss';
import { Button, Spinner } from "react-bootstrap";
import { useCallback } from "react";

interface NumericalContextModifierProps {
    contextKey: keyof SearchQuery;
    handleNewQueryVal: (contextKey: keyof SearchQuery, newVal: any) => void;
    usageContext: "queryConstruct" | "queryModify";
}

export default function NumericalContextModifier(props: NumericalContextModifierProps) : JSX.Element {
    const { contextKey, handleNewQueryVal, usageContext } = props;
    const { query, setQuery } = useContext(QueryContext);

    const [ startValue, setStartValue ] = useState<number | null>(null);
    const [ value, setValue ] = useState<number | undefined>(undefined);
    const [ allowSave, setAllowSave ] = useState<boolean>(false);

    const getMin = useCallback(() => {
        switch(contextKey) {
            case 'bedrooms':
                return 0;
            case 'leaseTerm':
                return 3;
            default:
                return 0;
        }
    }, [contextKey])

    const getMax = useCallback(() => {
        switch(contextKey) {
            case 'bedrooms':
                return 4;
            case 'leaseTerm':
                return 12;
            default:
                return 0;
        }
    }, [contextKey]);

    const getStep = useCallback(() => {
        switch(contextKey) {
            case 'bedrooms':
                return 1;
            case 'leaseTerm':
                return 3;
            default:
                return 1;
        }
    }, [contextKey]);

    useEffect(() => {
        if (value === undefined && contextKey !== undefined && (!query || !query[contextKey])) {
            setValue(getMin());
            setStartValue(getMin());
            console.log(getMin());
            return;
        } else if (value !== undefined || !query || !contextKey) {
            return;
        }

        const newVal = query[contextKey];
        console.log(newVal);
        if (newVal !== undefined && typeof newVal === 'number') {
            setValue(newVal);
            setStartValue(newVal);
        } else {
            setValue(getMin());
            setStartValue(getMin());
        }
    }, [setValue, contextKey, query, value, getMin]);

    const handleNewValue = (
        event : Event, 
        value: number | number[], 
        activeThumb: number
    ) => {
        if (typeof value === 'number') {
            setValue(value);
            setAllowSave(true);
        }
    }

    const getLabel = () => {
        switch(contextKey) {
            case 'bedrooms':
                return 'Number of bedrooms';
            case 'leaseTerm':
                return "Minimum lease term (months)";
            default: 
                return contextKey
        }
    }

    const handleConfirmChanges = () => {
        if (!setQuery || !query) {
            return
        }
        handleNewQueryVal(contextKey, value);
    }

    const handleSetAny = () => {
        if (!setQuery || !query) {
            return
        }
        handleNewQueryVal(contextKey, undefined);
    }

    if (startValue === null) {
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
                    valueLabelOverride={contextKey === 'bedrooms' ? (val: number) => (val === 0 ? ('Studio') : (undefined)) : undefined}
                />}
                <p className={globalStyles.label}> {getLabel()} </p>
                <Button className={styles.skipButton} onClick={handleSetAny}>Search for any {getLabel()}</Button>
                {
                    allowSave && usageContext === 'queryModify' &&
                    <Button onClick={handleConfirmChanges} className={styles.confirmButton}> Confirm changes </Button>
                }
                {
                    usageContext === 'queryConstruct' && query !== undefined && contextKey === 'leaseTerm' ?
                    <Button 
                        onClick={handleConfirmChanges} 
                        className={`${styles.confirmButton} ${styles.buttonSmall}`}> 
                        Search 
                    </Button> :
                    usageContext === 'queryConstruct' ?
                    <Button 
                        onClick={handleConfirmChanges} 
                        className={`${styles.nextButton} ${styles.buttonSmall}`}> 
                        Next 
                    </Button> : <></>
                }
            </div>
        </div>
    );
}