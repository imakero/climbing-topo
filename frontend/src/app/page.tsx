import Image from "next/image";
import backgroundImage from "../../public/background.jpg";

export default function Home() {
  return (
    <div className="relative flex-grow">
      <div className="absolute -z-10 h-full">
        <Image
          src={backgroundImage}
          alt="Climber on Folkefesten in Lofoten"
          className="object-cover"
          priority
        />
      </div>
      <div className="ml-8 mt-8 hidden max-w-sm rounded-md bg-teal-500 px-8 py-4 opacity-90 shadow-md lg:block">
        <h1 className="text-6xl text-white">Topo</h1>
        <h2 className="mt-4 text-2xl text-teal-200">
          - Find problems with ease
        </h2>
      </div>
    </div>
  );
}
