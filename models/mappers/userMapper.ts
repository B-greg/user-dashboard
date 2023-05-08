import ResponsePaginationUsers from "../responses/ResponsePaginationUsers";
import ResponseUser from "../responses/ResponseUser";
import Pagination from "../pagination";
import User from "../users";

export function mapResponsePaginationToPagination(responsePagination: ResponsePaginationUsers): Pagination {
    return {
        page: responsePagination.page,
        perPage: responsePagination.per_page,
        total: responsePagination.total,
        totalPages: responsePagination.total_pages,
    }
}

export function mapResponseUsersToUsers(responseUsers: ResponseUser[]): User[] {
  const users: User[] = [];

  responseUsers.map((user) => {
    users.push(mapResponseUseToUsers(user));
  });

  return users;
}

function mapResponseUseToUsers(responseUsers: ResponseUser): User {
  return {
    id: responseUsers.id,
    email: responseUsers.email,
    firstName: responseUsers.first_name,
    lastName: responseUsers.last_name,
    avatar: responseUsers.avatar,
  };
}
