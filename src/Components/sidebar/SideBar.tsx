import React from "react";
import "./Sidebar.css";
import { signOut } from "firebase/auth";
import { auth } from "../auth/authMethods";
import { TypeSideBarProps } from "../data/Models";
import YahooImg from "../assets/yahoo.png";
import FacebookImg from "../assets/facebook.png";
import GmailImg from "../assets/gmail.png";
const SideBar: React.FC<TypeSideBarProps> = ({ clearChat }) => {
  const logOut = async () => {
    await signOut(auth);
  };

  const google = "google.com" as string;
  const facebook = "facebook.com" as string;
  const yahoo = "yahoo.com" as string;

  return (
    <aside className="sidebar__menu show">
      <div className="">
        <img
          src={`${auth.currentUser?.providerData[0].photoURL}`}
          width="150"
          height="150"
          alt="user"
          className="w-100 rounded-full mx-auto"
        />
      </div>
      <div className="sidebar__list">
        <div
          className="sidebar__button tooltip sidebar__new-chat"
          onClick={clearChat}
        >
          <span className="sidebar__icon">
            <i className="uil uil-plus-circle"></i>
          </span>{" "}
          <span className="sidebar__name">New chat</span>
          <span className="tooltiptext">Clear chat message</span>
        </div>

        <div className="sidebar__button tooltip2">
          <span className="sidebar__icon">
            <div className="uil uil-user"></div>
          </span>{" "}
          <span className="sidebar__name">
            {auth.currentUser?.providerData[0].displayName}
          </span>
          <span className="tooltiptext2">
            {auth.currentUser?.providerData[0].displayName}
          </span>
        </div>

        <div className="sidebar__button tooltip3">
          <span className="sidebar__icon">
            <i className="uil uil-envelope"></i>
          </span>
          <span className="sidebar__name">
            {auth.currentUser?.providerData[0].email?.substring(0, 15) + "..."}
          </span>
          <span className="tooltiptext3">
            {auth.currentUser?.providerData[0].email}
          </span>
        </div>

        <div className="sidebar__button tooltip4">
          <span className="sidebar__icon">
            {auth.currentUser?.providerData[0].providerId === google ? ( // Google icon
              <img src={GmailImg} alt="gmail" />
            ) : auth.currentUser?.providerData[0].providerId === facebook ? ( // Facebook icon}
              <img src={FacebookImg} alt="facebook" />
            ) : auth.currentUser?.providerData[0].providerId === yahoo ? ( // Yahoo icon
              <img src={YahooImg} alt="yahoo" />
            ) : (
              // Default icon
              <i className="uil uil-apps"></i>
            )}
          </span>
          <span className="sidebar__name">
            {auth.currentUser?.providerData[0].providerId}
            <span className="tooltiptext4">
              {" "}
              {auth.currentUser?.providerData[0].providerId}
            </span>
          </span>
        </div>

        <div className="sidebar__button sidebar__logout" onClick={logOut}>
          <span className="sidebar__icon">
            <i className="uil uil-sign-out-alt"></i>
          </span>{" "}
          <span className="sidebar__name">Log out</span>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
