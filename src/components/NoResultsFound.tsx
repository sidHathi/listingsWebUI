import React, { useContext, useState, useEffect, useCallback } from 'react';
import searchImage from '../assets/searchIcon.png';
import styles from './component-styles.module.scss';
import globalStyles from '../styles/global-styles.module.scss';
import { Button } from '@mui/material';
import { QueryContext } from '../QueryContext';
import { defaultScrapeQuery } from '../models/scrapeQuery';
import ScrapeQuery from '../models/scrapeQuery';
import { useRequest } from '../services/useRequest';
import parse from '../services/parse';
import { Alert } from '@mui/material';
import ScrapeQueryResp from '../models/scrapeQueryResp';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import haversineDistance from 'haversine-distance';
import { Spinner } from 'react-bootstrap';
import { QUERY_LIMIT } from '../models/scrapeQuery';

export default function NoResultsFound() : JSX.Element {
    const { scrapeQueryApi } = useRequest();
    const { query } = useContext(QueryContext);
    const [queryAdded, setQueryAdded] = useState<boolean | undefined>(undefined);
    const [queryLimitMet, setQueryLimitMet] = useState(false);
    const [fail, setFail] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkLocationsEquivalence = (loc1: {lat: number, lng: number}, loc2: {lat: number, lng: number}) => {
        console.log(haversineDistance(loc1, loc2));
        if (haversineDistance(loc1, loc2) < 10000) {
            return true;
        }
        return false;
    }

    const checkQueryExistence = useCallback(async (candidate: ScrapeQuery) => {
        const queriesRes = await scrapeQueryApi.getQueries();
        const prevQueries = parse<ScrapeQueryResp[]>(queriesRes);
        if (prevQueries == null || prevQueries.length > QUERY_LIMIT) {
            return true;
        }

        if (prevQueries.length > QUERY_LIMIT) {
            setQueryLimitMet(true);
        }
        for (const query of prevQueries) {
            const geoCodedLoc = await getGeocode({address: query.location});
            const { lat, lng } = getLatLng(geoCodedLoc[0]);
            const locationEquiv = checkLocationsEquivalence({lat, lng}, {lat: candidate.location.lat, lng: candidate.location.long});
            if (locationEquiv && query.reType === candidate.reType && query.bedrooms === candidate.bedrooms && query.priceRange[1] === candidate.priceRange[1] && query.leaseDuration === candidate.leaseDuration && query.pets === candidate.pets && query.transit === candidate.transit) {
                return true;
            }
        }
        return false;
    }, [scrapeQueryApi]);

    const constructNewQuery = useCallback(() => {
        if (!query) {
            return null;
        }
        const newQuery: ScrapeQuery = defaultScrapeQuery;
        newQuery.location = {
            lat: query.location.lat,
            long: query.location.long,
            address: query.address,
        }

        if (query.price !== undefined) {
            newQuery.priceRange = query.price;
        }
        if (query.bedrooms !== undefined) {
            newQuery.bedrooms = query.bedrooms;
        }
        if (query.leaseTerm !== undefined) {
            newQuery.leaseDuration = query.leaseTerm;
        }
        if (query.pets !== undefined) {
            newQuery.pets = query.pets;
        }
        if (query.transit !== undefined) {
            newQuery.transit = query.transit;
        }
        return newQuery;
    }, [query]);

    const addNewQuery = async () => {
        console.log('adding new query');
        const newQuery = constructNewQuery();
        if (newQuery != null && ! await checkQueryExistence(newQuery)) {
            const res = await scrapeQueryApi.createNewQuery(newQuery);
            console.log(res)
            if (res.status === 200) {
                setQueryAdded(true);
                setSuccess(true);
                setFail(false);
            } else {
                setFail(true);
            }
        } else {
            setFail(true);
        }
    }

    useEffect(() => {
        if (queryAdded !== undefined) {
            return;
        }
        const getQueryAdded = async () => {   
            const newQuery = constructNewQuery()
            if (newQuery!= null && !await checkQueryExistence(newQuery)) {
                setQueryAdded(false);
            } else {
                setQueryAdded(true);
            }
        }
        getQueryAdded();
    }, [queryAdded, setQueryAdded, constructNewQuery, checkQueryExistence])

    return (
        <div className={styles.noResultsFoundContainer}>
            <div className={styles.content}>
                <img src={searchImage} alt='search icon'/>
                <h4> No matching listings found </h4>
                {
                    queryAdded === undefined &&
                    <Spinner />
                }
                {
                    queryLimitMet === true &&
                    <p className={globalStyles.small}>We're working on adding more listings to the database.</p>
                }
                {
                    queryAdded === true &&
                    <><p className={globalStyles.small}>The <strong>Dartspot</strong> scraping robot is currently looking for listings that match this query.</p><br/></>
                }
                {
                    queryAdded === false &&
                    <Button className={styles.addQueryButton} onClick={addNewQuery}>Add this query to scraping list</Button>
                }
                {
                    success &&
                    <Alert severity="success" onClose={() => setSuccess(false)}>Query added!</Alert>
                }
                {
                    fail &&
                    <Alert severity="error" onClose={() => setFail(false)}>Request failed - this query may be a duplicate.</Alert>
                }
            </div>
        </div>
    )
}