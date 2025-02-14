import Express, { json } from "express";

const app = Express();
app.use(json());


app.get('/', (req, res) => {
    res.json({
        message: "Welcome Server home path"
    });
})

app.post('/', (req, res) => {
    res.json({
        message: "Post Server home path"
    });
})

async function main() {
    app.listen(3000);
}

main();