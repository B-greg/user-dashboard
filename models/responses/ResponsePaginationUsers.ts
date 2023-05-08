import ResponseUser from "./ResponseUser";

type ResponsePaginationUsers = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ResponseUser[];
};

export default ResponsePaginationUsers;
