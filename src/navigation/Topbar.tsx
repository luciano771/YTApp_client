import { useLocation } from "react-router-dom"; 
import BuyMeCoffeButton from "../components/BuyMeCoffeButton.tsx"; 
import Logo from "../components/Logo.tsx";
const Topbar = () => {
  const { pathname } = useLocation();
  // const navigate = useNavigate();

  // const handleNew = () => {
  //   navigate(("/tasks/new"));
  // };

  // const handleMenu = () => {
  //   navigate(("/menus"));
  // };


  return (
<header className="bg-gradient-to-r from-[#121212] to-red-900 px-4 py-3 flex justify-between items-center">
<div>
        <h1 className="text-xl font-semibold">
          {(pathname === "/Notification" || pathname.includes("tasks")) && "Create Notification 🔔" }
          {pathname === "/" && "Search 🔎 "} 
          {pathname === "/TagFilter" && "Tag filter 🏷️"}  
        </h1>
      </div>
      
      <div style={{display:"flex",gap:"50px",alignItems:"center",justifyItems:"center",fontFamily:"cursive"}}> 
        <BuyMeCoffeButton/> 
        <Logo/>
      </div>
       
      
      {/* Acciones específicas */}

      {/* <div className="px-1 gap-2 flex flex-end items-center"> 
        {(pathname.includes("new") || pathname.includes("edit")) && (
          <Button handleMenu={handleMenu} texto="Volver" />
        )} 
        
        {(pathname === "/menus" || pathname.includes("tasks")) && (
          <Button handleMenu={handleNew} texto="Agregar" /> 
        )}
      </div> */}
         
    </header>

  );
};

export default Topbar;
