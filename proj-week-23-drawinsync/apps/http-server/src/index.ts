import Express, { json } from "express";
import dotenv from "dotenv";
import { userRoute } from "./routes/userRoutes";
import { prismaClient } from "@repo/db/client";

import { boardRoute } from "./routes/boardRoutes";

const app = Express();
app.use(json());
dotenv.config();
const BACKEND_PORT = 3000;

app.use('/user', userRoute);
app.use('/board', boardRoute);

async function main() {
    try {
        await prismaClient.$connect();
        app.listen(BACKEND_PORT);
        console.log(`listing at ${BACKEND_PORT}`);
    } catch (err) {
        console.log(err);
    }
}

main();