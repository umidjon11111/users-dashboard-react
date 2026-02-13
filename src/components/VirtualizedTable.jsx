import React, { useCallback, useState } from "react";
import { FixedSizeList as List } from "react-window";
import UserRow from "./UserRow";
import { useSortedUsers } from "../hooks/useSortedUsers";

const COLUMNS = {
  id: "0 0 80px",
  name: "1 1 220px",
  email: "1 1 260px",
  age: "0 0 80px",
  role: "0 0 200px",
  status: "0 0 120px",
  salary: "0 0 140px",
  score: "0 0 120px",
};

const getNextSortState = (currentSortBy, currentDirection, key) => {
  if (currentSortBy !== key) {
    return { sortBy: key, direction: "asc" };
  }
  if (currentDirection === "asc") {
    return { sortBy: key, direction: "desc" };
  }
  if (currentDirection === "desc") {
    return { sortBy: null, direction: "asc" };
  }
  return { sortBy: key, direction: "asc" };
};

const SortIcon = ({ active, direction }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      marginLeft: 4,
      opacity: active ? 1 : 0.25,
      fontSize: 10,
      lineHeight: "10px",
    }}
  >
    <span
      style={{
        color: active && direction === "asc" ? "#2563eb" : "#94a3b8",
        fontWeight: 900,
      }}
    >
      ▲
    </span>
    <span
      style={{
        color: active && direction === "desc" ? "#2563eb" : "#94a3b8",
        fontWeight: 900,
        marginTop: -2,
      }}
    >
      ▼
    </span>
  </div>
);

const HeaderCell = ({
  label,
  columnKey,
  flex,
  align = "left",
  sortBy,
  sortDirection,
  onSort,
}) => {
  const active = sortBy === columnKey;

  return (
    <div
      onClick={() => onSort(columnKey)}
      style={{
        flex,
        display: "flex",
        alignItems: "center",
        justifyContent:
          align === "right"
            ? "flex-end"
            : align === "center"
              ? "center"
              : "flex-start",
        gap: 6,
        cursor: "pointer",
        userSelect: "none",
        padding: "10px 12px",
        fontWeight: 600,
        color: active ? "#1d4ed8" : "#334155",
        whiteSpace: "nowrap",
      }}
    >
      {label}
      <SortIcon active={active} direction={sortDirection} />
    </div>
  );
};

const Header = ({ sortBy, sortDirection, onSort }) => {
  return (
    <div
      style={{
        display: "flex",
        padding: "12px 16px",
        background: "#f8fafc",
        borderBottom: "1px solid #e2e8f0",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <HeaderCell
        label="ID"
        columnKey="id"
        flex={COLUMNS.id}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      <HeaderCell
        label="Name"
        columnKey="name"
        flex={COLUMNS.name}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      <HeaderCell
        label="Email"
        columnKey="email"
        flex={COLUMNS.email}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      <HeaderCell
        label="Age"
        columnKey="age"
        flex={COLUMNS.age}
        align="center"
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
      />

      <div
        style={{
          flex: COLUMNS.role,
          padding: "10px 12px",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        Role
      </div>
      <div
        style={{
          flex: COLUMNS.status,
          padding: "10px 12px",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        Status
      </div>
      <div
        style={{
          flex: COLUMNS.salary,
          padding: "10px 12px",
          textAlign: "right",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        Salary
      </div>
      <div
        style={{
          flex: COLUMNS.score,
          padding: "10px 12px",
          textAlign: "right",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        Score
      </div>
    </div>
  );
};

const VirtualizedTable = ({ users = [], onRowClick }) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = useCallback(
    (key) => {
      setSortBy((prev) => {
        const next = getNextSortState(prev, sortDirection, key);
        setSortDirection(next.direction);
        return next.sortBy;
      });
    },
    [sortDirection],
  );

  const sortedUsers = useSortedUsers(users, sortBy, sortDirection);

  const Row = useCallback(
    ({ index, style }) => {
      const user = sortedUsers[index];
      if (!user) return null;

      return (
        <div
          style={{
            ...style,
            display: "flex", // 🔥 HEADER BILAN BIR XIL LAYOUT
            padding: "0 16px",
            background: index % 2 === 0 ? "#ffffff" : "#f8fafc",
            borderBottom: "1px solid #f1f5f9",
            alignItems: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#eef2ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              index % 2 === 0 ? "#ffffff" : "#f8fafc";
          }}
        >
          {/* 🔥 EN MUHIM: UserRow ham shu COLUMNS flexni ishlatishi kerak */}
          <UserRow
            user={user}
            onClick={() => onRowClick?.(user)}
            columns={COLUMNS}
          />
        </div>
      );
    },
    [sortedUsers, onRowClick],
  );

  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
      }}
    >
      <Header
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      <List
        height={600}
        itemCount={sortedUsers.length}
        itemSize={64}
        width="100%"
        overscanCount={10}
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualizedTable;
