import {
  Pagination as PaginationComponent,
  ShortMenu,
  UserCard,
} from "@/components/";
import { sortUserByOption } from "@/helpers/sortHelper";
import {
  Pagination,
  SortOption,
  User,
  mapResponsePaginationToPagination,
  mapResponseUsersToUsers,
} from "@/models";
import { stringToSortOption } from "@/models/SortOption";
import { getRestUsers } from "@/service/api/users";
import { Inter } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// Define a type for our props
interface PaginationProps {
  pagination: Pagination;
  users: User[];
}

// This gets called on every request
export async function getServerSideProps() {
  const data = await getRestUsers();
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
      getRestUsers(page).then((data) => {
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
      <div className="container mx-auto xl:max-w-screen-xl bg-gray-300 py-6 px-6">
        <p className="mt-1 mb-4 text-xl text-black font-bold">User Dashboard</p>
        <p className="my-1 text-lg text-black font-bold">Sort</p>
        <div className="py-2">
          <ShortMenu
            selectedOption="First Name"
            options={Object.values(SortOption)}
            onChange={(option) => {
              setSortOption(stringToSortOption(option) ?? SortOption.FirstName);
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
