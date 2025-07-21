import { useLocation } from "react-router-dom";
import AdminNavigation from "./nav/AdminNavigation";
import HomeNavigation from "./nav/HomeNavigation";
import Logo from "./Logo";

export default function Header() {

   const location = useLocation()

   return (
      <header className="bg-slate-800 p-4">
         <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
            <div className="w-full p5 lg:p-0 md:w-1/3">
               <Logo />
            </div>
            <nav className="md:w-1/3 md:flex md:justify-end space-x-4 items-center">
               {location.pathname === '/' ? <HomeNavigation /> : <AdminNavigation />}
            </nav>
         </div>
      </header>
   )
}
