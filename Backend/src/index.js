import connectDb from "./database/index"
import RiotApi from "./riot/RiotApi"
import { createServer } from "./server/index"
import routes from "./routes"
const databaseOptionsDocker = {
    host: "database",
    port: 27017,
    name: 'league-prof'
}
const start = async () => {
    const server = createServer();
    const databaseApi = await connectDb(databaseOptionsDocker);
    const api = new RiotApi(process.env.RIOT_API_TOKEN, databaseApi);
    if (process.env.NODE_ENV === "production") {

    } else {
        server.use((req, res, next) => {

            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Allow-Methods", "*");
            res.header("Access-Control-Allow-Origin", "*");
            next();
        });
    }
    for (const route of routes)
        server.use(route.path, route.handler(api, databaseApi));

    const port = process.env.PORT || 3005
    server.listen(port, () => console.log("server ready on", port))
}

start().then(() => null)