"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../../supabase/client";
import UserProfile from "./user-profile";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // Handle hash links for smooth scrolling
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    // Add event listener for hash changes (but don't trigger on initial load)
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleScrollToElement = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    // Check if we're on the homepage
    const isHomePage = window.location.pathname === "/";

    if (isHomePage) {
      // If already on homepage, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If not on homepage, navigate to homepage with hash
      window.location.href = `/#${id}`;
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="text-2xl font-bold text-red-600">
          DOUBLE JEU
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop menu items */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="/#about"
            className="font-medium text-gray-700 hover:text-red-600 transition-colors"
            onClick={handleScrollToElement("about")}
          >
            À Propos
          </Link>
          <Link
            href="/#spectacle"
            className="font-medium text-gray-700 hover:text-red-600 transition-colors"
            onClick={handleScrollToElement("spectacle")}
          >
            Spectacles
          </Link>

          <Link
            href="/promos"
            className="font-medium text-gray-700 hover:text-red-600 transition-colors"
          >
            Voir les promos
          </Link>
          <div className="h-5 w-px bg-gray-300"></div>
          <Link
            href="/tickets"
            className="font-medium text-gray-700 hover:text-red-600 transition-colors"
          >
            Billetterie
          </Link>
          {!loading && user && <div className="h-5 w-px bg-gray-300"></div>}
          {!loading && user && (
            <Link
              href="/espace-membres"
              className="font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              Espace Membres
            </Link>
          )}
        </div>

        {/* User profile/login section */}
        <div className="hidden md:flex gap-4 items-center">
          {!loading && user ? (
            <>
              <Link href="/espace-membres"></Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link href="/tickets"></Link>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Connexion
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-lg absolute left-0 right-0">
          <div className="flex flex-col space-y-3">
            <Link
              href="/#about"
              className="font-medium text-gray-700 hover:text-red-600 transition-colors py-2"
              onClick={(e) => {
                handleScrollToElement("about")(e);
                setMobileMenuOpen(false);
              }}
            >
              À Propos
            </Link>
            <Link
              href="/#spectacle"
              className="font-medium text-gray-700 hover:text-red-600 transition-colors py-2"
              onClick={(e) => {
                handleScrollToElement("spectacle")(e);
                setMobileMenuOpen(false);
              }}
            >
              Spectacles
            </Link>
            <Link
              href="/promos"
              className="font-medium text-gray-700 hover:text-red-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Voir les promos
            </Link>
            <Link
              href="/tickets"
              className="font-medium text-gray-700 hover:text-red-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Billetterie
            </Link>
            {!loading && user && (
              <Link
                href="/espace-membres"
                className="font-medium text-gray-700 hover:text-red-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Espace Membres
              </Link>
            )}
            {!loading && user ? (
              <div className="py-2">
                <UserProfile />
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="font-medium text-gray-700 hover:text-red-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
