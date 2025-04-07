import Image from "next/image";
import styles from "./page.module.css";
import HomePageContent from "@/components/Home";

export default function Home() {
  return (
    <div className={styles.page}>
      <HomePageContent />
    </div>
  );
}
