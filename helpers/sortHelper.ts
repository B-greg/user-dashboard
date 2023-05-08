import { User, SortOption } from "@/models";

export function sortUserByOption(
  users: User[],
  sortOption: SortOption
): User[] {
  switch (sortOption) {
    case SortOption.LastName:
      return users.sort((a, b) => a.lastName.localeCompare(b.lastName));
    case SortOption.ID:
      return users.sort((a, b) => a.id - b.id);
    default:
      return users.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }
}
