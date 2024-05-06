import '@/styles/globals.css';

import Sidebar from '@/components/SideBar';
import Provider from '@/components/Provider';
const DashboardLayout = ({ children }) => {
  return (
    <html lang="en">
      <head />
      {/* <div className="absolute top-0 left-0 w-screen h-full right-mesh bounce-right -z-10"></div> */}
      <body className="z-20 flex items-center justify-center w-screen h-screen p-2 overflow-x-hidden font-sans sm:p-10 md:p-20">
        <div className="absolute top-0 left-0 w-screen h-full left-mesh bounce-left -z-10"></div>
        <Provider>
          <div className="flex items-center justify-start w-full h-full gap-2 border rounded-3xl ">
            <Sidebar />
            {children}
          </div>
        </Provider>
        <div id="modal"></div>
      </body>
    </html>
  );
};
export default DashboardLayout;
