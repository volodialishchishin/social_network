import {Helmet} from 'react-helmet';
import React from 'react';

export function News() {
    return (
        <div>
            <Helmet>
                <title>News</title>
                <meta name="description" content="News application" />
            </Helmet>
            News
        </div>
    )
}