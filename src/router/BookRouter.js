import express from 'express';
import BookController from '../controller/BookController.js'
import AuthService from "../service/AuthService.js";

const router = express.Router();

router.get("/", AuthService.authentication, BookController.getListOfBooks);
router.get("/finished", AuthService.authentication, BookController.getListOfFinishedBooks);
router.post("/", AuthService.authentication, BookController.insertBooks);
router.delete("/:id", AuthService.authentication, BookController.deleteBook);
router.put("/:id", AuthService.authentication, BookController.finishBook);

export default router;