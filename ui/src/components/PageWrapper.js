import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

function PageWrapper({children}) {
    return (
        <>
        <Navigation />
            {children}
        <Footer />
        </>
    )
}

export default PageWrapper;