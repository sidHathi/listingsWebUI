import React, {useState} from "react";
import { Provider, providers } from "../../models/providers";
import styles from './filter-styles.module.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Checkbox } from "@mui/material";
import { useEffect } from "react";

interface ProviderFilterProps {
    defaultValue?: Provider[];
    onChange?: (value: Provider[] | undefined) => void;
}

export default function ProviderFilter(props: ProviderFilterProps) {
    const { defaultValue, onChange } = props;

    const [expanded, setExpanded] = useState(defaultValue !== undefined);
    const [selectedProviders, setSelectedProviders] = useState<Provider[]>(defaultValue || []);
    const [defaultChecked, setDefaultChecked] = useState<{[key: string]: boolean} | undefined>(undefined);

    useEffect(() => {
        if (defaultChecked === undefined) {
            console.log(selectedProviders);
            const newVal: {[key: string]: boolean} = {}
            providers.forEach(provider => {
                if (selectedProviders.includes(provider)) {
                    newVal[provider] = true;
                }
                else {
                    newVal[provider] = false;
                }
            });
            setDefaultChecked(newVal);
        }
    }, [setDefaultChecked, defaultChecked, selectedProviders]);

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
            onChange(selectedProviders);
        }
        setExpanded(!expanded);
    }

    const handleAddRemove = (provider: Provider, add: boolean) => {
        console.log(provider);
        console.log(add);
        console.log(selectedProviders);
        if (!add) {
            const newProviders = selectedProviders.filter(val => val !== provider)
            setSelectedProviders(newProviders);
            if (onChange !== undefined) {
                onChange(newProviders);
            }
        } else {
            const newProviders = selectedProviders.concat([provider])
            setSelectedProviders(newProviders);
            if (onChange !== undefined) {
                onChange(newProviders);
            }
        }
        console.log(selectedProviders);
    }

    return (
        <div className={styles.filterContainer} style={getContainerStyle()}>
            <button className={styles.filterHeader} onClick={handleToggleExpanded}>
                <p>Source</p>
                {
                    !expanded ?
                    <AddIcon className={styles.addRemoveIcon} /> :
                    <RemoveIcon className={styles.addRemoveIcon} />
                }
            </button>
            {
                expanded && selectedProviders !== undefined &&
                <div className={`${styles.filterContent} ${styles.small}`}>
                    {providers.map((prov) => 
                        <div className={styles.checkBoxRow}>
                        <p>{prov}</p>
                        {defaultChecked &&
                        <Checkbox
                            key={prov}
                            defaultChecked={
                                defaultChecked[prov]
                            }
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {handleAddRemove(prov, event.target.checked)}
                            }
                        />
                        }
                        </div>
                    )}
                </div>
            }
        </div>
    );
}