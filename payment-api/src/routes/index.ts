import { Router } from "express";
import { paymentRoute } from "./payment.routes";

const routes = Router();

routes.use("/payment", paymentRoute);

export { routes };
