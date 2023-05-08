import {
  Pagination,
  ResponsePaginationUsers,
  ResponseUser,
  User,
  mapResponsePaginationToPagination,
  mapResponseUsersToUsers,
} from "@/models";

describe("mapResponsePaginationToPagination", () => {
  const responsePagination: ResponsePaginationUsers = {
    page: 2,
    per_page: 10,
    total: 100,
    total_pages: 10,
    data: [],
  };

  it("should map response pagination to pagination object correctly", () => {
    const pagination: Pagination =
      mapResponsePaginationToPagination(responsePagination);

    expect(pagination).toEqual({
      page: 2,
      perPage: 10,
      total: 100,
      totalPages: 10,
    });
  });
});

describe("mapResponseUsersToUsers", () => {
  const responseUsers: ResponseUser[] = [
    {
      id: 1,
      email: "john.doe@example.com",
      first_name: "John",
      last_name: "Doe",
      avatar: "https://example.com/avatar.jpg",
    },
    {
      id: 2,
      email: "alice.smith@example.com",
      first_name: "Alice",
      last_name: "Smith",
      avatar: "https://example.com/avatar.jpg",
    },
  ];

  it("should map response users to user objects correctly", () => {
    const users: User[] = mapResponseUsersToUsers(responseUsers);

    expect(users).toEqual([
      {
        id: 1,
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        avatar: "https://example.com/avatar.jpg",
      },
      {
        id: 2,
        email: "alice.smith@example.com",
        firstName: "Alice",
        lastName: "Smith",
        avatar: "https://example.com/avatar.jpg",
      },
    ]);
  });
});
