require("dotenv").config();
const { router, express } = require("./routes/index");

const { Port } = process.env;

const app = express();
app.use(express.static(__dirname));
app.use(router);

app.listen(Port, () => console.log("app is started."));
