import HeaderCell from "./HeaderCell";
import { COLUMNS } from "../../constants/columns";

const Header = ({ sortBy, sortDirection, onSort }) => {
  return (
    <div
      style={{
        display: "flex",
        padding: "12px 16px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        position: "sticky",
        top: 0,
        zIndex: 20,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        color: "white",
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

export default Header;
