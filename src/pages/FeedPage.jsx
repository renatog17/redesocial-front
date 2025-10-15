import Topbar from '../components/TopBar';
import SidebarLeft from '../components/SideBarLeft';
import Feed from '../components/Feed';
import SidebarRight from '../components/SideBarRight';

const FeedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Topbar stays fixed at the top */}
      <Topbar />

      {/* Add padding-top so content starts below the Topbar */}
      <div className="flex flex-col md:flex-row flex-1 pt-16 md:pt-0">
        <SidebarLeft />
        <Feed />
        <SidebarRight />
      </div>
    </div>
  );
};

export default FeedPage;
