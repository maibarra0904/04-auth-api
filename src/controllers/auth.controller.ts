import { Request, Response } from "express"
import User from "../models/auth.schema";

import * as bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {

    let {name, email, password} = req.body;

    const dataUser = {
        name,
        email,
        password: await bcrypt.hash(password, 10)
    }

    const newUser = new User(dataUser)
    
    try {

        let user = await User.findOne({email})

        if (user) {
            return res.status(400).json({error: "El email ya está registrado"})
        }


        newUser.save();    
        return res.status(200).json(newUser);
    } catch (error) {
        throw new Error("Hubo un error al guardar el punto")
    }
}