import express from 'express';
import UserController from '../controller/UserController.js'
import BookController from '../controller/BookController.js'

const router = express.Router();

router.get("/:id", UserController.getUser);
router.post("/login", UserController.login);
router.post("/create", UserController.register);
router.update("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

router.post("/book", BookController.creatBook);
router.post("/book", BookController.creatBook);
router.post("/book", BookController.creatBook);
router.post("/book", BookController.creatBook);

export default router;