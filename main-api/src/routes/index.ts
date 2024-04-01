import { Router } from "express";
import { userRoute } from "./user.routes";
import { postRoute } from "./post.routes";

const routes = Router();

routes.use("/user", userRoute);
routes.use("/post", postRoute);

export { routes };
