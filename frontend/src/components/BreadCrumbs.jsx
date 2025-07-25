// src/components/Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    const { category, subcategory, collectionName } = useParams();

    const capitalize = (s) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const formatCollectionName = (slug) => {
        if (!slug) return '';
        return slug
            .split('-')
            .map(word => capitalize(word))
            .join(' ');
    };

    return (
        <div className="text-sm font-thin text-gray-600 mb-6 px-5">
            <Link to="/" className="hover:underline text-gray-700">Home</Link>
            {' / '}

            {/* Handle specific top-level routes */}
            {location.pathname === "/shop-all" && (
                <span className="font-thin text-gray-900">Shop All</span>
            )}

            {location.pathname === "/best-sellers" && (
                <span className="font-thin text-gray-900">Best Sellers</span>
            )}

            {location.pathname === "/new-arrivals" && (
                <span className="font-thin text-gray-900">New Arrivals</span>
            )}

            {location.pathname === "/sale" && (
                <span className="font-thin text-gray-900">Sale</span>
            )}

            {/* Handle Lookbooks */}
            {location.pathname.startsWith("/lookbooks") && (
                <>
                    <Link to="/lookbooks" className="hover:underline text-gray-700">Lookbooks</Link>
                    {collectionName && ( 
                        <>
                            {' / '}
                            <span className="text-sm font-thin text-gray-900">
                                {formatCollectionName(collectionName)}
                            </span>
                        </>
                    )}
                </>
            )}

            {/* Handle Category/Subcategory routes */}
            {category && !collectionName && !location.pathname.startsWith("/lookbooks") && (
                <>
                    <Link to={`/${category}`} className="hover:underline text-gray-700">
                        {capitalize(category)}
                    </Link>
                    {subcategory && (
                        <>
                            {' / '}
                            <Link to={`/${category}/${subcategory}`} className="hover:underline text-gray-700">
                                {capitalize(subcategory)}
                            </Link>
                        </>
                    )}
                </>
            )}

            {collectionName && !location.pathname.startsWith("/lookbooks") && category !== 'collections' && ( // Added condition to exclude if it's already a lookbook
                <>
                    <Link className="text-gray-700">Collections</Link>
                    {' / '}
                    <span className="text-sm font-thin text-gray-900">
                        {formatCollectionName(collectionName)}
                    </span>
                </>
            )}
        </div>
    );
};

export default Breadcrumbs;