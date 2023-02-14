import express from "express";
const app = express();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        message: `Hello World from ${HOST}`,
        language: "Typescript",
        framework: "Express",
        success: true,
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
});
