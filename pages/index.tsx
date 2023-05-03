import Image from "next/image";
import { Inter } from "next/font/google";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
  Key,
  useMemo,
} from "react";
import { Pagination } from "../models";
import { data } from "autoprefixer";
import { GetServerSideProps } from "next";
import { UserCard, Pagination as PaginationComponent, ShortMenu } from "@/components/";

const inter = Inter({ subsets: ["latin"] });

// Define a type for our props
interface PaginationProps extends Pagination {}

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch(`https://reqres.in/api/users?page=1`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: data };
}

export default function Home(props: PaginationProps) {
  console.log(props);


  return (
    <main className="bg-white">
      <div className="container mx-auto xl:max-w-screen-xl bg-gray-300">
        <div className="py-2 px-2">
        <ShortMenu selectedOption="First Name" options={["First Name", "Last Name", "ID"]} onChange={(option) => {}}  />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-x-2 gap-y-8">
          {props.data.map((item, index) => {
            return <UserCard key={index} user={item} />;
          })}
        </div>
          <PaginationComponent
            currentPage={1}
            totalPages={2}
            onChange={(page) => {
              console.log("onChange" + page);
            }}
          />
        </div>
    </main>
  );
}
