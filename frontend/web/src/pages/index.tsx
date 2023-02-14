import { type NextPage } from "next";
import Link from "next/link";
import type { FC } from "react";
import type { Fetcher } from "swr";
import useSWR from "swr";
import clsx from "clsx";

const microservices = [
  "orders",
  "products",
  "shops",
  "transactions",
  "users",
  "restaurants",
];

const gradients = [
  "bg-gradient-to-br text-white from-indigo-600 to-blue-600",
  "bg-gradient-to-br text-white from-green-600 to-teal-600",
  "bg-gradient-to-br text-white from-yellow-600 to-orange-600",
  "bg-gradient-to-br text-white from-red-600 to-pink-600",
  "bg-gradient-to-br text-white from-purple-600 to-indigo-600",
  "bg-gradient-to-br text-white from-blue-600 to-green-600",
  "bg-gradient-to-br text-white from-teal-600 to-yellow-600",
];

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center p-8">
      <section className="w-full max-w-lg">
        <h1 className="mb-4 text-5xl font-bold">Microservices</h1>
        <div className="flex flex-col flex-wrap gap-3">
          {microservices.map((microservice, i) => (
            <MicroservicePing
              key={microservice}
              microservice={microservice}
              className={gradients[i]}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const fetcher: Fetcher<unknown> = (url: string) =>
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res;
      }

      throw new Error("Failed to fetch");
    })
    .then((res) => res.json());

const MicroservicePing: FC<{
  microservice: string;
  className?: string | undefined;
}> = ({ microservice, className }) => {
  const endpoint = `/api/${microservice}`;

  const { data, error, isLoading } = useSWR<unknown, unknown>(
    endpoint,
    fetcher
  );

  return (
    <div className={clsx("py-3shadow-lg rounded-lg px-6 py-4", className)}>
      <>
        <h2 className="text-3xl font-bold">Microservice {microservice}</h2>
        <p>
          Endpoint:{" "}
          <Link href={endpoint} target="_blank">
            <code>{endpoint}</code>
          </Link>
        </p>
        {isLoading && <Json data="Loading" />}
        {data && <Json data={data} />}
        {error && <Json data={error} />}
      </>
    </div>
  );
};

const Json: FC<{
  data: unknown;
}> = ({ data }) => (
  <pre className="rounded-md bg-slate-800 p-2 text-sm">
    {JSON.stringify(data, null, 2)}
  </pre>
);

export default Home;
