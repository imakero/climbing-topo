const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto min-h-full flex-grow">{children}</div>
  );
};

export default Layout;
