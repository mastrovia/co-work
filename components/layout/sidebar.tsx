'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Building2,
  UserPlus,
  Settings,
  LogOut,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Locations',
    href: '/locations',
    icon: MapPin,
  },
  {
    name: 'Spaces',
    href: '/spaces',
    icon: Building2,
  },
  {
    name: 'Leads',
    href: '/leads',
    icon: UserPlus,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-60 border-r border-neutral-200 bg-white md:block">
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="flex h-16 items-center gap-3 px-5 border-b border-neutral-200">
          {/* <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
            <Building2 className="h-5 w-5 text-white" />
          </div> */}
          <div>
            <h1 className="text-sm font-bold text-neutral-900">CoWork</h1>
            <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
              Admin
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6">
          <div className="space-y-1">
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all',
                    isActive
                      ? 'bg-emerald-50 font-medium text-emerald-700'
                      : 'font-normal text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-[18px] w-[18px]',
                      isActive ? 'text-emerald-600' : 'text-neutral-400'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-neutral-100 px-3 py-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-normal text-neutral-500 transition-all hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
