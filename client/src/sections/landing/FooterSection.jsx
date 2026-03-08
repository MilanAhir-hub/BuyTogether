import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
    return (
        <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    
                    {/* Column 1: Logo & Description */}
                    <div className="md:col-span-12 lg:col-span-5">
                        <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight inline-block mb-6">
                            TogetherBuying
                        </Link>
                        <p className="text-slate-600 leading-relaxed max-w-md">
                            Revolutionizing real estate by bringing homebuyers together to unlock exclusive builder discounts and transparent group purchasing power.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="md:col-span-6 lg:col-span-3">
                        <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Home</a></li>
                            <li><a href="#properties" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Properties</a></li>
                            <li><a href="#how-it-works" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">How It Works</a></li>
                            <li><a href="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">About</a></li>
                            <li><a href="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="md:col-span-6 lg:col-span-4">
                        <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Mail className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                                <span className="text-slate-600 font-medium">hello@togetherbuying.in</span>
                            </li>
                            <li className="flex items-start">
                                <Phone className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                                <span className="text-slate-600 font-medium">+91 98765 43210</span>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                                <span className="text-slate-600 font-medium leading-relaxed">
                                    Innov8 Coworking Space,<br />
                                    Koramangala, Bangalore 560034
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 font-medium text-sm">
                        &copy; 2026 TogetherBuying. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                            <span className="sr-only">Facebook</span>
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </a>
                        <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                            <span className="sr-only">Twitter</span>
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </a>
                        <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                            <span className="sr-only">LinkedIn</span>
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
