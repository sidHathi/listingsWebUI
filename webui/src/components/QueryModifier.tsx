import React, {useContext, useState} from "react";

import { QueryContext } from "../QueryContext";
import { Row, Col } from 'react-bootstrap';
import Selector from "./selectors/Selector";
import styles from './component-styles.module.scss';
import ExpandedSearch, { ExpandedSearchStates } from "./ExpandedSearch";

interface QueryModifierProps {
    reloadResults: () => void;
}

export default function QueryModifier(props: QueryModifierProps) : JSX.Element {
    const queryContext = useContext(QueryContext);
    const [locSelected, setLocSelected] = useState(false);
    const [bedSelected, setBedSelected] = useState(false);
    const [termSelected, setTermSelected] = useState(false);

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

    return (
        <div className={styles.queryModifier}>
            <div className={styles.inner}>
                <Row>
                    <Col xs={4} style={{textAlign: 'right', justifyContent:'right'}}>
                        <Selector selected={locSelected} toggleSelect={toggleLoc} orientation='left' value={query.address} fieldName="Location">
                        </Selector>
                    </Col>
                    <Col xs={4} style={{textAlign: 'center', justifyContent:'center'}}>
                        <Selector selected={bedSelected} toggleSelect={toggleBed} orientation='none' value={`${query.bedrooms} bedroom`} fieldName="size">
                        </Selector>
                    </Col>
                    <Col xs={4} style={{textAlign: 'left', justifyContent:'left'}}>
                        <Selector selected={termSelected} toggleSelect={toggleTerm} orientation='right' value={`${query.leaseTerm} months`} fieldName="min lease">
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