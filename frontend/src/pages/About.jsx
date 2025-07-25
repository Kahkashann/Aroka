// pages/AboutUsPage.jsx
import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import QuoteSection from '../components/QuoteSection';
import VisionSection from '../components/VisionSection';
import JourneySection from '../components/JourneySection';
import CTASection from '../components/CTASection';

const About = () => {
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return (
        <div className="w-full min-h-screen">
            <HeroSection />
            <StorySection />
            <QuoteSection />
            <VisionSection />
            <JourneySection />
            <CTASection />
        </div>
    );
};

export default About;