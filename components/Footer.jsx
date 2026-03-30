import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#12066a] text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Image
              src="/logo.webp" // Apka logo path
              alt="BizGrow Holdings"
              width={150}
              height={50}
              className="brightness-0 invert" // Logo ko white karne ke liye agar wo dark hai
            />
            <p className="text-blue-100/70 text-sm leading-relaxed">
              Empowering businesses through strategic consultancy,
              industry-standard certifications, and compliance excellence. Your
              growth is our mission.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: <FaFacebookF />,
                  href: "https://www.facebook.com/bizgrowholdings",
                },
                {
                  icon: <FaInstagram />,
                  href: "https://www.instagram.com/bizgrowholdingltd/",
                },
                {
                  icon: <FaLinkedinIn />,
                  href: "https://www.linkedin.com/company/bizgrowholdings/",
                },
                {
                  icon: <FaYoutube />,
                  href: "https://www.youtube.com/@bizgrowholdings",
                },
                {
                  icon: <FaTiktok />,
                  href: "https://www.tiktok.com/@bizgrowholdings?lang=en",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank" // 👈 New tab ke liye
                  rel="noopener noreferrer" // 👈 Security ke liye
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#997819] hover:scale-110 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[#997819] font-black uppercase tracking-widest text-sm mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {[
                "Home",
                "About Us",
                "Our Mission",
                "Our Services",
                "Blogs",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-blue-100/70 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#997819]" />{" "}
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Services / Pages */}
          <div>
            <h3 className="text-[#997819] font-black uppercase tracking-widest text-sm mb-8">
              Certifications & Solutions
            </h3>
            <ul className="space-y-4 text-sm">
              {[
                {
                  name: "UK’s Private Security Directory",
                  link: "/uks-private-security-directory",
                },
                {
                  name: "Compliance Consultancies",
                  link: "/compliance-consultancies",
                },
                {
                  name: "Private Security Startup",
                  link: "/private-security-startup",
                },
                { name: "QMS Software", link: "/qms-software" },
                { name: "Internal Audit", link: "/internal-audit" },
                { name: "Discount Offers", link: "/discount-offers" },
                { name: "Customer Services", link: "/customer-services" },
                {
                  name: "Certificate Verification",
                  link: "/certificate-verification-validate-bizgrow-certification",
                },
                {
                  name: "Corporate Training and Coaching",
                  link: "/corporate-training-and-coaching",
                },
                {
                  name: "Testimonials & Reviews",
                  link: "/testimonials-reviews",
                },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="text-blue-100/70 hover:text-white transition-colors cursor-pointer block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-[#997819] font-black uppercase tracking-widest text-sm mb-8">
              Get In Touch
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-[#997819]/20 p-2 rounded-lg text-[#997819]">
                  <FaPhoneAlt size={14} />
                </div>
                <div>
                  <p className="text-xs text-[#997819] font-bold uppercase">
                    Call Us
                  </p>
                  <p className="text-sm">07898 205035 / 02080904209</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-[#997819]/20 p-2 rounded-lg text-[#997819]">
                  <FaEnvelope size={14} />
                </div>
                <div>
                  <p className="text-xs text-[#997819] font-bold uppercase">
                    Email
                  </p>
                  <p className="text-sm">info@bizgrow-holdings.com</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="mt-1 bg-[#997819]/20 p-2 rounded-lg text-[#997819]">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <p className="text-xs text-[#997819] font-bold uppercase">
                    Location
                  </p>
                  <p className="text-sm italic">
                    CEME Campus, Marsh Way, RM13 8EU
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-blue-100/50 font-medium">
          <p>© {currentYear} BizGrow Holdings. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
