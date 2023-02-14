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
    <div className="h-full min-h-screen w-screen">
      <h1 className="mt-8 text-center text-5xl font-bold tracking-wide">
        Microservices
      </h1>
      <div className="mx-auto flex max-w-lg flex-col gap-3 p-3">
        {microservices.map((microservice, i) => (
          <MicroservicePing
            key={microservice}
            microservice={microservice}
            className={gradients[i]}
          />
        ))}
      </div>
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
    <div
      className={clsx(
        "flex flex-col rounded-lg px-6 py-4 shadow-lg",
        className
      )}
    >
      <>
        <h2 className="text-3xl font-bold tracking-wide">
          Microservice {microservice}
        </h2>
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
  <pre className="max-w-full overflow-auto rounded-md bg-slate-800 p-2 text-sm">
    {JSON.stringify(data, null, 2)}
  </pre>
);

export default Home;
