import React from 'react'
import { Helmet } from 'react-helmet';

// this is wrapper for HELMET

const Meta = ( {title, description, keywords} ) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to the eMarket',
    description: 'We sell the best products for cheap',
    keywords: 'electronics, buy electronics, cheap devices'
}

export default Meta
