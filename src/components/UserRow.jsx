import React, { memo, useMemo } from "react";
import { calculateUserScore } from "../utils/calculateUserScore";

const UserRow = memo(({ user, style, onClick }) => {
  const score = useMemo(() => {
    return calculateUserScore({
      age: user.age,
      salary: user.salary,
    });
  }, [user.age, user.salary]);

  // 🔥 id string yoki number bo‘lsa ham crash bo‘lmasin
  const displayId =
    typeof user.id === "string"
      ? user.id.split("-")[1]
      : user.id;

  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        borderBottom: "1px solid #e5e7eb",
        cursor: "pointer",
        background: "white",
      }}
      onClick={onClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "#f9fafb")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "white")
      }
    >
      <div style={{ flex: "0 0 80px", fontSize: 13 }}>
        #{displayId}
      </div>

      <div style={{ flex: "1 1 200px", fontWeight: 500 }}>
        {user.firstName} {user.lastName}
      </div>

      <div style={{ flex: "1 1 250px", color: "#6b7280" }}>
        {user.email}
      </div>

      <div style={{ flex: "0 0 60px", textAlign: "center" }}>
        {user.age}
      </div>

      <div style={{ flex: "0 0 120px" }}>{user.role}</div>

      <div style={{ flex: "0 0 100px" }}>{user.status}</div>

      <div
        style={{
          flex: "0 0 100px",
          textAlign: "right",
          fontWeight: 600,
          color: "#059669",
        }}
      >
        ${user.salary.toLocaleString()}
      </div>

      <div
        style={{
          flex: "0 0 100px",
          textAlign: "right",
          fontSize: 13,
          color: "#9ca3af",
        }}
      >
        Score: {score}
      </div>
    </div>
  );
});

export default UserRow;
