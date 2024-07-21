import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    title: "OpenAI",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Chatbot",
        path: "/dashboard/chatbot",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "locationAI",
        path: "/dashboard/locationai",
        icon: <MdShoppingBag />,
      },
      {
        title: "Soon..1",
        path: "/dashboard/blank",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Claude",
    list: [
      {
        title: "Soon..2",
        path: "/dashboard/blank",
        icon: <MdWork />,
      },
      {
        title: "Soon..3",
        path: "/dashboard/blank",
        icon: <MdAnalytics />,
      },
    ],
  },
  {
    title: "Gemini",
    list: [
      {
        title: "Soon..4",
        path: "/dashboard/blank",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Soon..5",
        path: "/dashboard/blank",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="/noavatar.png"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>Alexander Gyatso</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
