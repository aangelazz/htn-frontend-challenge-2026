"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect, type CSSProperties } from "react";
import { LoginModal } from "./LoginModal";

const SOCIAL_LINKS = [
  {
    href: "https://hackthenorth.com/",
    label: "Hack the North",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@hackthenorthtv",
    label: "YouTube",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/hackthenorth/",
    label: "Instagram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          stroke="url(#ig)"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="5" stroke="url(#ig)" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig)" />
        <defs>
          <linearGradient id="ig" x1="2" y1="22" x2="22" y2="2">
            <stop stopColor="#F58529" />
            <stop offset="0.5" stopColor="#DD2A7B" />
            <stop offset="1" stopColor="#8134AF" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

const primaryBtnStyle: CSSProperties = {
  backgroundColor: "#E11D48",
  color: "white",
  padding: "10px 20px",
  borderRadius: "12px",
  border: "3px solid black",
  boxShadow: "4px 4px 0px 0px black",
  fontWeight: "bold",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: "16px",
};

const menuLinkStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 16px",
  fontSize: "15px",
  fontWeight: "bold",
  color: "black",
  textDecoration: "none",
  fontFamily: "inherit",
};

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMenu) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "1152px",
        margin: "0 auto",
        padding: "16px 24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src="/snoopy-logo.png"
          alt="Snoopy"
          style={{ width: "56px", height: "56px", objectFit: "contain" }}
        />
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            fontStyle: "italic",
            lineHeight: 1,
            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          <span style={{ color: "#E11D48" }}>Hackathon</span>{" "}
          <span style={{ fontWeight: 800 }}>Global</span>
          <span style={{ fontSize: "12px", verticalAlign: "super" }}>™</span>
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: "8px",
          width: "160px",
          justifyContent: "flex-end",
        }}
      >
        {isAuthenticated ? (
          <button
            className="btn-pop"
            onClick={logout}
            style={{ ...primaryBtnStyle, flex: 1, padding: "10px 0" }}
          >
            Logout
          </button>
        ) : (
          <button
            className="btn-pop"
            onClick={() => setShowModal(true)}
            style={{ ...primaryBtnStyle, flex: 1, padding: "10px 0" }}
          >
            Hacker Login
          </button>
        )}

        <div style={{ position: "relative" }} ref={menuRef}>
          <button
            className="dots-pop"
            onClick={() => setShowMenu((prev) => !prev)}
            style={{
              background: "white",
              border: "2px solid black",
              borderRadius: "8px",
              cursor: "pointer",
              width: "40px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              lineHeight: 1,
              fontFamily: "inherit",
              padding: 0,
            }}
            aria-label="Social links menu"
          >
            ⋮
          </button>

          {showMenu && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                backgroundColor: "white",
                border: "2px solid black",
                borderRadius: "10px",
                boxShadow: "4px 4px 0px 0px black",
                padding: "8px 0",
                zIndex: 50,
                minWidth: "220px",
              }}
            >
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={menuLinkStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#F3F4F6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </nav>
  );
}
