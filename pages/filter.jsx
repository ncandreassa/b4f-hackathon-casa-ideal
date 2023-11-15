import styles from "./filter.module.css"
import { Header } from "./components/Header/Header";
import { NavBar } from "./components/NavBar/NavBar";
import { useRouter } from 'next/router';
import { FilterForm } from "./components/FilterForm/FilterForm";


export default function Filter() {
  const router = useRouter();

  const closeButton = (
    <button
      className={styles.closeButton}
      onClick={() => router.back()}
    >
      <img src="/assets/icons/icon-close.svg" alt="" />
    </button>);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header title={"Suas preferências"} customButton={closeButton} />
      </div>
      <div className={styles.form}>
        <FilterForm/>
      </div>
      <div className={styles.footer}>
        <NavBar/>
      </div>
    </div>
  );
}