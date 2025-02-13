import Express, { json } from "express";

const app  = Express();

app.use(json());

app.get("/", (req, res) => {
    res.json({
        message: "Home Page"
    })
})

app.post("/signup", (req, res) => {
    res.json({
        message: "Sign Up Page"
    });
});

app.post("/signin", (req, res) => {
    res.json({
        message: "Sign In Page"
    });
});

app.post("/chat/*", (req, res) => {
    res.json({
        message: "Separate Chat"
    });
});

app.listen(3003);