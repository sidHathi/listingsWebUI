import React, {useState, useEffect} from "react";
import { useCallback } from "react";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import logoWithText from '../assets/logo-03.png';
import logoWithTextDark from '../assets/logoDark-07.png';
import globalStyles from '../styles/global-styles.module.scss';

function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<string | null>(null);
  
    useEffect(() => {
      let lastScrollY = window.pageYOffset;
  
      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        const direction = scrollY > lastScrollY ? "down" : "up";
        if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
            setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener("scroll", updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener("scroll", updateScrollDirection); // clean up
      }
    }, [scrollDirection]);
  
    return scrollDirection;
  };
  

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
            setNavStylesOverride({ backgroundColor: 'rgba(0, 0, 0, 0.9'});
            return;
        }
        setNavStylesOverride({ backgroundColor: 'rgba(0, 0, 0, 0'});
    }, [pageOffset]);

    return (
        <>
        {
            pathname === '/' ?
            <Navbar sticky='top' bg="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logoWithText} alt={'branding'} height={48} />
                    </Navbar.Brand>
                </Container>
            </Navbar> : 
            <Navbar fixed='top' className={globalStyles.darkNavBG} style={{...navStyleOverride, top: scrollDirection !== 'down' ? '0' : '-80px'}}>
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logoWithTextDark} alt={'branding'} height={48} />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        }
        </>
    );
}