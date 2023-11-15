import { GetTheHouseById } from "@/database/CRUD"

export default async (req, res) => {
    try {
        if(req.method === 'GET'){
            const houseId = req.query.theHouse
            const result = await GetTheHouseById(houseId)
            res.status(200).json({result})
        }
    } catch (err){
        console.log(err)
    }
}