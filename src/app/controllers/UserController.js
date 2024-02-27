/* 
store: cadastrar/criar
index : listar vários
show : mostrar um apenas
update : atualizar
delete : deletar 
*/

import { v4 } from "uuid"
import User from "../models/User"
import * as Yup from 'yup'

class UserController {
    async store(request, response) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean(),
        })

        /* if (!(await schema.validate(request.body))) {
            return response.status(400).json({ erro: "" })
        } */

        try{
            await schema.validateSync(request.body,{abortEarly:false})
        }catch(err){
            return response.status(400).json({error:err.errors})
        }

        const { name, email, password, admin } = request.body 

        const usereExiste = await User.findOne({
            where:{email}
        })

        if(usereExiste){
            return response.status(400).json({error:"User already exists"})
        }

        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin
        })

        return response.status(201).json({ id: user.id, name, email, admin })
    }
}

export default new UserController()