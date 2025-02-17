import z from "zod";

export const CreateUserSchema = z.object({
    username: z.string().min(3).max(35),
    fullName: z.string().min(5).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(24).refine((str) => {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&])[\w!@#$%^&]+$/.test(str);
    }, "Password must contain atleast 1 lowercase, uppercase, number, symbol from !@#$%^& and lenght 6 to 24")
});

export const SigninSchema = z.object({
    username: z.string().min(3).max(35),
    password: z.string().min(6).max(24).refine((str) => {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&])[\w!@#$%^&]+$/.test(str);
    }, "Password must contain atleast 1 lowercase, uppercase, number, symbol from !@#$%^& and lenght 6 to 24")
});

export const CreateBoard = z.object({
    boardName: z.string().min(3).max(25)
});