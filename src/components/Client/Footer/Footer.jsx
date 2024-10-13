import React from 'react';
import { Link } from 'react-router-dom';
// import logo from ''; // تأكد من تعديل المسار حسب موقع الشعار الخاص بك

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
                {/* قسم الشعار */}
                {/* <div className="flex items-center mb-4 md:mb-0">
                    <img src={logo} alt="Logo" className="h-12 mr-4" />
                    <span className="text-xl font-bold">Your Company Name</span>
                </div> */}

                {/* قسم خدمة العملاء */}
                <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold mb-3">Customer Service</h3>
                 <ul className="space-y-1">
                 <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
                  <li><Link to="/shipping" className="hover:underline">Shipping</Link></li>
                 <li><Link to="/returns" className="hover:underline">Returns</Link></li>
                 </ul>
                </div>

                {/* قسم الشركة */}
                <div>
                    <h3 className="text-2xl font-semibold mb-3">Company</h3>
                    <ul className="space-y-1">
                        <li><Link to='/about-us' className="hover:underline">About Us</Link ></li>
                        <li><Link to='/careers' className="hover:underline">Careers</Link ></li>
                        <li><Link to='/Affiliates'  className="hover:underline">Affiliates</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-2xlfont-semibold mb-3">Legal</h3>
                    <ul className="space-y-1">
                        <li><Link to ="/Terms & Conditions" className="hover:underline">Terms & Conditions</Link></li>
                        <li><Link to ="/Privacy Policy" className="hover:underline">Privacy Policy</Link></li>
                        <li><Link to ="/Cookies"  className="hover:underline">Cookies</Link></li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-4">
                <p className="text-sm">© {new Date().getFullYear()} Trad Sphere. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
