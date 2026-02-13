import { useMemo } from "react";

const parseId = (id) => {
  if (typeof id === "string") {
    const num = parseInt(id.split("-")[1], 10);
    return Number.isNaN(num) ? 0 : num;
  }
  return id;
};

export const useSortedUsers = (users, sortBy, sortDirection) => {
  return useMemo(() => {
    if (!sortBy) return users;

    const indexed = users.map((item, index) => ({
      item,
      index,
    }));

    indexed.sort((a, b) => {
      let valA = a.item[sortBy];
      let valB = b.item[sortBy];

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (sortBy === "id") {
        valA = parseId(valA);
        valB = parseId(valB);
      }

      if (typeof valA === "string" && typeof valB === "string") {
        const result = valA.localeCompare(valB, undefined, {
          numeric: true,
          sensitivity: "base",
        });
        return sortDirection === "asc" ? result : -result;
      }

      const result = Number(valA) - Number(valB);
      return sortDirection === "asc" ? result : -result;
    });

    return indexed.map((i) => i.item);
  }, [users, sortBy, sortDirection]);
};
