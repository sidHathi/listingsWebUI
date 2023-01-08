import React, { useState } from "react";
import styles from './filter-styles.module.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface BooleanFilterProps {
    name: string;
    value?: boolean;
    onChange?: (value: boolean | undefined) => void;
}

export default function BooleanFilter(props: BooleanFilterProps) : JSX.Element {
    const { name, value, onChange } = props;

    const [expanded, setExpanded] = useState<boolean>(value || false);

    const getContainerStyle = () => {
        if (expanded) {
            return {
                boxShadow: 'rgba(139, 40, 143, 0.2) 0px 0px 8px',
            };
        }
        return {}
    }

    const getHeaderStyle = () => {
        if (expanded) {
            return {
                backgroundColor: 'white',
                border: '1 px rgba(49, 49, 146, 0.5) !important'
            };
        }
        return {}
    }

    const handleToggleExpanded = () => {
        if (!onChange) {
            setExpanded(!expanded);
            return;
        }
        if (!expanded) {
            onChange(true);
        } else {
            onChange(undefined);
        }
        setExpanded(!expanded);
    }

    return (
        <div className={styles.filterContainer} style={getContainerStyle()}>
            <button className={styles.filterHeader} style={getHeaderStyle()} onClick={handleToggleExpanded}>
                <p>{name}</p>
                {
                    !expanded ?
                    <AddIcon className={styles.addRemoveIcon} /> :
                    <RemoveIcon className={styles.addRemoveIcon} />
                }
            </button>
        </div>
    );
}