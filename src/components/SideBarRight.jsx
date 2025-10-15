const SidebarRight = () => {
  return (
    <aside className="hidden lg:flex lg:w-1/4 bg-white p-4">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-semibold">Suggestions</h2>
        <p className="text-gray-600">Suggested users or topics...</p>
      </div>
    </aside>
  );
};

export default SidebarRight;
