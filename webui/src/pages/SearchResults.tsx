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
            price: [0, 3000]
        });
    });

    useEffect(() => {
        if (!fetchNewListings || !queryContext || !queryContext.query) {
            return;
        }

        const getResponse = async (): Promise<void> => {
            const {query} = queryContext;
            if (!query) {
                return;
            }
            const response = await listingsApi.searchListings(query);
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
        if (!queryContext || !queryContext.setQuery) {
            return;
        }
        queryContext.setQuery(newContext);
        getNewListings();
    }, [queryContext, getNewListings]);

    const handleContextSwitch = () => {
        setNewContext({
            providerName: 'facebook',
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
                    <FilterMenu />
                    <Container>
                        <Row>
                            {listings.map((listing: Listing) => 
                            <Col lg={4}>
                                <ListingContainer listing={listing} />
                            </Col>
                            )}
                        </Row>
                    </Container>
                </>
            }

            {query &&
                <h1> {JSON.stringify(query)}</h1>
            }

            <button onClick={getNewListings}>Update Listings</button>
            <button onClick={handleContextSwitch}>Switch Query Context</button>
        </div>
    )
}