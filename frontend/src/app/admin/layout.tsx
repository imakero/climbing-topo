import LinkButton from "@/components/LinkButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto min-h-full flex-grow">
      <div className="my-4 flex flex-row space-x-4">
        <LinkButton href="/admin/locations">Locations</LinkButton>
        <LinkButton href="/admin/location-images">Location images</LinkButton>
        <LinkButton href="/admin/problems">Problems</LinkButton>
      </div>
      {children}
    </div>
  );
}
