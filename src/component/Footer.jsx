import { ArrowUp, Mail } from "lucide-react";
import { BsTwitter } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";
import { SiGithub } from "react-icons/si";


const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className=" text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">taskTeam</span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
              Plan, collaborate, and deliver projects faster with a powerful
              workspace built for modern teams.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-indigo-600 hover:text-white"
              >
                <SiGithub size={18} />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-indigo-600 hover:text-white"
              >
                <LiaLinkedin size={18} />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-indigo-600 hover:text-white"
              >
                <BsTwitter size={18} />
              </a>

              <a
                href="mailto:hello@taskflow.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-indigo-600 hover:text-white"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Product
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="#features" className="transition hover:text-white">
                  Features
                </a>
              </li>

              <li>
                <a href="#pricing" className="transition hover:text-white">
                  Pricing
                </a>
              </li>

              <li>
                <a href="#how-it-works" className="transition hover:text-white">
                  How It Works
                </a>
              </li>

              <li>
                <a href="#faq" className="transition hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="#about" className="transition hover:text-white">
                  About
                </a>
              </li>

              <li>
                <a href="#contact" className="transition hover:text-white">
                  Contact
                </a>
              </li>

              <li>
                <a href="#careers" className="transition hover:text-white">
                  Careers
                </a>
              </li>

              <li>
                <a href="#blog" className="transition hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="/privacy" className="transition hover:text-white">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="/terms" className="transition hover:text-white">
                  Terms of Service
                </a>
              </li>

              <li>
                <a href="/cookies" className="transition hover:text-white">
                  Cookie Policy
                </a>
              </li>

              <li>
                <a href="/security" className="transition hover:text-white">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-5 border-t border-slate-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-500">
              Built for productive teams.
            </p>

            <button
              type="button"
              onClick={handleScrollTop}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-indigo-600 hover:text-white"
            >
              <ArrowUp size={17} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
