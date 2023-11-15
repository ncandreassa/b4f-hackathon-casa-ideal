import styles from "./NavBar.module.css"
import Link from "next/link";

export function NavBar() {
    return (
        <div className={styles.container}>
            <Link
                href="#"
                className={styles.button}
            >
                <img src="/assets/icons/icon-user.svg" alt="" />
            </Link>

            <Link href="/home"
                className={styles.button}
            >
                <img src="/assets/icons/icon-home.svg" alt="" />
            </Link>

            <Link href="#"
                className={styles.button}
            >
                <img src="/assets/icons/icon-plus.svg" alt="" />
            </Link>

            <Link href="#"
                className={styles.button}
            >
                <img src="/assets/icons/icon-list.svg" alt="" />
            </Link>
        </div>
    )
}
