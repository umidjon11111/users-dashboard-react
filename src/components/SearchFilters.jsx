import React from "react";

const fieldWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 600,
  color: "#475569",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

const inputStyle = {
  padding: "12px 16px",
  border: "1px solid #d1d5db",
  borderRadius: 10,
  fontSize: 14,
  outline: "none",
  transition: "all 0.2s ease",
  background: "#fff",
};

const selectStyle = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #d1d5db",
  fontSize: 14,
  outline: "none",
  background: "#fff",
  cursor: "pointer",
};

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: 16,
        marginBottom: 24,
        padding: 16,
        borderRadius: 14,
        background: "rgba(248,250,252,0.7)",
        border: "1px solid #e2e8f0",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* 🔍 Search */}
      <div style={fieldWrapper}>
        <label htmlFor="search-input" style={labelStyle}>
          Search Users
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="🔍 Search by name, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
          aria-label="Search users by name or email"
        />
      </div>

      {/* 📊 Status Filter */}
      <div style={fieldWrapper}>
        <label htmlFor="status-filter" style={labelStyle}>
          Status
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={selectStyle}
          aria-label="Filter users by status"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* 👤 Role Filter */}
      <div style={fieldWrapper}>
        <label htmlFor="role-filter" style={labelStyle}>
          Role
        </label>
        <select
          id="role-filter"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={selectStyle}
          aria-label="Filter users by role"
        >
          <option value="all">All Roles</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
          <option value="Analyst">Analyst</option>
          <option value="Engineer">Engineer</option>
          <option value="Consultant">Consultant</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;
