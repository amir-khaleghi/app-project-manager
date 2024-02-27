import '@/styles/globals.css';
import GlassContainer from '@/components/GlassContainer';
import Image from 'next/image';

import { shape01, shape02, rec } from '@/assets';

import Sidebar from '@/components/SideBar';
const DashboardLayout = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body className=" h-screen w-screen overflow-hidden  flex items-center justify-center p-2 sm:p-10 md:p-20   font-sans">
        <div className="absolute left-0 top-0  w-[1000px] h-full left-mesh bounce-left"></div>
        <div className="absolute w-[1000px] h-full right-mesh bounce-right"></div>
        {/* /* Triangle ----------------- */}
        <div
          className="absolute  left-0 -bottom-40 w-[600px]  bounce
  "
        >
          <Image
            src={shape02}
            alt="union"
            width={1200}
            height={1200}
          />
        </div>
        <div
          className="absolute right-40 top-0 w-[400px]  bounce-y 
  "
        >
          <Image
            src={shape01}
            alt="union"
            width={1200}
            height={1200}
          />
        </div>
        <div
          className="absolute left-0 top-0 w-[600px]    
  "
        >
          <Image
            src={rec}
            alt="union"
            width={1200}
            height={1200}
          />
        </div>

        <GlassContainer className="w-full h-full flex items-center justify-start gap-2 md:p-10 p-2">
          <Sidebar />
          {children}
        </GlassContainer>
        <div id="modal"></div>
      </body>
    </html>
  );
};
export default DashboardLayout;
