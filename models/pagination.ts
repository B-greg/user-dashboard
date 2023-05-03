import User from "./users";

type Pagination = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
  };

export default Pagination;