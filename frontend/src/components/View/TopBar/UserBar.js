import React from "react";

import styles from "./UserBar.module.css";
import notificationIcon from "../../../assets/TopBarIcons/Notification.png";
import rowIcon from "../../../assets/TopBarIcons/row.png";
import avatarIcon from "../../../assets/TopBarIcons/Avatar.png";

const UserBar = () => {
    return (
        <div className={styles.userBarWrapper}>
            <img className={styles.notification} src={notificationIcon} alt="notification-icon" />
            <div className={styles.separator}></div>
            <p>Jan Kowalski</p>
            <img className={styles.row} src={rowIcon} alt="row-icon" />
            <img className={styles.avatar} src={avatarIcon} alt="avatar-icon" />
        </div>
    );
};

export default UserBar;
