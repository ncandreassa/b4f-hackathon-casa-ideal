import styles from "./home.module.css"
import { Header } from "./components/Header/Header";
import { NavBar } from "./components/NavBar/NavBar";
import { useRouter } from 'next/router';
import { Card } from "./components/Card/Card";
import { useState, useEffect } from "react"

export default function Home() {
  const [properties, setProperties] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.query.filter === "enable") {
      const properties = JSON.parse(localStorage.getItem("properties")) ?? []
      setProperties(properties);
    } else {
      const options = { method: 'GET' };
      fetch('/api/v1/allHouses', options)
        .then(response => response.json())
        .then(response => setProperties(response.result))
        .catch(err => console.error(err));
    }
  }, [router])

  const filterButton = (
    <button
      className={styles.filterButton}
      onClick={() => router.push('/filter')}
    >
      <img src="/assets/icons/icon-filter.svg" alt="" />
    </button>);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header title={"Seus imóveis"} customButton={filterButton} />
      </div>
      <div className={styles.cards}>
        {(properties?.length === 0 && <h2 className={styles.notFound}>Não encontramos resultados!</h2>) || properties && properties.map((property, index) => <Card key={index} property={property} />)}
      </div>
      <div className={styles.footer}>
        <NavBar />
      </div>
    </div>
  );
}