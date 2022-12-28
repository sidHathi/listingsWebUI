import React, { PropsWithChildren } from 'react';
import Container from 'react-bootstrap/Container';
import styles from './ui-styles.module.scss';

interface UiCardProps {
    children: React.ReactNode
    style?: {[key :string]: string}
}

export default function UiCard(props: PropsWithChildren<UiCardProps>) : JSX.Element {
    const {children, style} = props;

    return (
        <div className={styles.cardOuter} style={!style? {}: style}>
            {children}
        </div>
    )
}

export function UiCardMain(props: PropsWithChildren<UiCardProps>) : JSX.Element {
    const {children, style} = props;

    return (
        <div className={styles.cardMain} style={!style? {}: style}>
            <Container>
                {children}
            </Container>
        </div>
    )
}

export function UiCardSecondary(props: PropsWithChildren<UiCardProps>) : JSX.Element {
    const {children, style} = props;

    return (
        <div className={styles.cardSecondary} style={!style? {}: style}>
            <Container>
                {children}
            </Container>
        </div>
    )
}