import { ObjectId } from "mongodb";
import { GetCollection } from "./MongoDbConnection";

export async function GetHousesByFilter(info) {
    const collection = await GetCollection("CasaIdeal", "imoveis");
    let result
    if (info.locality === '') {
        result = await collection.find(
            {
                type: Array.isArray(info.type) ? {$regex : /^|\s\K(?:info.type[0]|info.type[1]|\*)(?=\s|$)/ } : info.type,
                price: {$lte: Number(info.price)},
                typology: Array.isArray(info.typology) ? 
                {$regex : /^|\s\K(?:info.typology[0]|info.typology[1]|info.typology[2]|\*)(?=\s|$)/ } : info.typology,
                business: Array.isArray(info.business) ? {$regex : /^|\s\K(?:info.business[0]|info.business[1]|\*)(?=\s|$)/ } : info.business,
            }).toArray()
    } else {
        result = await collection.find(
            {
                type: Array.isArray(info.type) ? {$regex : /^|\s\K(?:info.type[0]|info.type[1]|\*)(?=\s|$)/ } : info.type,
                price: {$lte: Number(info.price)},
                typology: Array.isArray(info.typology) ? 
                {$regex : /^|\s\K(?:info.typology[0]|info.typology[1]|info.typology[2]|\*)(?=\s|$)/ } : info.typology,
                business: Array.isArray(info.business) ? {$regex : /^|\s\K(?:info.business[0]|info.business[1]|\*)(?=\s|$)/ } : info.business,
                locality: info.locality
            }
        ).toArray()
    }
    return result;
}

export async function GetAllHouses() {
    const collection = await GetCollection("CasaIdeal", "imoveis")
    const result = await collection.find().toArray()
    return result
}

export async function GetTheHouseById(houseId) {
    const collection = await GetCollection("CasaIdeal", "imoveis")
    const result = await collection.findOne({ _id: new ObjectId(houseId) })
    return result
}

//   {type: info.type},
//   {price: {$lte: info.price}},
//   {typology: info.typology},
//   {locality: info.locality},
//   {business: info.business},
//   {features: { $all: [filtered]}}

// {
//     type: info.type,
//     price: {$lte: info.price},
//     typology: info.typology,
//     locality: info.locality,
//     business: info.business,
// }

// business: {$elemMatch: info.business},
//                 locality: {$elemMatch: info.locality},
//                 price: {$lte: Number(info.price)},
//                 typology: {$elemMatch: info.typology},

// export async function GetHousesByFilter(info) {
//     const collection = await GetCollection("CasaIdeal", "imoveis");
//     let result
//     if (info.locality === '') {
//         result = await collection.find(
//             {type: info.type, business: info.business, typology: info.typology, price: { $lte: Number(info.price)}}).toArray()
//     } else {
//         result = await collection.find(
//             {
//                 type: info.type,
//                 business: info.business,
//                 locality: info.locality,
//                 price: {$lte: Number(info.price)},
//                 typology: info.typology ,
//             }
//         ).toArray()
//     }
//     return result;
// }