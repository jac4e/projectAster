import express from "express"

const app = express()

app.set("port", process.env.PORT || 8080)
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: `public`
    });
});
app.use((req, res) => {
    res.sendFile(req.path, {
        root: `public`
    });
});