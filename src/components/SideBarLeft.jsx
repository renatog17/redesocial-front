const SidebarLeft = () => {
  return (
    <aside className="hidden md:flex md:w-1/4 lg:w-1/5 bg-white p-4">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-semibold">Menu</h2>
        <nav className="flex flex-col gap-2">
          <a href="#" className="hover:text-blue-500">Amigos</a>
          <a href="#" className="hover:text-blue-500">Grupos</a>
          <a href="#" className="hover:text-blue-500">Settings</a>
        </nav>
      </div>
    </aside>
  );
};

export default SidebarLeft;
