'use client';
import Link from 'next/link';
import { Cog, User, LayoutGrid, CalendarDays } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const icons = { Cog, User, LayoutGrid, CalendarDays };
const SidebarLink = ({ link }) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon];
  return (
    <Link
      href={link.link}
      className="w-full flex justify-center items-center hover:scale-110 duration-200"
    >
      <Icon
        size={40}
        className={clsx(
          'stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out',
          isActive && 'stroke-violet-600'
        )}
      />
    </Link>
  );
};

export default SidebarLink;
