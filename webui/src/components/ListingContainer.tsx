import React from "react";
import Listing from "../models/listing";

import UiCard, { UiCardSecondary, UiCardMain } from "../ui/UiCard";
import { Row, Col } from "react-bootstrap";
import styles from '../styles/global-styles.module.scss';
import ProviderLogo from "../ui/ProviderLogo";

import { Button } from '@mui/material';

interface ListingContainerProps {
    listing: Listing;
}

export default function ListingContainer(props: ListingContainerProps): JSX.Element {
    const { listing } = props;

    const parseBedroomsArr = (bedrooms: number[]) => {
        if (bedrooms.length > 1) {
            const min: number = bedrooms[0];
            const max: number = bedrooms[1];

            let studio: boolean = false;
            let noRange: boolean = false;
            if (min === max) {
                noRange = true
            }
            if (min === 0) {
                studio = true
            }

            if (noRange) {
                return `${studio ? 'Studio' : min}`
            }
            return `${studio ? 'Studio' : min}-${max}`
        }
    }

    return (
        <UiCard>
            <UiCardMain>
                <ProviderLogo providerName={listing.providerName} />
                <h5>{listing.name}</h5>
                <p>{listing.location.address}</p>
                {/* <a href={listing.url}>{'Take me there ➔'}</a> */}
                <Button href={listing.url} variant='outlined' size='small'>View ➔</Button>
            </UiCardMain>
            <UiCardSecondary>
                <Row>
                    <Col xs={7}>
                        <p className={styles.label}>Price</p>
                        <h4> ${listing.price}/month </h4>
                    </Col>
                    <Col xs={5}>
                        <p className={styles.label}>Bedrooms</p>
                        <h4> {parseBedroomsArr(listing.bedrooms)} </h4>
                    </Col>
                    <Col xs={6}>
                        <p className={styles.label}>Shortest Lease</p>
                        <h4> {listing.shortestLease} months </h4>
                    </Col>
                </Row>
            </UiCardSecondary>
        </UiCard>
    )
}