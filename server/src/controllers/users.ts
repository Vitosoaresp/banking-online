import { Request, Response } from 'express';
import { IUserLogin } from '../interfaces/user';
import * as userService from '../service/users';

export const login = async (req: Request<unknown, unknown, IUserLogin>, res: Response) => {
  try {
    const { username, password } = req.body;
    const { code, message, data } = await userService.login(username, password);
    if (message) {
      return res.status(code).json({ message });
    }
    return res.status(code).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno' });
  }
};

export const register = async (req: Request<unknown, unknown, IUserLogin>, res: Response) => {
  try {
    const { username, password } = req.body;
    const { code, message } = await userService.createUsers(username, password);
    return res.status(code).json({ message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro interno' });
  }
}

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const { code, data } = await userService.getUsers();
    return res.status(code).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno' });
  }
}

export const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { code, data } = await userService.getUserById(Number(id));
    return res.status(code).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno' });
  }
}
