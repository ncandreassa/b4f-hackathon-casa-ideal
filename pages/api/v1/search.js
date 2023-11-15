import { filterInputs } from "@/backendlogic/filterInputs"


export default async (req, res) => {
    try{
        if(req.method === "POST"){
        const info = req.body
        const result = await filterInputs(info) 
        res.status(200).json({result: result})
        }
    } catch (err) {
        console.log(err)
    }
}
