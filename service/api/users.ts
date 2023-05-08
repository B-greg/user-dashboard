import { ResponsePaginationUsers } from "@/models";


export async function getRestUsers(page: number = 1): Promise<ResponsePaginationUsers> {
  return  await fetch(`https://reqres.in/api/users?page=${page}`).then((res) =>
    res.json()
  );
}