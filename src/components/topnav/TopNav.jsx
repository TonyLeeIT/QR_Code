import React, { useRef } from "react";
import "./topnav.scss";
import { Dropdown } from "../dropdown/Dropdown";
import { Link } from "react-router-dom";
import user_default from "../../assets/images/user.png";
import user_menu from "../../assets/JsonData/user_menus.json";
import notifications from "../../assets/JsonData/notification.json";
import { ThemeMenu } from "../thememenu/ThemeMenu";
import { useDispatch, useSelector } from "react-redux";
import { PaginationAction } from "../../redux/actions/PaginationAction";

const curr_user = {
  display_name: "Nguyen Thi Anh Tuyet",
  image: null,
};

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      {user.image ? (
        <img src={user.image} alt="" />
      ) : (
        <img src={user_default} alt="" />
      )}
    </div>
    <div className="topnav__right-user__name">{user.display_name}</div>
  </div>
);

const renderUserMenu = (item, index) => {
  return (
    <Link to="/" key={index}>
      <div className="notification-item">
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    </Link>
  );
};

export const TopNav = () => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const paginationReducer = useSelector((state) => state.PaginationReducer);

  const onHandleSearch = (searchRef) => {
    if (searchRef.current || searchRef.current.value) {
      searchRef.current.focus();
      dispatch(PaginationAction.searhPage(searchRef.current.value));
      searchRef.current.value = null;
    }
  };

  console.log(paginationReducer);

  return (
    <div className="topnav">
      <div className="topnav__search">
        <input ref={searchRef} type="text" placeholder="Search here..." />
        <i
          className="bx bx-search"
          onClick={() => onHandleSearch(searchRef)}
        ></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here */}
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">View All</Link>}
          />
          {/* dropdown here */}
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};
