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
      }}
      onClick={onClick}
    >
      {/* ID */}
      <div
        style={{
          ...cellBase,
          flex: columns.id,
          fontSize: 13,
          fontWeight: 600,
          color: "#6366f1",
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
          color: "#0f172a",
        }}
      >
        {user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.name}
      </div>

      {/* EMAIL */}
      <div
        style={{
          ...cellBase,
          flex: columns.email,
          color: "#64748b",
        }}
      >
        {user.email}
      </div>

      {/* AGE */}
      <div
        style={{
          ...cellBase,
          flex: columns.age,
          justifyContent: "center",
          color: "#8b5cf6",
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
            backgroundColor:
              user.role === "Admin"
                ? "#dbeafe"
                : user.role === "Manager"
                  ? "#e0e7ff"
                  : "#f3f4f6",
            color:
              user.role === "Admin"
                ? "#1e40af"
                : user.role === "Manager"
                  ? "#4338ca"
                  : "#4b5563",
          }}
        >
          {user.role}
        </span>
      </div>

      {/* STATUS */}
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
            fontWeight: 500,
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

      <div
        style={{
          ...cellBase,
          flex: columns.salary,
          justifyContent: "flex-end",
          fontWeight: 700,
          color: "#059669",
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
          color: "#475569",
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
