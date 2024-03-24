import '@/styles/globals.css';
import GlassContainer from '@/components/GlassContainer';
import Image from 'next/image';

const AuthRootLayout = ({ children }) => {
  return (
    <html lang="en ">
      <head />
      <body className=" h-screen w-screen  font-sans  sm:p-20 overflow-hidden">
        {/* meshes */}
        <div className="absolute -z-10 left-0 top-0  w-[1500px] h-full left-mesh bounce-left-x"></div>
        {/* <div className="absolute  -z-10 right-0  top-0  w-[1500px] h-full right-mesh bounce-right-x"></div> */}

        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
};
export default AuthRootLayout;
