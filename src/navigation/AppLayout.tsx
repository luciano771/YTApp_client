import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    
    <div className="flex h-screen">
      {/* Sidebar vertical */}
      <Sidebar />

      {/* Área derecha: Topbar + contenido */}
      <div className="h-screen flex-1 flex flex-col">
        {/* Topbar horizontal */}
        <Topbar />

        {/* Contenido scrollable */}
        <main className="shadow-lg h-screen p-4 overflow-y-auto">
        {children}
        </main>

      </div>
    </div>
  );
};

export default AppLayout;
