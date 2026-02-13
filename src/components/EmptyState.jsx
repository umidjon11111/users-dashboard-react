const EmptyState = () => {
  return (
    <div
      style={{
        padding: "80px 20px",
        textAlign: "center",
        backgroundColor: "#f9fafb",
        borderRadius: 12,
        border: "2px dashed #d1d5db",
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
      <h3 style={{ margin: 0 }}>No users found</h3>
      <p style={{ color: "#6b7280" }}>Try changing search or filters</p>
    </div>
  );
};

export default EmptyState;
