import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-4 lg:px-[6rem] xl:px-[8rem]">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    {/* Customer Service Section */}
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-semibold mb-3">Customer Service</h3>
                        <ul className="space-y-1">
                            <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
                            <li><Link to="/shipping" className="hover:underline">Shipping</Link></li>
                            <li><Link to="/returns" className="hover:underline">Returns</Link></li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-semibold mb-3">Company</h3>
                        <ul className="space-y-1">
                            <li><Link to='/about-us' className="hover:underline">About Us</Link></li>
                            <li><Link to='/careers' className="hover:underline">Careers</Link></li>
                            <li><Link to='/Affiliates' className="hover:underline">Affiliates</Link></li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-semibold mb-3">Legal</h3>
                        <ul className="space-y-1">
                            <li><Link to="/Terms & Conditions" className="hover:underline">Terms & Conditions</Link></li>
                            <li><Link to="/Privacy Policy" className="hover:underline">Privacy Policy</Link></li>
                            <li><Link to="/Cookies" className="hover:underline">Cookies</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p className="text-sm">© {new Date().getFullYear()} Trad Sphere. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
