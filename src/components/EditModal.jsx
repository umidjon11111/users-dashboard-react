import React, { memo, useState } from "react";

const EditModal = memo(({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    onSave(formData);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const failed = Math.random() < 0.3;

    if (failed) {
      setError("Update failed! Rolled back.");
      onSave(user);
      setIsSaving(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1000);
      setIsSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "15px",
    fontFamily: "inherit",
    transition: "all 0.2s",
    outline: "none",
  };

  const inputFocusStyle = `
    input:focus, select:focus, textarea:focus {
      border-color: #3b82f6 !important;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
    }
    input:hover:not(:focus), select:hover:not(:focus) {
      border-color: #d1d5db !important;
    }
  `;

  return (
    <>
      <style>{inputFocusStyle}</style>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          animation: "fadeIn 0.2s ease-out",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            width: "90%",
            maxWidth: "700px",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            animation: "slideUp 0.3s ease-out",
          }}
        >
          <div
            style={{
              padding: "32px 40px",
              borderBottom: "1px solid #f3f4f6",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "white",
                    letterSpacing: "-0.5px",
                  }}
                >
                  ✏️ Edit User Profile
                </h2>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "14px",
                  }}
                >
                  Update user information and save changes
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  color: "white",
                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.3)";
                  e.target.style.transform = "rotate(90deg)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.2)";
                  e.target.style.transform = "rotate(0deg)";
                }}
              >
                ×
              </button>
            </div>
          </div>

          <div style={{ padding: "40px" }}>
            {error && (
              <div
                style={{
                  padding: "16px 20px",
                  backgroundColor: "#fef2f2",
                  border: "2px solid #fecaca",
                  borderRadius: "12px",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  animation: "shake 0.5s",
                }}
              >
                <span style={{ fontSize: "24px" }}>⚠️</span>
                <div>
                  <p
                    style={{
                      margin: 0,
                      color: "#991b1b",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {error}
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      color: "#b91c1c",
                      fontSize: "13px",
                    }}
                  >
                    Please try again
                  </p>
                </div>
              </div>
            )}

            {success && (
              <div
                style={{
                  padding: "16px 20px",
                  backgroundColor: "#f0fdf4",
                  border: "2px solid #86efac",
                  borderRadius: "12px",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  animation: "slideDown 0.3s ease-out",
                }}
              >
                <span style={{ fontSize: "24px" }}>✅</span>
                <p
                  style={{
                    margin: 0,
                    color: "#166534",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Changes saved successfully!
                </p>
              </div>
            )}

            <div style={{ display: "grid", gap: "24px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    letterSpacing: "0.3px",
                  }}
                >
                  👤 PERSONAL INFORMATION
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#6b7280",
                      }}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#6b7280",
                      }}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#6b7280",
                  }}
                >
                  📧 Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={inputStyle}
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    letterSpacing: "0.3px",
                  }}
                >
                  💼 PROFESSIONAL DETAILS
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#6b7280",
                      }}
                    >
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      style={inputStyle}
                    >
                      <option value="Developer">👨‍💻 Developer</option>
                      <option value="Designer">🎨 Designer</option>
                      <option value="Manager">👔 Manager</option>
                      <option value="Analyst">📊 Analyst</option>
                      <option value="Engineer">⚙️ Engineer</option>
                      <option value="Consultant">💡 Consultant</option>
                    </select>
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#6b7280",
                      }}
                    >
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      style={inputStyle}
                    >
                      <option value="active">✅ Active</option>
                      <option value="inactive">⛔ Inactive</option>
                      <option value="pending">⏳ Pending</option>
                    </select>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#6b7280",
                    }}
                  >
                    🎂 Age
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        age: parseInt(e.target.value) || 0,
                      })
                    }
                    style={inputStyle}
                    placeholder="25"
                    min="18"
                    max="100"
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#6b7280",
                    }}
                  >
                    💰 Salary
                  </label>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#9ca3af",
                        fontWeight: "600",
                      }}
                    >
                      $
                    </span>
                    <input
                      type="number"
                      value={formData.salary}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: parseInt(e.target.value) || 0,
                        })
                      }
                      style={{ ...inputStyle, paddingLeft: "32px" }}
                      placeholder="50000"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#6b7280",
                  }}
                >
                  📅 Join Date
                </label>
                <input
                  type="date"
                  value={formData.joinedDate}
                  onChange={(e) =>
                    setFormData({ ...formData, joinedDate: e.target.value })
                  }
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "24px 40px",
              borderTop: "1px solid #f3f4f6",
              background: "#fafafa",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={onClose}
              disabled={isSaving}
              style={{
                padding: "12px 28px",
                border: "2px solid #e5e7eb",
                borderRadius: "10px",
                backgroundColor: "white",
                cursor: isSaving ? "not-allowed" : "pointer",
                fontSize: "15px",
                fontWeight: "600",
                color: "#6b7280",
                transition: "all 0.2s",
                opacity: isSaving ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isSaving) {
                  e.target.style.backgroundColor = "#f9fafb";
                  e.target.style.borderColor = "#d1d5db";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.borderColor = "#e5e7eb";
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              style={{
                padding: "12px 32px",
                border: "none",
                borderRadius: "10px",
                background: isSaving
                  ? "#9ca3af"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                cursor: isSaving ? "not-allowed" : "pointer",
                fontSize: "15px",
                fontWeight: "600",
                transition: "all 0.2s",
                boxShadow: isSaving
                  ? "none"
                  : "0 4px 12px rgba(102, 126, 234, 0.4)",
              }}
              onMouseEnter={(e) => {
                if (!isSaving) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(102, 126, 234, 0.5)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 12px rgba(102, 126, 234, 0.4)";
              }}
            >
              {isSaving ? "⏳ Saving..." : "💾 Save Changes"}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </>
  );
});

export default EditModal;
