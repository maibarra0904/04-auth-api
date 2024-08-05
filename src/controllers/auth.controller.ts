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

export const login = async (req: Request, res: Response) => {

    let {email, password} = req.body;
    
    try {

        let user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({error: "No existe usuario con ese email"})
        }

        if(!bcrypt.compareSync( password, user.password)) {
            return res.status(400).json({error: "Contraseña incorrecta"})
        }

        return res.status(200).json({msg: "Usuario Loggeado correctamente"});
    } catch (error) {
        throw new Error("Hubo un error al iniciar sesión")
    }
}