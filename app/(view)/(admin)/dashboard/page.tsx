// app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { AuthResponse } from "../../(auth)/login/action";
import { useStore } from '@/store/Theme';
import Overview from '@/components/features/admin/overview';

const NAV_ITEMS = ['Overview', 'Users', 'Analytics', 'Settings'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  const setName = useStore((s) => s.setName);
  const setSurname = useStore((s) => s.setSurname);
  const setEmail = useStore((s) => s.setEmail);

  const name = useStore((s)=> s.name)
  const surname = useStore((s)=> s.surname)
  const email = useStore((s)=> s.email)


  const renderView = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview onNavigate={setActiveTab} />;
    }
  };

  useEffect(() => {

    const run = async () => { 
      const res_AccessToken = await fetch("/api/auth/me", { method: "POST", credentials: "include" });

      let user: AuthResponse;

      if (res_AccessToken.status === 200) {
        user = await res_AccessToken.json();
      } else if (res_AccessToken.status === 401) {
        const res_RefreshToken = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (res_RefreshToken.status === 200) {
          user = await res_RefreshToken.json(); 
        } else {
          throw new Error("Session expired. Please log in again.");
        }
      } else {
        throw new Error(`Unexpected error (status ${res_AccessToken.status})`);
      }

      setName(user.name);
      setSurname(user.surname);
      setEmail(user.email);
    }

    if(name === "" || surname === "" || email === ""){
      run()
    }

  }, []);

  function Icon(name: string,surname: string): string | null{
    if (!name || !surname) return null; // guard against empty string
    return name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();
  }

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      await fetch("/api/auth/refresh/logout", {
        method: 'POST',
        credentials: 'include', // sends the httpOnly cookies so Go can revoke the session
      });
    } catch (err) {
      console.error('Logout request failed', err);
      // proceed with redirect anyway — cookies may already be cleared server-side,
      // and staying on a protected page is worse than a failed best-effort call
    } finally {
      router.push('/login');
      router.refresh(); // clears any cached RSC data for the now-logged-out state
    }
  }

  function selectTab(item: string) {
    setActiveTab(item);
    setIsNavOpen(false); // close drawer after picking a section on mobile
  }

  // Shared sidebar content so desktop rail and mobile drawer never drift apart
  function SidebarContent() {
    return (
      <>
        <div>
          <div className="flex items-center space-x-2 px-2 py-3 mb-6">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">A</div>
            <span className="text-xl font-bold tracking-wide">AdminPanel</span>
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => selectTab(item)}
                className={`relative w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === item
                    ? 'text-white'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {activeTab === item && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-blue-600 rounded-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <div className="flex items-center space-x-3 px-2">
            <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center font-semibold text-sm">
              {Icon(name,surname)}
            </div>
            <div>
              <p className="text-sm font-medium">System Admin</p>
              <p className="text-xs text-gray-400">{email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="w-full flex items-center justify-center px-3 mt-2 py-2 text-sm font-medium rounded-md text-gray-300 border border-slate-700 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSigningOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Desktop sidebar — unchanged, just extracted into SidebarContent */}
      <aside className="w-64 bg-slate-900 text-white flex-col justify-between p-4 hidden md:flex">
        <SidebarContent />
      </aside>

      {/* Mobile drawer — animated backdrop + slide-in panel, only mounted below md */}
      <AnimatePresence>
        {isNavOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            <motion.div
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsNavOpen(false)}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.aside
              className="relative z-50 w-64 bg-slate-900 text-white flex flex-col justify-between p-4 h-full shadow-xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
            >
              <button
                onClick={() => setIsNavOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white p-1"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto pt-16 lg:pt-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
         {renderView()} {/* Call the function here */}
        </div>
      </main>
    </div>
  );
}