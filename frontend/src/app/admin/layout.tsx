export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto min-h-full flex-grow">{children}</div>
  );
}
