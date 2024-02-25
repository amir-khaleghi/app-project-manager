import '@/styles/globals.css';
import GlassContainer from '@/components/GlassContainer';
import Image from 'next/image';
import shape01 from '@/assets/shape01.png';
import shape02 from '@/assets/shape02.png';
import Sidebar from '@/components/SideBar';
const DashboardLayout = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body className=" h-screen w-screen overflow-hidden  flex items-center justify-center  p-10 md:p-20   font-sans">
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
          className="absolute rounded-3xl left-[800px] hidden lg:block transform -translate-x-1/2  -top-80  w-80 h-80 bounce-y-x bg-purple-500
  "
        ></div>

        <GlassContainer className="w-full h-full flex items-center justify-start gap-4 md:p-10">
          <Sidebar />
          {children}
        </GlassContainer>
      </body>
    </html>
  );
};
export default DashboardLayout;
