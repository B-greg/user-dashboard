import { sortUserByOption } from "@/helpers/sortHelper";
import { SortOption, User } from "@/models";

describe("sortUserByOption", () => {
  // Given
  const users: User[] = [
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      avatar: "http://John.doe",
    },
    {
      id: 1,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@email.com",
      avatar: "http://alice.smith",
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@email.com",
      avatar: "http://bob.johnson",
    },
  ];

  it("should sort users by last name when SortOption is LastName", () => {
    // When
    const sortedUsers = sortUserByOption(users, SortOption.LastName);
    // Then
    expect(sortedUsers).toEqual([
      {
        id: 2,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        avatar: "http://John.doe",
      },
      {
        id: 3,
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob.johnson@email.com",
        avatar: "http://bob.johnson",
      },
      {
        id: 1,
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@email.com",
        avatar: "http://alice.smith",
      },
    ]);
  });

  it("should sort users by ID when SortOption is ID", () => {
    // When
    const sortedUsers = sortUserByOption(users, SortOption.ID);
    // Then
    expect(sortedUsers).toEqual([
      {
        id: 1,
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@email.com",
        avatar: "http://alice.smith",
      },
      {
        id: 2,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        avatar: "http://John.doe",
      },
      {
        id: 3,
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob.johnson@email.com",
        avatar: "http://bob.johnson",
      },
    ]);
  });

  it("should sort users by first name when SortOption is not provided or invalid", () => {
    // When
    const sortedUsers = sortUserByOption(users, "InvalidOption" as SortOption);
    // Then
    expect(sortedUsers).toEqual([
      {
        id: 1,
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@email.com",
        avatar: "http://alice.smith",
      },
      {
        id: 3,
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob.johnson@email.com",
        avatar: "http://bob.johnson",
      },
      {
        id: 2,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        avatar: "http://John.doe",
      },
    ]);
  });
});
