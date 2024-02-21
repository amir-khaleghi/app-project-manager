import '@/styles/globals.css';
import GlassContainer from '@/components/GlassContainer';
import Image from 'next/image';
const DashboardLayout = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen flex items-center justify-center  p-20 md:p-40 relative overflow-hidden font-sans">
        <div className="absolute -z-10 left-0 top-0  w-[1500px] h-full left-mesh bounce-left-x"></div>
        {/* /* Triangle ----------------- */}
        <div
          className="absolute right-30 transform -translate-x-1/2  -bottom-40  w-[400px]  spin-anim 
  "
        >
          <Image
            loading="lazy"
            src="https://ik.imagekit.io/tmhe2qeic/tr:w-600/union.webp?updatedAt=1708247691610"
            alt="union"
            width={2000}
            height={2000}
          />
        </div>

        <div
          className="absolute hidden lg:block right-[1200px] transform -translate-x-1/2  bottom-80 w-0 h-0 spin-anim 
  border-l-[10px] border-l-transparent
  border-t-[200px] border-t-red-500
  border-r-[200px] border-r-transparent"
        ></div>
        <div
          className="absolute  right-40 hidden lg:block transform -translate-x-1/2  bottom-40 w-0 h-0 bounce-y 
  border-l-[20px] border-l-transparent 
  border-t-[300px] border-t-blue-500
  border-r-[300px] border-r-transparent"
        ></div>
        <div
          className="absolute rounded-3xl right-80 hidden lg:block transform -translate-x-1/2  top-10  w-40 h-40 bounce-y-x bg-purple-500
  "
        ></div>

        <GlassContainer className="w-[800px] h-[800px]">
          {children}
        </GlassContainer>
        <div className="absolute  -z-10 right-0  top-0  w-[1500px] h-full right-mesh bounce-right-x"></div>
      </body>
    </html>
  );
};
export default DashboardLayout;
