import React, {useState} from "react";
import styles from './filter-styles.module.scss';
import { QueryContext } from "../../QueryContext";
import { SortKey, SortKeyVals } from "../../models/sortingOptions";
import { getText } from "../../models/sortingOptions";

interface SortContainerProps {
    sortVal: SortKey;
    onChange?: (value: SortKey) => void;
}

export default function SortContainer(props: SortContainerProps): JSX.Element {
    const { sortVal, onChange } = props;
    const [currentSortVal, setCurrentSortVal] = useState<SortKey>(sortVal);

    const handleSortSelect = (newVal: SortKey) => {
        setCurrentSortVal(newVal);
        if (onChange) {
            onChange(newVal);
        }
    }

    const selectedStyle = {
        backgroundColor: 'white',
        boxShadow: 'rgba(139, 40, 143, 0.2) 0px 0px 8px',
        border: '1px solid rgba(49, 49, 146, 0.5) !important',
    }

    return (
        <div className={styles.sortFieldsContainer}>
            {
                SortKeyVals.map(sortVal => 
                    <button 
                        className={styles.sortSelect}
                        style={currentSortVal === sortVal ?
                            selectedStyle: {}}
                        onClick={() => handleSortSelect(sortVal)}
                        key={sortVal}
                    >
                        {getText(sortVal)}
                    </button>
                )
            }
        </div>
    )
}
