import Card from './Card';
import Image from 'next/image';
import SidebarLink from './SidebarLink';
const links = [
  { label: 'Home', icon: 'LayoutGrid', link: '/home' },
  {
    label: 'Calendar',
    icon: 'CalendarDays',
    link: '/calendar',
  },
  { label: 'Profile', icon: 'User', link: '/profile' },
  {
    label: 'Settings',
    icon: 'Cog',
    link: '/settings',
  },
];

const Sidebar = () => {
  return (
    <Card className="h-full w-20 md:w-40 flex items-center justify-between flex-wrap">
      {links.map((link) => (
        <SidebarLink
          key={link.label}
          link={link}
        />
      ))}
    </Card>
  );
};

export default Sidebar;
