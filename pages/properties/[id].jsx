import styles from "./[id].module.css"
import { Header } from "../components/Header/Header";
import { NavBar } from "../components/NavBar/NavBar";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Property() {
  const [property, setProperty] = useState(null);

  const router = useRouter();
  const propertyId = router.query.id

  useEffect(() => {
    fetchProperty()
  }, [router])

  const fetchProperty = () => {
    const options = { method: 'GET' };

    fetch(`/api/v1/${propertyId}`, options)
      .then(response => response.json())
      .then(response => setProperty(response.result))
      .catch(err => console.error(err));
  }

  const backButton = (
    <button
      className={styles.backButton}
      onClick={() => router.back()}
    >
      <img src="/assets/icons/icon-back.svg" alt="" />
    </button>);

  function formatToEuros(number, decimalPlaces) {
    if (typeof decimalPlaces !== 'number' || decimalPlaces < 0) {
      decimalPlaces = 2;
    }

    const formattedNumber = number.toLocaleString('en-US', {
      style: 'decimal',
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });

    const formattedNumberWithEuro = `€ ${formattedNumber}`;
    return formattedNumberWithEuro;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header title={"Imóvel"} customButton={backButton} />
      </div>

      {property && (
        <div className={styles.card}>
          <h1 className={styles.name}>{property.name}</h1>
          <Image
            width={500}
            height={500}
            className={styles.img}
            src={property.img} alt="" />
          <div className={styles.info}>
            <div className={styles.address}>
              <p><span>Morada:</span> {property.address}, {property.locality}</p>
            </div>

            <p className={styles.price} >{property.business === "Comprar" ? <span> Valor da venda:</span> : <span> Valor da renda:</span>} {formatToEuros(property.price, 2)}</p>
            <div className={styles.types}>
              <p className={styles.type}><span>Tipo:</span> {property.type}</p>
              <p className={styles.typology}><span>Quartos:</span> {property.typology}</p>
            </div>
            <div className={styles.features}>
              <span>Características:</span>
              {property.features.map((feature, index) => <li key={index}>{feature}</li>)}
            </div>

            <p className={styles.owner}><span>Proprietário(a):</span> {property.owner}</p>
            <p className={styles.description}>{property.description}</p>

          </div>
        </div>
      )}
      <div className={styles.footer}>
        <NavBar />
      </div>
    </div>
  );
}