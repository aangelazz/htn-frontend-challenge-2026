"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function LoginModal({ onClose }: { onClose: () => void }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      onClose();
    } else {
      setError("Incorrect username or password!");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      {/* Modal card */}
      <div
        style={{
          backgroundColor: "white",
          width: "400px",
          padding: "30px 40px",
          borderRadius: "25px",
          border: "4px solid black",
          boxShadow: "8px 8px 0px 0px black",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-2">Hacker Login</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "5px",
              }}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="hacker"
              style={{
                width: "100%",
                padding: "10px",
                border: "3px solid black",
                borderRadius: "12px",
                fontSize: "16px",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "5px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="htn2026"
              style={{
                width: "100%",
                padding: "10px",
                border: "3px solid black",
                borderRadius: "12px",
                fontSize: "16px",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                color: "#E11D48",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-pop"
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "white",
                border: "3px solid black",
                borderRadius: "12px",
                boxShadow: "4px 4px 0px 0px black",
                fontWeight: "bold",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-pop"
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#E11D48",
                color: "white",
                border: "3px solid black",
                borderRadius: "12px",
                boxShadow: "4px 4px 0px 0px black",
                fontWeight: "bold",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
