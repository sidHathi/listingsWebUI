import React, { PropsWithChildren } from "react";
import styles from './selector-styles.module.scss';
import globalStyles from '../../styles/global-styles.module.scss';
import { useViewport } from "../../ui/useViewport";
import { uiBreakpoints } from "../../ui/breakpoints";

interface selectProps {
    toggleSelect: () => void;
    orientation?: string;
    value?: string;
    selected: boolean;
    fieldName: string;
}

export default function Selector(props: PropsWithChildren<selectProps>) : JSX.Element {
    const { toggleSelect, orientation, value, fieldName, selected } = props;
    let overrideBorderStyle: {borderRadius: string} | {} = {};
    const { width } = useViewport();


    if (orientation) {
        switch (orientation) {
            case "left":
                overrideBorderStyle = {
                    borderRadius: '40px 8px 8px 40px',
                    marginLeft: 'auto',
                    marginRight: width > uiBreakpoints.small ? '8px': '2px'
                };
                break;
            case "right":
                overrideBorderStyle = {
                    borderRadius: '8px 40px 40px 8px',
                    marginRight: 'auto',
                    marginLeft: width > uiBreakpoints.small ? '8px': '2px'
                };
                break;
            default:
                overrideBorderStyle = {borderRadius: '8px 8px 8px 8px'};
                break;
        }
    }

    const handleSelect = () => {
        console.log('handleSelect');
        toggleSelect();
    }

    return (
        <>
            { 
            selected ?
                <button className={`${styles.selector} ${styles.selected}`} style={overrideBorderStyle} onClick={handleSelect}>
                    <p>Select {fieldName}</p>
                </button>
            : 
                <button className={`${styles.selector}`} style={overrideBorderStyle} onClick={handleSelect}>
                    <p className={globalStyles.label}>{value === undefined ? 'Any' : value}</p>
                    <p>Change {fieldName}</p>
                </button>
            }
        </>
    );
}