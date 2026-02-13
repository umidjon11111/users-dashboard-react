import { useState, useMemo, useEffect } from "react";
import VirtualizedTable from "./components/VirtualizedTable";
import SearchFilters from "./components/SearchFilters";
import EditModal from "./components/EditModal";
import LoadingSpinner from "./components/LoadingSpinner"; // ⭐ NEW
import { generateUsers } from "./utils/generateUsers";
import { useDebounce } from "./hooks/useDebounce";

export default function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // ⭐ LOADER STATE

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 400);

  // ⭐ INITIAL LOAD (refresh bo'lganda loader chiqadi)
  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      setIsLoading(true);

      // Fake delay (real API ga tayyor)
      await new Promise((resolve) => setTimeout(resolve, 800));

      const users = generateUsers(10000);

      if (isMounted) {
        setAllUsers(users);
        setIsLoading(false);
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    if (!allUsers.length) return [];

    let result = allUsers;

    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase();
      result = result.filter(
        (u) =>
          u.firstName.toLowerCase().includes(s) ||
          u.lastName.toLowerCase().includes(s) ||
          u.email.toLowerCase().includes(s) ||
          u.name?.toLowerCase().includes(s)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((u) => u.status === statusFilter);
    }

    if (roleFilter !== "all") {
      result = result.filter((u) =>
        u.role.toLowerCase().includes(roleFilter.toLowerCase())
      );
    }

    return result;
  }, [allUsers, debouncedSearch, statusFilter, roleFilter]);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24,
        background: "#f8fafc",
        position: "relative",
      }}
    >
      {/* ⭐ GLOBAL LOADER (refresh + heavy compute) */}
      {isLoading && <LoadingSpinner label="Generating 10,000 users..." />}

      <div style={{ padding: 24, opacity: isLoading ? 0.4 : 1, transition: "opacity 0.3s" }}>
        <h1 style={{ marginBottom: 20 }}>Users Dashboard</h1>

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />

        <VirtualizedTable
          users={filteredUsers}
          onRowClick={setSelectedUser}
        />

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
