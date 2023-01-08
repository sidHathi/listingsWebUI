import React, {useState, useEffect} from "react";
import { useCallback } from "react";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import logoWithText from '../assets/logo-03.png';
import logoWithTextDark from '../assets/logoDark-07.png';
import logoWithTextLight from '../assets/logo-03.png';
import globalStyles from '../styles/global-styles.module.scss';
import useScrollDirection from "./ScrollDirection";
  

export default function Nav() : JSX.Element {
    const { pathname } = useLocation();

    const scrollDirection = useScrollDirection();
    const [pageOffset, setPageOffset] = useState(0);
    const [navStyleOverride, setNavStylesOverride] = useState<{[key: string]: string}>({});

    useEffect(() => {
        const updateOffset = () => setPageOffset(window.pageYOffset);
        window.addEventListener('scroll', function () {
            updateOffset();
        });
        return () => {
          window.removeEventListener("scroll", updateOffset); // clean up
        }
    }, [pageOffset])

    useEffect(() => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition > 200) {
            setNavStylesOverride({ backgroundColor: 'rgba(255, 255, 255, 1'});
            return;
        }
        setNavStylesOverride({ backgroundColor: 'rgba(0, 0, 0, 0'});
    }, [pageOffset]);

    const getNavImage = () => {
        if (pageOffset > 200) {
            return logoWithTextLight;
        }
        return logoWithTextDark;
    }

    return (
        <>
        {
            pathname === '/' ?
            <Navbar fixed='top' className={globalStyles.lightNav}>
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logoWithText} alt={'branding'} height={48} />
                    </Navbar.Brand>
                </Container>
            </Navbar> : 
            <Navbar fixed='top' className={globalStyles.darkNavBG} style={{...navStyleOverride, top: scrollDirection !== 'down' ? '0' : '-80px'}}>
                <Container>
                    <Navbar.Brand href="/">
                        
                        <img src={getNavImage()} alt={'branding'} height={48} />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        }
        </>
    );
}