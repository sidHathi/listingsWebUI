import React, {useState} from "react";
import styles from './filter-styles.module.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface NameFilterProps {
    defaultValue?: string;
    onChange?: (value: string | undefined) => void;
}

export default function NameFilter(props: NameFilterProps) : JSX.Element {
    const {defaultValue, onChange} = props
    const [value, setValue] = useState<string>(defaultValue || "");

    const [expanded, setExpanded] = useState(defaultValue !== undefined);

    const getContainerStyle = () => {
        if (expanded) {
            return {boxShadow: 'rgba(139, 40, 143, 0.2) 0px 0px 8px'};
        }
        return {};
    }

    const handleToggleExpanded = () => {
        if (!onChange) {
            setExpanded(!expanded);
            return;
        }
        if (!expanded) {
            onChange(value);
        } else {
            onChange(undefined)
        }
        setExpanded(!expanded);
    }

    const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
        if (onChange) {
            onChange(event.currentTarget.value);
        }
    }

    return (
        <div className={styles.filterContainer} style={getContainerStyle()}>
            <button className={styles.filterHeader} onClick={handleToggleExpanded}>
                <p>Name</p>
                {
                    !expanded ?
                    <AddIcon className={styles.addRemoveIcon} /> :
                    <RemoveIcon className={styles.addRemoveIcon} />
                }
            </button>
            {expanded &&
                <div className={styles.filterContent}>
                    <input
                        type="text"
                        className={styles.filterInput}
                        placeholder="Name of property"
                        value={value}
                        onChange={handleTextChange}
                        // value={name}
                        // onChange={e => setName(e.target.value)}
                    />
                </div>
            }
        </div>
    )
}