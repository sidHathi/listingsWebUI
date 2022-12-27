import React, { PropsWithChildren } from 'react';
import Container from 'react-bootstrap/Container';
import styles from './ui-styles.module.scss';

interface UiCardProps {
    children: React.ReactNode
}

export default function UiCard(props: PropsWithChildren<UiCardProps>) : JSX.Element {
    const {children} = props;

    return (
        <div className={styles.cardOuter}>
            {children}
        </div>
    )
}

export function UiCardMain(props: PropsWithChildren<UiCardProps>) : JSX.Element {
    const {children} = props;

    return (
        <div className={styles.cardMain}>
            <Container>
                {children}
            </Container>
        </div>
    )
}

export function UiCardSecondary(props: PropsWithChildren<UiCardProps>) : JSX.Element {
    const {children} = props;

    return (
        <div className={styles.cardSecondary}>
            <Container>
                {children}
            </Container>
        </div>
    )
}