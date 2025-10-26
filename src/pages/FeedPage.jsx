import Topbar from "../components/TopBar";
import SidebarLeft from "../components/SideBarLeft";
import Feed from "../components/Feed";
import SidebarRight from "../components/SideBarRight";
import { useEffect } from "react";

const FeedPage = () => {
  useEffect(() => {
    //aqui será buscado informacções básicas do usuário logado
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Topbar />

      {/* Ajusta o padding-top para o tamanho da Topbar */}
      <div className="flex flex-col md:flex-row flex-1 pt-16 md:pt-16">
        <SidebarLeft />
        <Feed />
        <SidebarRight />
      </div>
    </div>
  );
};

export default FeedPage;
