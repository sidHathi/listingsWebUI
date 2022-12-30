import React, { useState, useContext, useEffect } from 'react';
import { QueryContext } from '../QueryContext';
import City from '../models/city';
import { Button } from '@mui/material';
import styles from './component-styles.module.scss';
import globalStyles from '../styles/global-styles.module.scss';
import { DBLocation, SearchLocation } from '../models/locations';
import CitySelector from './selectors/CitySelector';
import LocationAutocomplete from './selectors/LocationSelector';
import Alert from '@mui/material/Alert';
import { Spinner } from 'react-bootstrap';

interface LocationSelectionContainerProps {
    handleNewQueryLocation: (newLocation: SearchLocation, newAddress: string) => void;
    usageContext: "queryConstruct" | "queryModify";
}

export default function LocationSelectionContainer(props: LocationSelectionContainerProps) : JSX.Element {
    const { query, setQuery } = useContext(QueryContext);
    const { handleNewQueryLocation, usageContext } = props;

    const [radius, setRadius] = useState(20);
    const [location, setLocation] = useState(query?.location);
    const [address, setAddress] = useState(query?.address);
    const [locationErr, setLocationErr] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [allowSave, setAllowSave] = useState(false);
    const [city, setCity] = useState<City | null>(null);

    useEffect(() => {
        if (!query || !query.location || city != null) {
            return;
        }

        const queryCity: City = {
            name: query.address,
            location: query.location
        }
        setCity(queryCity);
        setRadius(queryCity.location.radius);
    }, [city, query, setCity]);

    const handleNewLocation = (newLocation: DBLocation) => {
        const newSearchLoc: SearchLocation = {
            lat: newLocation.lat,
            long: newLocation.long,
            radius: radius,
        }

        setLocation(newSearchLoc);
        setAddress(newLocation.address);
        setShowSuccess(true);
        setAllowSave(true);
    };

    const handleConfirmChanges = () => {
        if (!location || !address) {
            setLocationErr(true);
            return;
        }
        handleNewQueryLocation(location, address);
    };

    if (!city && query !== undefined) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    return (
        <>
            <div className={styles.citySelectionContainer}>
                <h4>Select a city</h4>
                <CitySelector city={city || undefined} setCity={setCity} handleNewLocation={handleNewLocation}/>
            </div>
            <div className={styles.inner}>
                <p className={globalStyles.label}>or</p>
                <h4>Enter a custom address</h4>
                <LocationAutocomplete handleNewLocation={handleNewLocation} setErr={setLocationErr} />
                {
                    locationErr &&
                    <Alert severity="error" onClose={() => setShowSuccess(false)} className={globalStyles.alert}>
                        Invalid entry
                    </Alert>
                }
                {
                    showSuccess &&
                    <Alert severity="success" onClose={() => setShowSuccess(false)} className={globalStyles.alert}>
                        {`${address}: Location confirmed`}
                    </Alert>
                }
                {
                    allowSave && usageContext === 'queryModify' &&
                    <Button onClick={handleConfirmChanges} className={styles.confirmButton}> Confirm changes </Button>
                }
                {
                    allowSave && usageContext === 'queryConstruct' &&
                    <Button onClick={handleConfirmChanges} className={styles.nextButton}> Next </Button>
                }
            </div>
        </>
    )
}