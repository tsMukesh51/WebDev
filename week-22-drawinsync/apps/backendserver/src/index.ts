import Express, { json } from "express";
import { userRoute } from "./routes/userRoute";
import { boardRoute } from "./routes/boardRoute";

const app = Express();
app.use(json());


app.get('/', (req, res) => {
    res.json({
        message: "Welcome Server home path"
    });
})

app.use('/user', userRoute);
app.use('/board', boardRoute);

async function main() {
    app.listen(3000);
}

main();