import React from 'react';

import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import styles from './selector-styles.module.scss';
import { style } from '@mui/system';
import { DBLocation } from '../../models/locations';

interface AutocompleteProps {
    handleNewLocation: (newLocation: DBLocation) => void;
    setErr: (err: boolean) => void;
}

export default function LocationAutocomplete(props: AutocompleteProps) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {},
        debounce: 300,
    });

    const { handleNewLocation, setErr } = props;

    const ref = useOnclickOutside(() => {
      // When user clicks outside of the component, we can dismiss
      // the searched suggestions by calling this method
      clearSuggestions();
    });
  
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Update the keyword of the input element
      setValue(e.target.value);
      setErr(false);
    };

    const handleSelect = (props: { description: string }) =>
    () => {
        const {description} = props;
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        console.log(value);

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
            setErr(false);
            const { lat, lng } = getLatLng(results[0]);
            const newLoc: DBLocation = {
                lat,
                long: lng,
                address: description
            }
            handleNewLocation(newLoc);
        }).catch((_) => {setErr(true)});
    };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <button key={place_id} onClick={handleSelect(suggestion)} className={styles.locationSuggestion}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </button>
            );
        });

    return (
        <div ref={ref} className={styles.locationHandler}>
            <div className={styles.searchContainer}>
                <input
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Where are you looking?"
                    className={styles.locationInput}
                />
            </div>
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && 
                <ul className={styles.suggestions}>{renderSuggestions()}</ul>
            }
        </div>
    );
}