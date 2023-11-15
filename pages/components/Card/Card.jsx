import styles from "./Card.module.css"
import Image from "next/image"
import Link from "next/link";

export function Card({ property }) {
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
        <Link 
        className={styles.container}
        href={`/properties/${property._id}`}>
            <Image 
            width={500}
            height={500}
            className={styles.img} 
            src={property.img} alt="" />
            <div className={styles.info}>
                <p className={styles.type}>{property.type}</p>
                <h1 className={styles.name}>{property.name}</h1>
                <p className={styles.address}>{property.address}</p>
                <p className={styles.typology}>{property.typology}</p>
                <p className={styles.price} >Valor {formatToEuros(property.price, 2)}</p>
            </div>
        </Link>
    );
}