import { useNavigate } from "react-router-dom";

export default function AdminTopbar() {
  const navigate = useNavigate();

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.className = next;
    localStorage.setItem("theme", next);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="admin-topbar">
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>

      <button
        onClick={logout}
        style={{ marginLeft: 10 }}
      >
        Logout
      </button>
    </header>
  );
}
