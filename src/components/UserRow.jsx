import React, { memo, useMemo } from "react";
import { calculateUserScore } from "../utils/calculateUserScore";

const cellBase = {
  padding: "0 12px",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

const UserRow = memo(({ user, onClick, columns, style }) => {
  const score = useMemo(() => {
    return calculateUserScore({
      age: user.age,
      salary: user.salary,
    });
  }, [user.age, user.salary]);

  const displayId =
    typeof user.id === "string" ? user.id.split("-")[1] : user.id;

  return (
    <div
      style={{
        ...style,
        display: "flex",
        width: "100%",
        height: "100%",
        cursor: "pointer",
        background: "#ffffff", // 🔥 kontrast uchun aniq fon
      }}
      onClick={onClick}
    >
      {/* ID — CONTRAST FIX */}
      <div
        style={{
          ...cellBase,
          flex: columns.id,
          fontSize: 13,
          fontWeight: 700,
          color: "#4338ca", // OLD: #6366f1 ❌ (fail)
          fontFamily: "monospace",
        }}
      >
        #{displayId}
      </div>

      {/* NAME */}
      <div
        style={{
          ...cellBase,
          flex: columns.name,
          fontWeight: 600,
          color: "#0f172a", // already accessible
        }}
      >
        {user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.name}
      </div>

      {/* EMAIL — slightly darker for contrast */}
      <div
        style={{
          ...cellBase,
          flex: columns.email,
          color: "#475569", // OLD: #64748b (borderline)
        }}
      >
        {user.email}
      </div>

      {/* AGE — CONTRAST FIX */}
      <div
        style={{
          ...cellBase,
          flex: columns.age,
          justifyContent: "center",
          color: "#6d28d9", // OLD: #8b5cf6 ❌ (fail)
          fontWeight: 700,
          fontSize: 15,
        }}
      >
        {user.age}
      </div>

      {/* ROLE */}
      <div
        style={{
          ...cellBase,
          flex: columns.role,
        }}
      >
        <span
          style={{
            padding: "5px 12px",
            borderRadius: "14px",
            fontSize: "12px",
            fontWeight: 500,
            backgroundColor: "#f1f5f9",
            color: "#1e293b", // darker = accessible
          }}
        >
          {user.role}
        </span>
      </div>

      {/* STATUS (already good contrast) */}
      <div
        style={{
          ...cellBase,
          flex: columns.status,
        }}
      >
        <span
          style={{
            padding: "5px 12px",
            borderRadius: "14px",
            fontSize: "12px",
            fontWeight: 600,
            backgroundColor:
              user.status === "active"
                ? "#dcfce7"
                : user.status === "pending"
                ? "#fef3c7"
                : "#fee2e2",
            color:
              user.status === "active"
                ? "#166534"
                : user.status === "pending"
                ? "#92400e"
                : "#991b1b",
          }}
        >
          {user.status}
        </span>
      </div>

      {/* SALARY — make slightly darker green */}
      <div
        style={{
          ...cellBase,
          flex: columns.salary,
          justifyContent: "flex-end",
          fontWeight: 700,
          color: "#047857", // OLD: #059669 (borderline)
        }}
      >
        ${user.salary?.toLocaleString()}
      </div>

      {/* SCORE */}
      <div
        style={{
          ...cellBase,
          flex: columns.score,
          justifyContent: "flex-end",
          fontSize: 13,
          color: "#334155", // stronger contrast
          fontWeight: 600,
        }}
      >
        Score: {score}
      </div>
    </div>
  );
});

UserRow.displayName = "UserRow";
export default UserRow;
