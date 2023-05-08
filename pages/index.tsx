import Image from "next/image";
import { Inter } from "next/font/google";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
  Key,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Pagination,
  SortOption,
  User,
  mapResponsePaginationToPagination,
  mapResponseUsersToUsers,
} from "@/models";
import { data } from "autoprefixer";
import { GetServerSideProps } from "next";
import {
  UserCard,
  Pagination as PaginationComponent,
  ShortMenu,
} from "@/components/";
import { sortUserByOption } from "@/helpers/sortHelper";

const inter = Inter({ subsets: ["latin"] });

// Define a type for our props
interface PaginationProps {
  pagination: Pagination;
  users: User[];
}

// This gets called on every request
export async function getServerSideProps(context) {
  const data = await fetch(`https://reqres.in/api/users?page=1`).then((res) =>
    res.json()
  );
  return {
    props: {
      pagination: mapResponsePaginationToPagination(data),
      users: mapResponseUsersToUsers(data.data),
    },
  };
}

export default function Home(props: PaginationProps) {
  console.log(props);
  const [sortOption, setSortOption] = useState<SortOption>(
    SortOption.FirstName
  );
  const didMount = useRef(false);
  const [page, setPage] = useState(props.pagination.page);
  const [users, setUsers] = useState<User[]>(props.users);
  const [pagination, setPagination] = useState<Pagination>(props.pagination);

  useEffect(() => {
    // Don't run this use effect when the component mount
    if (didMount.current) {
      fetch(`https://reqres.in/api/users?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          setPagination(mapResponsePaginationToPagination(data));
          setUsers(mapResponseUsersToUsers(data.data));
        });
    } else {
      didMount.current = true;
    }
  }, [page]);

  const sortData = useMemo(() => {
    console.log(sortUserByOption(users, sortOption));
    return sortUserByOption(users, sortOption);
  }, [users, sortOption]);

  return (
    <main className="bg-white">
      <div className="container mx-auto xl:max-w-screen-xl bg-gray-300">
        <div className="py-2 px-2">
          <ShortMenu
            selectedOption="First Name"
            options={Object.values(SortOption)}
            onChange={(option) => {
              setSortOption(
                SortOption[
                  Object.keys(SortOption)[
                    Object.values(SortOption).indexOf(option as SortOption)
                  ]
                ]
              );
            }}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-x-2 gap-y-8">
          {sortData.map((item, index) => {
            return <UserCard key={index} user={item} />;
          })}
        </div>
        <PaginationComponent
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </div>
    </main>
  );
}
