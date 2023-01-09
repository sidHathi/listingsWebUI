import React, { ReactElement, useState, useContext } from "react";
import { useEffect } from "react";
import City from "../../models/city";
import { useRequest } from "../../services/useRequest";
import parse from "../../services/parse";
import styles from './selector-styles.module.scss';
import bostonImage from '../../assets/boston.jpeg'
import nycImage from '../../assets/nyc.jpeg';
import seattleImage from '../../assets/seattle.jpeg';
import sfImage from '../../assets/sanFran.jpeg';
import dcImage from '../../assets/dcBanner.jpeg';
import { DBLocation } from "../../models/locations";
import { Spinner } from "react-bootstrap";
import { AppContext } from "../../AppContext";

interface CitySelectorProps {
    city?: City;
    setCity: (city: City) => void;
    handleNewLocation: (newLocation: DBLocation) => void; 
}

export default function CitySelector(props: CitySelectorProps) : JSX.Element {
    const { citiesApi } = useRequest();

    const { cities: contextCities } = useContext(AppContext);
    const [ cities, setCities ] = useState<City[] | null>(null);
    const [ selectedCityName, setSelectedCityName ] = useState<string | null>(null);

    const { city, setCity, handleNewLocation } = props;

    useEffect(() => {
        if (!city) return;

        setSelectedCityName(city.name);
    }, [city, setSelectedCityName]);

    useEffect(() => {
        if (cities != null) return;
        if (contextCities != null) {
            setCities(contextCities);
            return;
        }

        const getCitiesList = async () => {
            const res = await citiesApi.getCityDetails();
            const citiesList = parse<City[]>(res);

            if (citiesList != null) {
                console.log(citiesList);
                setCities(citiesList);
            }
        };

        getCitiesList();
    }, [cities, setCities, citiesApi, contextCities]);

    const getCityJsxByName = (cityName: string, onClick: React.MouseEventHandler<HTMLButtonElement>) => {
        let file = '';
        switch(cityName.toLowerCase()) {
            case 'boston, ma':
                file = bostonImage;
                break
            case 'new york city, ny':
                file = nycImage;
                break;
            case 'seattle, wa':
                file = seattleImage;
                break;
            case 'washington, dc., usa':
                file = dcImage;
                break;
            default:
                file = sfImage;
                break;
        }

        const imageStyle = {background: `url(${file}) center / cover no-repeat`};
        return (
            <>
                {
                    cityName === selectedCityName ?
                    <button name={cityName} onClick={onClick} className={`${styles.cityButton} ${styles.current}`} style={imageStyle}>
                        <div className={styles.darken}>
                            {cityName}
                        </div>
                    </button> :

                    <button name={cityName} onClick={onClick} style={imageStyle} className={styles.cityButton}>
                        <div className={styles.darken}>
                            {cityName}
                        </div>
                    </button>
                }
            </>
        )
    }

    const handleCitySelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        const cityName = event.currentTarget.name;
        setSelectedCityName(cityName);

        if (cities == null) return;
        const cityInfo = cities.find((city) => city.name === cityName);
        if (cityInfo) {
            if (cityName !== city?.name) {
                handleNewLocation({
                    lat: cityInfo.location.lat,
                    long: cityInfo.location.long,
                    address: cityName
                })
            }
            setCity(cityInfo);
        }
    };

    if (!cities) {
        return (
            <>
            <Spinner animation="border" role="status" style={{marginTop: '10px'}}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Fetching Cities</p>
            </>
        );
    }

    return (
        <div className={styles.scrollContainer}>
            <div className={styles.scrollingItem}>
            {

                cities.map((cityInList) => getCityJsxByName(cityInList.name, handleCitySelect))
            }
            </div>
        </div>
    )
}