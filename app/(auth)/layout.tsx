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
        {/* <div
          className="spin-anim   absolute -left-80 transform -translate-x-1/2  -bottom-40  w-[800px] 
  "
        >
          <Image
            src="https://ik.imagekit.io/tmhe2qeic/Union%20(1).png?updatedAt=1708324661439"
            alt="union"
            width={2000}
            height={2000}
          />
        </div>
        <div
          className="absolute -right-40 transform -translate-x-1/2  -top-80  w-[900px]  bounce-y 
  "
        >
          <Image
            src="https://ik.imagekit.io/tmhe2qeic/tr:w-600/union.webp?updatedAt=1708247691610"
            alt="union"
            width={2000}
            height={2000}
          />
        </div> */}
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
};
export default AuthRootLayout;
