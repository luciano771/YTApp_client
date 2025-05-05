import { Search, Bell, ListPlus } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => ( 
  
  <aside className="w-20 text-white p-3 mt-0 flex flex-col gap-8 items-center">  
    <NavLink to="/" className={({ isActive }) => `transition-colors duration-300 hover:text-red-600 ${ isActive ? "text-red-900" : "text-gray-100"}`}>
      <Search size={35} />
    </NavLink>
    <NavLink to="/menus" className={({ isActive }) => `transition-colors duration-300 hover:text-red-600 ${ isActive ? "text-red-900" : "text-gray-100"}`}>
      <Bell size={35} />
    </NavLink>
    <NavLink to="/qr" className={({ isActive }) => `transition-colors duration-300 hover:text-red-600 ${ isActive ? "text-red-900" : "text-gray-100"}`}>
      <ListPlus size={35} />
    </NavLink>
  </aside>
);

export default Sidebar;
