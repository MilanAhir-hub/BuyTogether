import React, { useState, useEffect } from "react";
import { ArrowUp01Icon } from "hugeicons-react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled more than 300px
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set scroll event listener
    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-8 right-8 z-60">
            <button
                type="button"
                onClick={scrollToTop}
                className={`
                    w-14 h-14 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 
                    flex items-center justify-center transition-all duration-500 transform
                    hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/30
                    ${isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-50 pointer-events-none"}
                `}
                aria-label="Scroll to top"
            >
                <ArrowUp01Icon size={28} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default ScrollToTop;
