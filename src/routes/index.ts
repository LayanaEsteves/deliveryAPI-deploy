import { Router } from "express";
import { deliveriesRoutes } from "./deliveries-routes";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { deliveryLogsRoutes } from "./delivery-logs-routes"

const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/deliveries", deliveriesRoutes)
routes.use("/delivery-logs", deliveryLogsRoutes)

export { routes }