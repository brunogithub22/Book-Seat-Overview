// app/admin/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// Mock metric data
const stats = [
  { name: 'Total Users', value: '2,543', change: '+12.5%', changeType: 'increase' },
  { name: 'Active Subscriptions', value: '1,230', change: '+8.2%', changeType: 'increase' },
  { name: 'Monthly Revenue', value: '$45,210', change: '+15.3%', changeType: 'increase' },
  { name: 'System Load', value: '24%', change: '-3.1%', changeType: 'decrease' },
];

// Mock recent users table data
const recentUsers = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'User', status: 'Active', date: '2026-08-01' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'Editor', status: 'Active', date: '2026-08-02' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Pending', date: '2026-08-03' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active', date: '2026-08-04' },
  { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'User', status: 'Inactive', date: '2026-08-05' },
];

const NAV_ITEMS = ['Overview', 'Users', 'Analytics', 'Settings'];

// Reusable scroll-reveal variants — container staggers its children in on view
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

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
              AD
            </div>
            <div>
              <p className="text-sm font-medium">System Admin</p>
              <p className="text-xs text-gray-400">admin@app.com</p>
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsNavOpen(true)}
              className="md:hidden text-gray-600 hover:text-gray-900 p-1 -ml-1 flex-shrink-0"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeTab}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="text-xl md:text-2xl font-semibold text-gray-800 truncate"
              >
                {activeTab}
              </motion.h1>
            </AnimatePresence>
          </div>
          <div className="flex items-center space-x-4 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-3 md:px-4 py-2 rounded-md shadow transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">+ New User</span>
              <span className="sm:hidden">+ New</span>
            </motion.button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-4 md:p-6 space-y-6">
          {/* Key Metrics Grid — staggers in on mount, re-plays if you scroll away and back */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.name}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"
              >
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <div className="flex items-baseline justify-between mt-2">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      stat.changeType === 'increase'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Placeholder Section — reveals as it scrolls into view */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-72"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">User Growth Trend</h2>
                <p className="text-sm text-gray-500">Monthly active registrations</p>
              </div>
              <div className="h-48 w-full bg-slate-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                [ Chart Integration Area - e.g., Recharts / Chart.js ]
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-72"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Role Distribution</h2>
                <p className="text-sm text-gray-500">User permissions breakdown</p>
              </div>
              <div className="h-48 w-full bg-slate-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                [ Pie Chart Placeholder ]
              </div>
            </motion.div>
          </motion.div>

          {/* Recent Activity Table — rows stagger in, each also fades in on scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Registrations</h2>
              <button className="text-sm text-blue-600 hover:underline font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="px-4 md:px-6 py-3 font-medium">User</th>
                    <th className="px-4 md:px-6 py-3 font-medium">Role</th>
                    <th className="px-4 md:px-6 py-3 font-medium">Status</th>
                    <th className="px-4 md:px-6 py-3 font-medium">Joined Date</th>
                    <th className="px-4 md:px-6 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="divide-y divide-gray-200 text-gray-700"
                >
                  {recentUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      variants={itemVariants}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 md:px-6 py-4">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </td>
                      <td className="px-4 md:px-6 py-4">{user.role}</td>
                      <td className="px-4 md:px-6 py-4">
                        <span
                          className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                            user.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : user.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-gray-500">{user.date}</td>
                      <td className="px-4 md:px-6 py-4 text-right">
                        <button className="text-slate-600 hover:text-slate-900 font-medium">Edit</button>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}