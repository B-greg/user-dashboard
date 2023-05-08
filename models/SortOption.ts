enum SortOption {
  FirstName = "First Name",
  LastName = "Last Name",
  ID = "ID",
}

export function stringToSortOption(option: String): SortOption | undefined {
    return SortOption[
      Object.keys(SortOption).find(
        (k) => SortOption[k as "ID" | "FirstName" | "LastName"] === option
      ) as "ID" | "FirstName" | "LastName"
    ];
}

export default SortOption;
