import { Link } from "react-router-dom";
import {SiInstagram,  SiX} from "react-icons/si";

import {ChefHat} from "lucide-react"

const exploreLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function Footer() {
  return (
    <footer className="bg-green text-soft-white">
      <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-6 md:px-8 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/" className="font-display  flex items-center text-3xl font-semibold tracking-[-0.03em] focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-green">
              Alte<span className="text-yellow"><span ><ChefHat className="text-yellow"/></span></span>
            </Link>

            <p className="mt-4 text-sm font-sans leading-6 text-soft-white/65"> Good food, familiar flavours and a table worth coming back to </p>

            <div className="mt-6 flex items-center gap-3">
              <a href="https://instagram.com/s_haron1009" aria-label="Visit Author on Instagram" target="_blank" rel="noreferrer" className="text-soft-white/70 transition-colors hover:text-yellow" >
                <SiInstagram size={20} />
              </a>

              <a href="https://x.com/Fifi_dev"   aria-label="Visit Author on X" target="_blank"className="flex h-9 w-9 items-center justify-center rounded-full border border-soft-white/15 text-soft-white/70 transition-colors hover:border-yellow hover:text-yellow focus:outline-none focus:ring-2 focus:ring-yellow" >
                <SiX size={20} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow">Explore </h2>

            <nav className="mt-4 flex flex-col gap-3" aria-label="Footer navigation">
              {exploreLinks.map((link) => (
                <Link key={link.path} to={link.path} end={link.path === "/"} className="w-fit text-sm text-soft-white/65 transition-colors hover:text-soft-white focus:outline-none focus:ring-2 focus:ring-yellow">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Visit */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow"> Visit us</h2>

            <div className="mt-4 space-y-3 text-sm leading-6 text-soft-white/65">
              <p> Oluyole Challenge
                <br />
                Ibadan, Nigeria
              </p>

              <p>
                Mon – Sun
                <br />
                10:00 AM – 10:00 PM
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow"> Say hello</h2>

            <div className="mt-4 space-y-3 text-sm leading-6">
              <a href="mailto:kaiyewufiyinfoluwa@gmail.com" className="block w-fit text-soft-white/65 transition-colors hover:text-soft-white focus:outline-none focus:ring-2 focus:ring-yellow "  >kaiyewufiyinfoluwa@gmail.com</a>

              <a
                href="tel:+2347073121802"
                className="block w-fit text-soft-white/65 transition-colors hover:text-soft-white focus:outline-none focus:ring-2 focus:ring-yellow"
              >
                (+234) 707 312 1802
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-soft-white/10 pt-6 text-xs text-soft-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kaiyewu Fiyinfoluwa Sharon. All rights reserved.</p>

          <p>Good food. Good moments.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;