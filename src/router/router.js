import express from 'express';
import UserController from '../controller/UserController.js'
import BookController from '../controller/BookController.js'
import AuthService from "../service/AuthService.js";

const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.registerUser);

router.get("/user", AuthService.authentication, UserController.getUser);
router.put("/user/:id", AuthService.authentication, UserController.updateUser);
router.delete("/user/:id", AuthService.authentication, UserController.deleteUser);

router.get("/book", AuthService.authentication, BookController.listBooks);
router.get("/book/finished", AuthService.authentication, BookController.listReadBooks);
router.post("/book", AuthService.authentication, BookController.creatBook);
router.put("/book/:id", AuthService.authentication, BookController.updateBook);
router.delete("/book/:id", AuthService.authentication, BookController.deleteBook);
router.post("/book/:id", AuthService.authentication, BookController.finishBook);

export default router;