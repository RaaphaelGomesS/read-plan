import UserService from "../service/UserService.js";

export async function getUser(req, res, next) {
    try {
        const user = await UserService.findUserById(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export async function createUser(req, res, next) {
    try {
        const user = await UserService.createUser(req.body);
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export async function uodateUser(req, res, next) {
    
}

export async function login(req, res, next) {
    
}