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
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search by name, email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "12px 16px",
          border: "1px solid #d1d5db",
          borderRadius: 8,
          fontSize: 14,
        }}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{
          padding: 12,
          borderRadius: 8,
          border: "1px solid #d1d5db",
        }}
      >
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
      </select>

      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        style={{
          padding: 12,
          borderRadius: 8,
          border: "1px solid #d1d5db",
        }}
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
  );
};

export default SearchFilters;
