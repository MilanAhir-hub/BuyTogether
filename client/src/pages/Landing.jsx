import NavbarSection from '../sections/landing/NavbarSection';
import HeroSection from '../sections/landing/HeroSection';
import TrustedSection from '../sections/landing/TrustedSection';
import HowItWorksSection from '../sections/landing/HowItWorksSection';
import FeaturedPropertiesSection from '../sections/landing/FeaturedPropertiesSection';
import BenefitsSection from '../sections/landing/BenefitsSection';
import TestimonialsSection from '../sections/landing/TestimonialsSection';
import CTASection from '../sections/landing/CTASection';
import FooterSection from '../sections/landing/FooterSection';

const Landing = () => {
    return (
        <div className="bg-white min-h-screen font-sans text-slate-900">
            <NavbarSection />
            <HeroSection />
            <TrustedSection />
            <HowItWorksSection />
            <FeaturedPropertiesSection />
            <BenefitsSection />
            <TestimonialsSection />
            <CTASection />
            <FooterSection />
        </div>
    );
};

export default Landing;
