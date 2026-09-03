'use client';

import Link from 'next/link';
import {
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Mail,
  Clock,
  MapPin,
  Heart,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#E8E0D5] bg-[#F4EFE6] text-stone-700 font-sans">
      {/* Top Category Catalog Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-[#E3D9CC]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Column 1: Electronics on EMI */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-stone-900 tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0F6D66]" />
              Electronics on EMI
            </h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Smart Phones on EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Headphones & Earbuds on EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Smart Watches on EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Speakers & Soundbars on EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Laptops & Tablets on EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  DSLR & Mirrorless Cameras on EMI
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Home & Appliances on EMI */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-stone-900 tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF7A45]" />
              Home & Appliances on EMI
            </h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Televisions & OLED Displays on EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Refrigerators & Freezers on EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Washing Machines & Dryers on EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Air Conditioners & Coolers on EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Microwave Ovens & Chimneys on EMI
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Lifestyle & Fitness */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-stone-900 tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3E8E5A]" />
              Health & Fitness on EMI
            </h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Treadmills & Fitness Equipment on EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Electric Cycles & Gear Bikes on EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Nutritional Supplements on EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Personal Care & Grooming Kits on EMI
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Financial Solutions */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-stone-900 tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0F6D66]" />
              EasyEMI Solutions
            </h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors font-semibold text-[#0F6D66]">
                  Mutual Fund SIP Backed EMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors font-semibold text-[#3E8E5A]">
                  0% Interest EMI Tiers
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Instant Digital Credit Approval
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  No Credit Card Required
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* EasyEMI Business Partner Callout Bar */}
        <div className="mt-8 pt-6 border-t border-[#E3D9CC] flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#FF7A45] hover:text-[#E86733] transition-colors group"
          >
            <span>EasyEMI for Business & Merchants</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center gap-3 text-xs font-semibold text-stone-600 bg-white/70 px-4 py-2 rounded-xl border border-[#E8E0D5]">
            <TrendingUp className="w-4 h-4 text-[#0F6D66]" />
            <span>Powering 10,000+ Merchant Outlets Across India</span>
          </div>
        </div>
      </div>

      {/* Main Footer Info & Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          {/* Brand Info & Address Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0F6D66] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                E
              </div>
              <span className="font-extrabold text-xl text-[#0F6D66] tracking-tight">
                Easy<span className="text-[#FF7A45]">EMI</span>
              </span>
            </div>

            <p className="text-stone-600 leading-relaxed font-medium">
              EasyEMI Technologies Private Limited (CIN: U65929MH2026PTC123456). Regulated digital lending platform enabling mutual fund SIP backed installment solutions for consumer electronics and lifestyle purchases.
            </p>

            <div className="space-y-2 text-stone-600 font-medium pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0F6D66] shrink-0 mt-0.5" />
                <span>Level 8, Financial Tower, Bandra-Kurla Complex, Mumbai — 400051</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#0F6D66] shrink-0" />
                <span>1800-267-3279 (Mon-Sat, 9AM to 7PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0F6D66] shrink-0" />
                <span>support@easyemi.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-extrabold text-sm text-stone-900 tracking-tight">
              Quick Links
            </h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  About EasyEMI
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  How SIP EMI Works
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Careers <span className="bg-[#FF7A45] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold ml-1">We&apos;re Hiring</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Merchant Partnership
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal Column (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-sm text-stone-900 tracking-tight">
              Support & Regulatory
            </h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Return & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Privacy & Data Security Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  Fair Practice Code & Grievance Redressal
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#0F6D66] transition-colors">
                  RBI Regulated Lending Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* App Badges & Badges Column (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-extrabold text-sm text-stone-900 tracking-tight">
              Download EasyEMI App Today
            </h4>
            <p className="text-stone-500 font-medium text-[11px]">
              Manage your installments, track cashback earnings, and invest seamlessly from mobile.
            </p>

            {/* Store Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5">
              <a
                href="#download"
                className="flex items-center gap-3 bg-stone-900 text-white px-4 py-2.5 rounded-xl hover:bg-stone-800 transition-colors shadow-sm"
              >
                <div className="text-xl">▶</div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">
                    Get it on
                  </div>
                  <div className="text-xs font-extrabold tracking-tight">
                    Google Play
                  </div>
                </div>
              </a>

              <a
                href="#download"
                className="flex items-center gap-3 bg-stone-900 text-white px-4 py-2.5 rounded-xl hover:bg-stone-800 transition-colors shadow-sm"
              >
                <div className="text-xl"></div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">
                    Download on the
                  </div>
                  <div className="text-xs font-extrabold tracking-tight">
                    App Store
                  </div>
                </div>
              </a>
            </div>

            {/* Made in India Badge */}
            <div className="pt-2 flex items-center gap-2 text-stone-600 font-bold text-xs">
              <span className="text-lg">🇮🇳</span>
              <span>Proudly Made in India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer Bar */}
      <div className="bg-[#E9E3D8] border-t border-[#DECFC0] py-4 text-stone-500 text-[11px] font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-2 text-center sm:text-left">
          <p>© 2026 EasyEMI Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center justify-center gap-1 text-stone-600 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0F6D66]" />
            <span>100% Encrypted & RBI Compliant Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
