import { Router } from "express";
import { userSchema } from "@repo/lib";

const route = Router();

route.post('/signin', async (req, res) => {
    userSchema.safe
});