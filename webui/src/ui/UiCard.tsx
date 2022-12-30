import { String } from 'lodash';
import React, { PropsWithChildren } from 'react';
import Container from 'react-bootstrap/Container';
import styles from './ui-styles.module.scss';

interface UiCardProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

export default function UiCard(props: PropsWithChildren<UiCardProps>) : JSX.Element {
    const {children, style, className} = props;

    return (
        <div className={className || styles.cardOuter} style={!style? {}: style}>
            {children}
        </div>
    )
}

export function UiCardMain(props: PropsWithChildren<UiCardProps>) : JSX.Element {
    const {children, style, className} = props;

    return (
        <div className={className || styles.cardMain} style={!style? {}: style}>
            <Container>
                {children}
            </Container>
        </div>
    )
}

export function UiCardSecondary(props: PropsWithChildren<UiCardProps>) : JSX.Element {
    const {children, style, className} = props;

    return (
        <div className={className || styles.cardSecondary} style={!style? {}: style}>
            <Container>
                {children}
            </Container>
        </div>
    )
}