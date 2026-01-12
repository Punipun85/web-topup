import ProfileSidebar from "../sidebar/ProfileSidebar";
import "../assets/account-layout.css";

export default function AccountLayout({ title, subtitle, children }) {
  return (
    <div className="account-layout">
      <ProfileSidebar />

      <div className="account-content">
        <div className="account-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
