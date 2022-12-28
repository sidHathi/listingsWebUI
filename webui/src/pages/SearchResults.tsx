import { AxiosResponse } from "axios";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { useRequest } from "../services/useRequest";
import parse from "../services/parse";
import Listing from "../models/listing";
import { QueryContext } from "../QueryContext";
import SearchQuery from "../models/searchQuery";
import ListingContainer from "../components/ListingContainer";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Col } from "react-bootstrap";
import CityBanner from "../ui/CityBanner";
import QueryModifier from "../components/QueryModifier";
import { Spinner } from "react-bootstrap";
import FilterMenu from "../components/filterMenu/FilterMenu";
import buildQueryParams from "../services/queryParamUtils";
import getCursor from "../services/cursor";
import { Button } from "@mui/material";
import styles from './page-styles.module.scss';

export default function SearchResults(): JSX.Element {
    const { listingsApi } = useRequest();
    const queryContext = useContext(QueryContext);

    const [apiResponse, setApiResponse] = useState<AxiosResponse | null>(null);
    const [listings, setListings] = useState<Listing[] | null>(null);
    const [fetchNewListings, setFetchNewListings] = useState(true);

    useEffect(() => {
        if (!queryContext || queryContext.query !== undefined) {
            return;
        }
        setQuery({
            location: {
                lat: 42,
                long: -72,
                radius: 500,
            },
            address: 'Boston, MA',
            bedrooms: 1,
            leaseTerm: 12,
            price: [0, 3000],
            sortBy: 'relevance'
        });
    });

    useEffect(() => {
        if (!fetchNewListings || !queryContext || !queryContext.query) {
            return;
        }

        let queryParams: {[key: string]: any} | undefined = undefined;
        if (queryContext.query.sortBy !== undefined) {
            queryParams = buildQueryParams(queryContext.query)
        }

        const getResponse = async (): Promise<void> => {
            const {query} = queryContext;
            if (!query) {
                return;
            }
            const response = await listingsApi.searchListings(query, queryParams);
            setApiResponse(response);
            setListings(parse<Listing[]>(response));
        }

        getResponse();
        setFetchNewListings(false);
    }, [fetchNewListings, apiResponse, listingsApi, queryContext]);

    const getNewListings = useCallback(() => {
        setFetchNewListings(true);
    }, [setFetchNewListings])

    const setNewContext = useCallback((newContext: SearchQuery) => {
        if (!apiResponse || !queryContext || !queryContext.setQuery) {
            return;
        }
        queryContext.setQuery(newContext);
        queryContext.setCursor(getCursor(apiResponse) || undefined);
        getNewListings();
    }, [queryContext, getNewListings, apiResponse]);

    const fetchNextPage = useCallback(() => {
        if (!queryContext || !queryContext.query || !queryContext.query.cursor) {
            return;
        }

        const query = queryContext.query;
        const queryNextPage = async () => {
            const queryParams = buildQueryParams(query);
            const nextResponse = await listingsApi.searchListings(query, queryParams);
            const nextListings = parse<Listing[]>(nextResponse);
            if (nextListings != null && listings != null) {
                setListings(listings.concat(nextListings));
            }
        }

        queryNextPage();
    }, [queryContext, listingsApi, listings]);

    const handleContextSwitch = () => {
        setNewContext({
            providerNames: ['facebook'],
            location: {
                lat: 47,
                long: -122,
                radius: 500,
            },
            address: 'Seattle, WA',
            bedrooms: 1,
            leaseTerm: 12,
        });
    }

    const { query, setQuery } = queryContext;

    if (!query || !listings) {
        return(
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    return (
        <div>
            {apiResponse && listings != null &&
                <>
                    <CityBanner city={query.address} />
                    <QueryModifier reloadResults={getNewListings}/>
                    <FilterMenu reloadResults={getNewListings}/>
                    <Container>
                        <Row>
                            {listings.map((listing: Listing) => 
                            <Col lg={4}>
                                <ListingContainer listing={listing} />
                            </Col>
                            )}
                        </Row>
                    </Container>
                    {queryContext.query && queryContext.query.cursor &&
                    <Button className={styles.loadMoreButton} onClick={fetchNextPage}>Load More</Button>
                    }
                    <div className={styles.footer} />
                </>
            }

            {/* {query &&
                <h1> {JSON.stringify(query)}</h1>
            }

            <button onClick={getNewListings}>Update Listings</button>
            <button onClick={handleContextSwitch}>Switch Query Context</button> */}
        </div>
    )
}