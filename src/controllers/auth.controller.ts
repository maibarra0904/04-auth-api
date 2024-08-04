import { Request, Response } from "express"
import authSchema from "../models/auth.schema";

export const register = async (req: Request, res: Response) => {

    let params = req.body;

    const punto = new authSchema(params)
    
    try {

        let user = await authSchema.findOne({email: params.email})

        if (user) {
            return res.status(400).json({error: "El email ya está registrado"})
        }

        punto.save();    
        return res.status(200).json(punto);
    } catch (error) {
        throw new Error("Hubo un error al guardar el punto")
    }
}