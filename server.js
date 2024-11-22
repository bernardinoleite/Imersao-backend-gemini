import express from "express";
import routes from "./src/routes/posts.routes.js";
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.static('./uploads'))
routes(app);

app.listen(2908, () => {
    console.log("servidor escutando");
});