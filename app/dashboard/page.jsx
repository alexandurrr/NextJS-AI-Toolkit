import OpenaiCard from "../ui/dashboard/card/openaicard";
import ClaudeCard from "../ui/dashboard/card/claudecard";
import Norllmcard from "../ui/dashboard/card/norllmcard";
import styles from "../ui/dashboard/dashboard.module.css";
import Transactions from "../ui/dashboard/transactions/transactions";
import Chart from "../ui/dashboard/chart/chart";
import Rightbar from "../ui/dashboard/rightbar/rightbar";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <OpenaiCard />
          <ClaudeCard />
          <Norllmcard />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
