import { Router } from 'express';

import * as userController from '../controllers/users';


const routerUser = Router();

routerUser.get('/users/:id', userController.getUserById);
routerUser.get('/users', userController.getUsers);
routerUser.post('/login', userController.login);
routerUser.post('/register', userController.register);

export default routerUser;
