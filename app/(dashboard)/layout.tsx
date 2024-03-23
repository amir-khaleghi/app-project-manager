import '@/styles/globals.css';

import Sidebar from '@/components/SideBar';
import Provider from '@/components/Provider';
const DashboardLayout = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body className=" h-screen w-screen overflow-hidden  flex items-center justify-center p-2 sm:p-10 md:p-20   font-sans">
        <div className="absolute left-0 top-0  w-screen h-full left-mesh bounce-left"></div>

        <Provider>
          <div className="w-full h-full flex items-center justify-start gap-2 rounded-3xl  border ">
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
