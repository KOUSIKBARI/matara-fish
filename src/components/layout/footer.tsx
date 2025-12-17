import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-river-blue text-white pt-12 pb-6">
            <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                {/* Brand */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-bold font-bengali">মা তারা ফিশ সেন্টার</h3>
                        <p className="text-sm text-gray-300">Fresh from River to Your Kitchen.</p>
                    </div>
                    <p className="text-sm text-gray-400">
                        Serving Haldia with trust and quality for over 22 years. We bring the freshest catch daily.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-semibold text-lg mb-4 text-mustard-gold">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link href="/shop" className="hover:text-white transition-colors">Buy Fish</Link></li>
                        <li><Link href="/bulk-order" className="hover:text-white transition-colors">Available Areas</Link></li>
                        <li><Link href="/track" className="hover:text-white transition-colors">Track Order</Link></li>
                        <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-semibold text-lg mb-4 text-mustard-gold">Contact Us</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-mustard-gold shrink-0" />
                            <span>Durgachak Market, Haldia,<br />West Bengal - 721602</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-mustard-gold shrink-0" />
                            <span>+91 98765 43210</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-mustard-gold shrink-0" />
                            <span>contact@matarafish.com</span>
                        </li>
                    </ul>
                </div>

                {/* Hours */}
                <div>
                    <h4 className="font-semibold text-lg mb-4 text-mustard-gold">Market Hours</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Daily Morning: 6:00 AM - 1:00 PM</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Evening: 5:00 PM - 9:00 PM</span>
                        </li>
                        <li className="text-xs text-gray-400 mt-2">
                            *Local delivery starts from 8:00 AM
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container-custom pt-8 border-t border-white/10 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Ma Tara Fish Center. All rights reserved.</p>
                <p className="mt-1">Designed with ❤️ for Haldia.</p>
            </div>
        </footer>
    )
}
