import React from 'react';

const AboutUsStorySection = () => {
    return (
        <section className="w-full bg-[#EDE7E2]">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full lg:w-[60%] flex flex-col justify-center px-5 py-10 lg:px-30 lg:py-40">
                    <h2 className="text-lg md:text-2xl font-light mb-4 text-gray-800 leading-tight">
                        The Hands That Shape Our Story
                    </h2>
                    <p className="text-sm font-light text-gray-700 leading-relaxed mb-1">
                        Every thread, every fold, every stitch in an Āroka piece carries the touch of skilled artisans who honor time-honored techniques. We believe in fashion that is more than just clothing; it is a narrative of artistry, inclusivity, and conscious creation.
                    </p>
                    <p className="text-sm font-light text-gray-700 leading-relaxed mb-1">
                        Our fine hand ruching, delicate smocking, and expert moulage draping are labors of love, meticulously crafted, never rushed. These techniques require patience, skill, and an intimate understanding of fabric, resulting in silhouettes that celebrate individuality and movement.
                    </p>
                    <p className="text-sm font-light text-gray-700 leading-relaxed">
                        In a world that moves fast, these pieces hold still. They honor the beauty of imperfection, the rhythm of human hands, and the dignity of work done with intention. This is not just clothing. It is craft. It is connection. It is a story, woven, stitched, and draped with purpose.
                    </p>
                </div>

                <div className="w-full lg:w-[40%] flex md:justify-end justify-center">
                    <img
                        src="/desktop-3.jpg" 
                        alt="Artisan meticulously working on a garment"
                        className=" h-[82vh]"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutUsStorySection;