import express from 'express';
import UserController from '../controller/UserController.js'
import BookController from '../controller/BookController.js'

const router = express.Router();

router.get("/{id}", UserController.createUser);
router.post("/create", UserController.createUser);

router.post("/create", BookController.creatBook);

export default router;