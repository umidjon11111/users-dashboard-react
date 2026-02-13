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

export default SortIcon;
