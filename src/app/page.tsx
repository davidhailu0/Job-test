import Image from "next/image";
import Link from "next/link";
import { SanityClient, createClient } from "next-sanity";
import config from "../util/senity.config";

async function getData() {
  const client: SanityClient = createClient(config);
  const data = await client.fetch(`*[_type == "hero"]{
    text,
    "hero_image":hero_image.asset->url
  }`);
  console.log(data);
  return data[0];
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="bg-white">
      <Image src={data.hero_image} alt="Hero_image" fill />
      <div className="mx-auto w-full sm:py-48 lg:py-56 z-50 absolute top-0 bottom-0 left-0 right-0 backdrop-blur-md">
        <div className="text-center px-80 mt-12">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {data.text}
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/donate"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
