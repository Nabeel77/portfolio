import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import globalDesigns from '../../constants/globalDesigns';

const useHeader = () => {
  const router = useRouter();
  const scrollRefs = useRef([]);
  const linkPlaceHoldersArr = ['Home', 'Expertise', 'Work'];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  scrollRefs.current = [...Array(linkPlaceHoldersArr.length).keys()].map(
    (_, i) => scrollRefs.current[i] ?? React.createRef()
  );

  const navigateToHome = (index) => {
    return (
      router.asPath !== '/' &&
      router.push(
        {
          pathname: '/',
          query: { key: index },
        },
        '/'
      )
    );
  };

  const scrollSmoothHandler = (index) => () => {
    console.log(router.asPath);
    isMobileMenuOpen && setIsMobileMenuOpen(false);
    if (router.asPath === '/') {
      scrollRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateToHome(index);
    }
  };

  const generateLinkTags = () => {
    const linkStyles = globalDesigns.linkStyles;
    return linkPlaceHoldersArr.map((item, index) => (
      <a
        key={index}
        className={linkStyles}
        href={`#${item}`}
        onClick={scrollSmoothHandler(index)}
      >
        {item}
      </a>
    ));
  };

  const handleMenuClick = useCallback((e) => {
    e.preventDefault();
    setIsMobileMenuOpen((isMobileMenuOpen) => !isMobileMenuOpen);
  }, []);

  return [isMobileMenuOpen, scrollRefs, generateLinkTags, handleMenuClick];
};

export default useHeader;
