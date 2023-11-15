import { useRouter } from "next/router";
import styles from "./FilterForm.module.css"
import { PriorityFilters } from "./PriorityFilters";
import { useState, useEffect } from "react"

const initialState = {
    priorityFilters: [
        { name: "Varanda", value: 0 },
        { name: "Lareira", value: 0 },
        { name: "Garagem", value: 0 },
        { name: "Piscina", value: 0 },
        { name: "Arrecadação", value: 0 },
        { name: "Terraço", value: 0 },
    ],
    currentLocation: "",
    currentPrice: "",
    selectedBusiness: "",
    selectedPropertyTypes: [
        {
            type: "Moradia",
            checked: false,
        },
        {
            type: "Apartamento",
            checked: false,
        },

    ],
    typologies: [
        {
            type: "T1",
            checked: false,
        },
        {
            type: "T2",
            checked: false,
        },
        {
            type: "T3",
            checked: false,
        }
    ]
}

export function FilterForm() {
    const [priorityFilters, setPriorityFilters] = useState(initialState.priorityFilters)
    const [currentLocation, setCurrentLocation] = useState(initialState.currentLocation)
    const [currentPrice, setCurrentPrice] = useState(initialState.currentPrice)
    const [selectedBusiness, setSelectedBusiness] = useState(initialState.selectedBusiness)
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState(initialState.selectedPropertyTypes)
    const [typologies, setTypologies] = useState(initialState.typologies)

    const setSelectedPriority = (selectedPriority, index) => {
        const updatedPriorityFilters = [...priorityFilters];
        updatedPriorityFilters[index] = selectedPriority;
        setPriorityFilters(updatedPriorityFilters);
    }

    const router = useRouter()

    useEffect(() => {
        const lastSearch = JSON.parse(localStorage.getItem("lastSearch")) ?? null

        if (lastSearch) {
            setFormState(lastSearch)
        }
    }, [router])

    const handlePropertyTypeChange = (propertyType) => {
        let newProperties = [
            ...selectedPropertyTypes
        ]

        let changedProperties = newProperties.map((property) => {
            if (property.type === propertyType) {
                return {
                    type: property.type,
                    checked: !property.checked
                }
            } else {
                return {
                    type: property.type,
                    checked: property.checked
                }
            }
        })

        setSelectedPropertyTypes(changedProperties)
    }

    const handleTypologyChange = (typologyType) => {
        let newProperties = [
            ...typologies
        ]

        let changedProperties = newProperties.map((typology) => {
            if (typology.type === typologyType) {
                return {
                    type: typology.type,
                    checked: !typology.checked
                }
            } else {
                return {
                    type: typology.type,
                    checked: false
                }
            }
        })
        setTypologies(changedProperties)
    }

    const getProperties = () => {
        fetchData()

        localStorage.setItem("lastSearch", JSON.stringify({
            priorityFilters,
            currentLocation,
            currentPrice,
            selectedBusiness,
            selectedPropertyTypes,
            typologies
        }))
    }

    async function fetchData() {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: selectedPropertyTypes.find(type => type.checked && type)?.type ?? '',
                price: currentPrice,
                typology: typologies.find(type => type.checked && type)?.type ?? '',
                locality: currentLocation,
                business: selectedBusiness,
                features: [
                    { name: priorityFilters[0].name, priority: priorityFilters[0].value },
                    { name: priorityFilters[1].name, priority: priorityFilters[1].value },
                    { name: priorityFilters[2].name, priority: priorityFilters[2].value },
                    { name: priorityFilters[3].name, priority: priorityFilters[3].value },
                    { name: priorityFilters[4].name, priority: priorityFilters[4].value },
                    { name: priorityFilters[5].name, priority: priorityFilters[5].value }]
            })
        };

        const res = await fetch('api/v1/search', options)
        if (res.status === 200) {
            const body = await res.json()
            localStorage.setItem('properties', JSON.stringify(body.result))
            router.push("home?filter=enable")
        }
    }

    const setFormState = ({
        priorityFilters,
        currentLocation,
        currentPrice,
        selectedBusiness,
        selectedPropertyTypes,
        typologies
    }) => {
        setPriorityFilters(priorityFilters)
        setCurrentLocation(currentLocation)
        setCurrentPrice(currentPrice)
        setSelectedBusiness(selectedBusiness)
        setSelectedPropertyTypes(selectedPropertyTypes)
        setTypologies(typologies)
    }

    return (
        <div className={styles.container}>
            <div className={styles.location}>
                <p>Localização</p>
                <input type="search" name="" id="" placeholder="Ex. Queluz" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} />
            </div>

            <div className={styles.business}>
                <button className={`${selectedBusiness === "Comprar" ? styles.selectecOption : ""}`} onClick={() => setSelectedBusiness(selectedBusiness === "Comprar" ? '' : "Comprar")}>Comprar</button>
                <button className={`${selectedBusiness === "Arrendar" ? styles.selectecOption : ""}`} onClick={() => setSelectedBusiness(selectedBusiness === "Arrendar" ? '' : "Arrendar")}>Arrendar</button>
            </div>

            <div className={styles.price}>
                <p>Valor máximo</p>
                <input type="number" name="" id="" placeholder="€" value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} />
            </div>

            <div className={styles.propertyType}>
                <p>Tipo de imóvel</p>
                {selectedPropertyTypes.map((property, index) =>
                    <div key={index} className={styles.option}>
                        <input type="checkbox" checked={property.checked} name={property.type} id={property.type} value={property.type} onChange={(e) => handlePropertyTypeChange(e.target.value)} />
                        <label htmlFor={property.type}>{property.type}</label>
                    </div>
                )}
            </div>

            <div className={styles.typology}>
                <p>Quartos</p>
                <div className={styles.buttons}>
                    {typologies.map((typology, index) => <button key={index}
                        className={`${typology.checked ? styles.selectecOption : ""}`}
                        onClick={() => handleTypologyChange(typology.type)}>{typology.type}</button>)}
                </div>
            </div>

            <div className={styles.features}>
                <p className={styles.featuresTitle}>Mais filtros</p>
                {priorityFilters.map((filter, i) =>
                    <div className={styles.filter} key={i}>
                        <p>{filter.name}</p>
                        <PriorityFilters setSelectedPriority={setSelectedPriority} priorities={{
                            index: i,
                            ...filter
                        }} />
                    </div>
                )}
            </div>

            <div className={styles.submit}>
                <button
                    onClick={() => {
                        setFormState(initialState)
                        localStorage.setItem("lastSearch", JSON.stringify(initialState))
                    }}
                    className={styles.resetButton}>Limpar</button>
                <button
                    onClick={() => getProperties()}
                    className={styles.submitButton}>Submeter</button>
            </div>
        </div>
    );
}