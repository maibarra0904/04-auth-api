import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'

export const validateJWT = (req: Request | any, res: Response, next: NextFunction ) => {
    const token = req.header('Authorization') //?.split(' ')[1]

    if (!token) return res.status(401).json({ 
        success: false,
        error: 'No token provided',
        token: null
    })

    try {
        
        const payload: any = jwt.verify(token, process.env.JWT_SECRET)

        req.id = payload.id

        next()

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