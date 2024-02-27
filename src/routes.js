import { Router } from "express"
import multer from "multer"
import multerconfig from './config/multer'


import UserController from "./app/controllers/UserController"
import SessionController from "./app/controllers/SessionController"
import ProductController from "./app/controllers/ProductController"

const upload = multer(multerconfig)

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)
routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

export default routes
