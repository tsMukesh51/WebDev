import { string, z } from "zod";

export const userSchema = z.object({
    fullName: z.string().min(5).max(40),
    password: z.string().min(6).max(24).refine((str) => {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&])[A-Za-z0-9@#$%^&]+$/.test(str);
    }),
    username: z.string().min(5).max(30).refine((str) => {
        return /^[A-Za-z0-9-_]$/.test(str);
    }),
    email: z.string().email().max(50)
});
