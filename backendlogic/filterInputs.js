import { GetAllHouses, GetHousesByFilter } from "@/database/CRUD"

export async function filterInputs(info) {
    const infoTreatment = {
        type: info.type === '' ? ['Apartamento', 'Moradia'] : info.type,
        price: info.price === '' ? 999999 : info.price,
        typology: info.typology === '' ? ['T1', 'T2', 'T3'] : info.typology,
        locality: info.locality,
        business: info.business === '' ? ['Comprar', 'Arrendar'] : info.business
    }

    let filteredHouses

    if (info.type === '' && info.price === '' && info.typology === '' && info.locality === '' && info.business === ''){
        filteredHouses = await GetAllHouses()
    } else {
        filteredHouses = await GetHousesByFilter(infoTreatment)
    }
        
    let result1 = []
    let result2 = []
    let result3 = []

    const priority1 = info.features.filter(item => item.priority === 1)//troca para === 1 estava <= 1
    const priority2 = info.features.filter(item => item.priority === 2)
    const priority3 = info.features.filter(item => item.priority > 2)
    
    if (priority1.length > 0) {

        const priority1Array = []
        priority1.forEach((value) => priority1Array.push(value.name))


        const filtered = priority1Array.map(word => filteredHouses.filter(imovel => imovel.features.reduce((acc, feature) =>
            feature.includes(word) ? acc = imovel : acc, 0))).flat()

        result1 = filtered
    }

    if (priority2.length > 0) {

        const priority2Array = []
        priority2.forEach(value => priority2Array.push(value.name))

        const filtered = priority2Array.map(word => filteredHouses.filter(imovel => imovel.features.reduce((acc, feature) =>
            feature.includes(word) ? acc = imovel : acc, 0))).flat()

        result2 = filtered
    }
    if (priority3.length > 0) {
        const priority3Array = []
        priority3.forEach((value) => priority3Array.push(value.name))

        const filtered = priority3Array.map(word => filteredHouses.filter(imovel => imovel.features.reduce((acc, feature) =>
            feature.includes(word) ? acc = imovel : acc, 0))).flat()
        result3 = filtered
    }

    const joinAllResults = result3.concat(result2.concat(result1))
    if(joinAllResults.length === 0) return await GetHousesByFilter(infoTreatment)//add para quando o resultado das prioridades e 0

    return [...new Set(joinAllResults)]
}