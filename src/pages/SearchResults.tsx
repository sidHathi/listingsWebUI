import { AxiosResponse } from "axios";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { useRequest } from "../services/useRequest";
import parse from "../services/parse";
import Listing from "../models/listing";
import { QueryContext } from "../QueryContext";
import { parseUrlQuery } from "../models/searchQuery";
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
import globalStyles from '../styles/global-styles.module.scss';
import { useViewport } from "../ui/useViewport";
import { uiBreakpoints } from "../ui/breakpoints";
import { useSearchParams } from "react-router-dom";
import NoResultsFound from "../components/NoResultsFound";

export default function SearchResults(): JSX.Element {
    const { listingsApi } = useRequest();
    const queryContext = useContext(QueryContext);
    const { width } = useViewport();

    const [apiResponse, setApiResponse] = useState<AxiosResponse | null>(null);
    const [listings, setListings] = useState<Listing[] | null>(null);
    const [fetchNewListings, setFetchNewListings] = useState(true);
    const [resultsLoading, setResultsLoading] = useState(false);
    const [nextPageLoading, setNextPageLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const { query, setQuery } = queryContext;

    useEffect(() => {
        if (query !== undefined) {
            return;
        }
        
        setQuery(parseUrlQuery(searchParams))
        return;
    }, [searchParams, query, setQuery]);

    const getNewListings = useCallback(() => {
        setFetchNewListings(true);
    }, [setFetchNewListings])

    useEffect(() => {
        if (!fetchNewListings || !queryContext || !queryContext.query) {
            return;
        }

        let queryParams: {[key: string]: any} | undefined = undefined;
        if (queryContext.query.sortBy !== undefined) {
            queryParams = buildQueryParams(queryContext.query)
        }

        const getResponse = async (): Promise<void> => {
            const {query, setCursor} = queryContext;
            if (!query) {
                return;
            }
            const response = await listingsApi.searchListings(query, queryParams);
            console.log(response);
            setApiResponse(response);
            console.log(getCursor(response))
            setCursor(getCursor(response) || undefined);
            setListings(parse<Listing[]>(response));
            setResultsLoading(false);
        }

        setResultsLoading(true);
        getResponse();
        setFetchNewListings(false);
    }, [fetchNewListings, apiResponse, listingsApi, queryContext]);

    const fetchNextPage = useCallback(() => {
        if (!queryContext || !queryContext.query || !queryContext.query.cursor) {
            return;
        }

        const { query, setCursor } = queryContext;
        const queryNextPage = async () => {
            const queryParams = buildQueryParams(query);
            const nextResponse = await listingsApi.searchListings(query, queryParams);
            console.log(getCursor(nextResponse))
            setCursor(getCursor(nextResponse) || undefined);
            const nextListings = parse<Listing[]>(nextResponse);
            if (nextListings != null && listings != null) {
                setListings(listings.concat(nextListings));
            }
            setNextPageLoading(false);
        }

        setNextPageLoading(true);
        queryNextPage();
    }, [queryContext, listingsApi, listings]);

    if (!query || !listings) {
        return (
            <div className={globalStyles.spinnerContainer} style={{paddingTop: '40vh'}}>
                <Spinner animation="border" role="status" style={{
                    margin: 'auto',
                    display: 'block',
                    width: '3.6em',
                    height: '3.6em',
                }}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div>
            {apiResponse && listings != null &&
                <>
                    <CityBanner city={query.address} />
                    <QueryModifier reloadResults={getNewListings}/>
                    {(listings.length > 0 || query.price || query.pets || query.transit || query.providerNames) &&
                        <FilterMenu reloadResults={getNewListings}/>
                    }
                    { resultsLoading && 
                        <Spinner animation="border" role="status" style={{
                            margin: '80px auto',
                            display: 'block',
                            width: '3em',
                            height: '3em',
                        }}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                    <Container fluid={width < uiBreakpoints.xl}>
                        <Row>
                            {listings.map((listing: Listing) => {
                                if (width <= uiBreakpoints.small) {
                                    return (
                                        <Col xs={12} key={listing._id}>
                                            <ListingContainer listing={listing} />
                                        </Col>
                                    )
                                } else if (width <= uiBreakpoints.large) {
                                    return (
                                        <Col sm={6} key={listing._id}>
                                            <ListingContainer listing={listing} />
                                        </Col>
                                    )
                                } else {
                                    return (
                                        <Col md={4} key={listing._id}>
                                            <ListingContainer listing={listing} />
                                        </Col>
                                    )
                                }
                            }
                            )}

                            {
                            listings.length === 0 &&
                            <NoResultsFound />
                            }
                        </Row>
                    </Container>
                    {nextPageLoading &&
                        <Spinner animation="border" role="status" style={{
                            margin: '80px auto',
                            display: 'block',
                            width: '2em',
                            height: '2em',
                        }}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                    {queryContext.query && queryContext.query.cursor &&  !nextPageLoading &&
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