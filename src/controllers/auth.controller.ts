import { Request, Response } from "express"
import User from "../models/auth.schema";

import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

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
            return res.status(400).json({
                success: false,
                error: "El email ya está registrado",
            })
        }


        newUser.save();    

        jwt.sign(
            {id: newUser._id}, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' },
            (err, token) => {
                if (err) return res.status(400).json({
                    success: false,
                    errors: {
                        msg: ["Hubo un error al crear el token"]
                    },
                    token: null
                });
                return res.status(200).json({
                    success: true,
                    errors: null,
                    token
                });
            }
        );
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            errors: {
                msg: ["Error en el servidor", error]
            },
            token: null
        });
    }
}

export const login = async (req: Request, res: Response) => {

    let {email, password} = req.body;
    
    try {

        let user = await User.findOne({email})

        if (!user || !bcrypt.compareSync( password, user.password)) {
            return res.status(400).json({
                success: false,
                errors: {
                    msg: ["Email o password incorrecto"]
                },
                token: null
            })
        }


        jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' },
            (err, token) => {
                if (err) res.status(400).json({
                    success: false,
                    errors: {
                        msg: ["Hubo un error al crear el token"]
                    },
                    token: null
                });
                res.status(200).json({
                    success: true,
                    errors: null,
                    token
                });
            }
        );
    } catch (error) {
        return res.status(500).json({
            success: false,
            errors: {
                msg: ["Error en el servidor", error]
            },
            token: null
        });
    }
}

export const changePassword = async (req: Request, res: Response ) => {
    res.status(200).json({
        success: true,
        errors: null,
    });
}

export const changeUsername = async (req: Request, res: Response ) => {}