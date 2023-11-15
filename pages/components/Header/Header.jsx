import styles from "./Header.module.css"

export function Header({ title, customButton }) {
    return (
      <div className={styles.container}>
        <div className={styles.button}>{customButton}</div>
        <h1 className={styles.title}>{title}</h1>
      </div>
    );
  }