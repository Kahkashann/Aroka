import React, { useState } from 'react';
import HotspotContentDesign from './HotspotContentDesign'; 

const InteractiveImageSection = ({ hotspotData }) => {
    const [activeHotspotId, setActiveHotspotId] = useState(null);

    const handleHotspotClick = (id) => {
        setActiveHotspotId(activeHotspotId === id ? null : id);
    };

    return (
        <div className="relative w-full h-auto max-h-[80vh] overflow-hidden flex justify-center items-center">
            <img
                src='/desktop-2.png'
                alt=""
                className="w-full h-full object-cover hidden lg:block"
            />
            <img
                src='/mob-2.png'
                alt=""
                className="w-full h-full object-cover lg:hidden"
            />

            {hotspotData.map(hotspot => (
                <div
                    key={hotspot.id}
                    className="absolute z-10"
                    style={{ top: hotspot.top, left: hotspot.left }}
                    onClick={() => handleHotspotClick(hotspot.id)}
                >
                    <button className="relative w-5 h-5 bg-white border border-gray-400 rounded-full flex items-center justify-center cursor-pointer shadow-sm">
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white border border-gray-400"></span>
                    </button>

                    {activeHotspotId === hotspot.id && (
                        <div className="absolute transform -translate-x-1/2 mt-6">
                            <HotspotContentDesign product={hotspot.product} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default InteractiveImageSection;