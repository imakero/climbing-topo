import Link from "next/link";

type LocationsProps = {
  locations: WithId<TopoLocation>[];
};

const Locations = ({ locations }: LocationsProps) => {
  return (
    <div>
      <h1 className="text-2xl">Locations Admin</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <div className="flex flex-row justify-between">
              <Link href={`/admin/locations/${location.id}`}>
                {location.name}
              </Link>
              <div>
                <Link href={`/admin/locations/${location.id}`} className="ml-4">
                  Edit
                </Link>
                <Link href={`/admin/locations/${location.id}`} className="ml-4">
                  Delete
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Locations;
