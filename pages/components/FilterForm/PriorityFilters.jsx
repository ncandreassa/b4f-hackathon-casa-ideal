import styles from "./PriorityFilters.module.css"

export function PriorityFilters({ priorities, setSelectedPriority }) {
    const onButtonClicked = (value) => {
        if (value === priorities.value) {
            value = 0
        }

        setSelectedPriority({
            name: priorities.name,
            value
        }, priorities.index)
    }

    return (
        <div className={styles.container}>
            <button><img src={`/assets/icons/icon-${(priorities.value === 1 || priorities.value === 2 || priorities.value === 3) ? "house-fill" : "house"}.svg`} onClick={() => onButtonClicked(1)} /></button>
            <button><img src={`/assets/icons/icon-${(priorities.value == 2 || priorities.value === 3) ? "house-fill" : "house"}.svg`} onClick={() => onButtonClicked(2)} /></button>
            <button><img src={`/assets/icons/icon-${priorities.value == 3 ? "house-fill" : "house"}.svg`} onClick={() => onButtonClicked(3)} /></button>
        </div>
    );
}