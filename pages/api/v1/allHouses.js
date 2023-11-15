import { GetAllHouses } from "@/database/CRUD"

export default async (req, res) => {
    try{
        if(req.method === 'GET'){
            const result = await GetAllHouses()
            res.status(200).json({result})
        }
    } catch (err){
        console.log(err)
    }
}