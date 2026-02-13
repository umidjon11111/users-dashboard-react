import React, { useCallback, useState } from "react";
import { FixedSizeList as List } from "react-window";
import UserRow from "./UserRow";
import { useSortedUsers } from "../hooks/useSortedUsers";

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

const SortIcon = ({ active, direction }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: 4,
        opacity: active ? 1 : 0.25,
        transition: "all 0.2s ease",
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
};

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
        textAlign: align,
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
        borderRadius: 10,
        transition: "all 0.2s ease",
        background: active ? "rgba(37, 99, 235, 0.08)" : "transparent",
        color: active ? "#1d4ed8" : "#334155",
        fontWeight: active ? 700 : 600,
      }}
      onMouseEnter={(e) => {
        if (!active)
          e.currentTarget.style.background = "rgba(148,163,184,0.08)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent";
      }}
    >
      <span>{label}</span>
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
        background:
          "linear-gradient(135deg, rgba(248,250,252,0.9), rgba(241,245,249,0.9))",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(226,232,240,0.8)",
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
        flex="0 0 80px"
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      <HeaderCell
        label="Name"
        columnKey="name"
        flex="1 1 200px"
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      <HeaderCell
        label="Email"
        columnKey="email"
        flex="1 1 250px"
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
      />
      <HeaderCell
        label="Age"
        columnKey="age"
        flex="0 0 80px"
        align="center"
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
      />

      <div style={{ flex: "0 0 120px", padding: "10px 12px", fontWeight: 600 }}>
        Role
      </div>
      <div style={{ flex: "0 0 100px", padding: "10px 12px", fontWeight: 600 }}>
        Status
      </div>
      <div
        style={{
          flex: "0 0 120px",
          padding: "10px 12px",
          textAlign: "right",
          fontWeight: 600,
        }}
      >
        Salary
      </div>
      <div
        style={{
          flex: "0 0 100px",
          padding: "10px 12px",
          textAlign: "right",
          fontWeight: 600,
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
      setSortBy((prevSortBy) => {
        const next = getNextSortState(prevSortBy, sortDirection, key);
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
            padding: "0 12px",
            background: index % 2 === 0 ? "#ffffff" : "rgba(248,250,252,0.6)",
            borderBottom: "1px solid #f1f5f9",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(37, 99, 235, 0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              index % 2 === 0 ? "#ffffff" : "rgba(248,250,252,0.6)";
          }}
        >
          <UserRow user={user} onClick={() => onRowClick?.(user)} />
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
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(226,232,240,0.8)",
        boxShadow: "0 20px 40px rgba(2,6,23,0.08), 0 2px 8px rgba(2,6,23,0.06)",
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
        style={{ background: "transparent" }}
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualizedTable;
