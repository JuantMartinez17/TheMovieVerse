import { Router } from "express";
import { ReviewsController } from "../controllers/reviews.js"
export const reviewsRouter = Router();

reviewsRouter.get("/", ReviewsController.getAll);
reviewsRouter.get("/:id", ReviewsController.getById);
reviewsRouter.get("/movie/:movieId", ReviewsController.getByMovieId);
reviewsRouter.get("/user/:userId", ReviewsController.getByUserId);
reviewsRouter.post("/", ReviewsController.create);
reviewsRouter.patch("/:id", ReviewsController.update);
reviewsRouter.delete("/:id", ReviewsController.delete);