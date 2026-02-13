import { useState, useMemo } from "react";
import VirtualizedTable from "./components/VirtualizedTable";
import SearchFilters from "./components/SearchFilters";
import EditModal from "./components/EditModal";
import { generateUsers } from "./utils/generateUsers";
import { useDebounce } from "./hooks/useDebounce";

export default function App() {
  const [allUsers] = useState(() => generateUsers(10000));
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 400);

  const filteredUsers = useMemo(() => {
    let result = [...allUsers];

    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase();
      result = result.filter(
        (u) =>
          u.firstName.toLowerCase().includes(s) ||
          u.lastName.toLowerCase().includes(s) ||
          u.email.toLowerCase().includes(s),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((u) => u.status === statusFilter);
    }

    if (roleFilter !== "all") {
      result = result.filter((u) => u.role === roleFilter);
    }

    return result;
  }, [allUsers, debouncedSearch, statusFilter, roleFilter]);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24,
        background: "#f8fafc",
      }}
    >
      <div style={{ padding: 24 }}>
        <h1> Users Dashboard</h1>

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />

        <VirtualizedTable users={filteredUsers} onRowClick={setSelectedUser} />

        {selectedUser && (
          <EditModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onSave={() => {}}
          />
        )}
      </div>
    </main>
  );
}
