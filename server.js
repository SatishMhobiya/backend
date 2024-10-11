import { connectDB } from "./database/database.js";
import {app} from "./index.js";

//connecting to mongodb
connectDB();

app.listen(process.env.PORT, () => {
    console.log("Server is running")
})
