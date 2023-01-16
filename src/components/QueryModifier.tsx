import React, {useContext, useState, useEffect} from "react";

import { QueryContext } from "../QueryContext";
import { Row, Col } from 'react-bootstrap';
import Selector from "./selectors/Selector";
import styles from './component-styles.module.scss';
import ExpandedSearch, { ExpandedSearchStates } from "./ExpandedSearch";
import useScrollDirection from "../ui/ScrollDirection";

interface QueryModifierProps {
    reloadResults: () => void;
}

export default function QueryModifier(props: QueryModifierProps) : JSX.Element {
    const queryContext = useContext(QueryContext);
    const scrollDirection = useScrollDirection();

    const [locSelected, setLocSelected] = useState(false);
    const [bedSelected, setBedSelected] = useState(false);
    const [termSelected, setTermSelected] = useState(false);
    const [pageOffset, setPageOffset] = useState(0);

    useEffect(() => {
        const updateOffset = () => setPageOffset(window.pageYOffset);
        window.addEventListener('scroll', function () {
            updateOffset();
        });
        return () => {
          window.removeEventListener("scroll", updateOffset); // clean up
        }
    }, [pageOffset])

    const {reloadResults} = props;

    if (queryContext === undefined) {
        throw new Error("Must be used within a QueryProvider");
    }

    const { query } = queryContext;

    if (query === undefined) {
        return <></>
    }

    const toggleLoc = () => {
        setLocSelected(!locSelected);
        setBedSelected(false);
        setTermSelected(false);
    }

    const toggleBed = () => {
        setBedSelected(!bedSelected);
        setLocSelected(false);
        setTermSelected(false);
    }

    const toggleTerm = () => {
        setTermSelected(!termSelected);
        setBedSelected(false);
        setLocSelected(false);
    }

    const closeExpand = () => {
        setTermSelected(false);
        setBedSelected(false);
        setLocSelected(false);
        reloadResults();
    }

    const navbarStickStyle = {
        top: '80px',
    }

    const navbarStickAndBackgroundStyle = {
        top: '60px',
        paddingTop: '20px',
        paddingBottom: '10px',
        background: 'rgba(250, 250, 250, 0.75)'
    }

    const backgroundStyle = {
        top: '0px',
        paddingTop: '20px',
        paddingBottom: '10px',
        background: 'rgba(250, 250, 250, 0.75)'
    }

    return (
        <div className={styles.queryModifier} style={scrollDirection !== 'down' && pageOffset < 200 ? navbarStickStyle : pageOffset > 200 && scrollDirection !== 'down' ? navbarStickAndBackgroundStyle : pageOffset > 200 ? backgroundStyle: {}}>
            <div className={styles.inner}>
                <Row>
                    <Col xs={4} style={{textAlign: 'right', justifyContent:'right', padding: 0}}>
                        <Selector selected={locSelected} toggleSelect={toggleLoc} orientation='left' value={query.address} fieldName="Location">
                        </Selector>
                    </Col>
                    <Col xs={4} style={{textAlign: 'center', justifyContent:'center', padding: 0}}>
                        <Selector selected={bedSelected} toggleSelect={toggleBed} orientation='none' value={query.bedrooms === undefined ? 'Any' : query.bedrooms === 0 ? 'Studio' : `${query.bedrooms} bedroom`} fieldName="size">
                        </Selector>
                    </Col>
                    <Col xs={4} style={{textAlign: 'left', justifyContent:'left', padding: 0}}>
                        <Selector selected={termSelected} toggleSelect={toggleTerm} orientation='right' value={!query.leaseTerm ? 'Any' : `${query.leaseTerm} months`} fieldName="min lease (months)">
                        </Selector>
                    </Col>
                </Row>
            </div>
            {
                locSelected ?
                <ExpandedSearch handleClose={closeExpand} searchState={ExpandedSearchStates.location} /> :
                bedSelected ?
                <ExpandedSearch handleClose={closeExpand} searchState={ExpandedSearchStates.size} /> :
                termSelected ?
                <ExpandedSearch handleClose={closeExpand} searchState={ExpandedSearchStates.leaseTerm} /> :
                <></>
            }
        </div>
    )
}