import Express, { json } from "express";
import { userRoute } from "./routes/userRoute";

const app = Express();
app.use(json());


app.get('/', (req, res) => {
    res.json({
        message: "Welcome Server home path"
    });
})

app.use('/user', userRoute);

async function main() {
    app.listen(3000);
}

main();