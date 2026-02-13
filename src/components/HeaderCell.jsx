import React from "react";
import SortIcon from "./SortIcon";

const HeaderCell = ({
  label,
  columnKey,
  flex,
  align = "left",
  sortBy,
  sortDirection,
  onSort,
  sortable = true,
}) => {
  const active = sortBy === columnKey;

  return (
    <div
      onClick={sortable ? () => onSort(columnKey) : undefined}
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
        cursor: sortable ? "pointer" : "default",
        userSelect: "none",
        padding: "10px 12px",
        fontWeight: 600,
        color: active ? "#1d4ed8" : "#334155",
        whiteSpace: "nowrap",
        transition: "background 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (sortable) {
          e.currentTarget.style.background = "rgba(59, 130, 246, 0.05)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {label}
      {sortable && <SortIcon active={active} direction={sortDirection} />}
    </div>
  );
};

export default HeaderCell;
