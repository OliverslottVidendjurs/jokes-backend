"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var jokes_1 = __importDefault(require("./routes/jokes"));
var cors_1 = __importDefault(require("cors"));
var PORT = 3000;
dotenv_1.default.config();
if (!process.env.dbUrl)
    throw new Error("dbUrl was not found in .env");
mongoose_1.default.connect(process.env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose_1.default.connection;
db.on("error", function (error) {
    console.error(error);
});
db.on("open", function () {
    console.log("connected to database");
});
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/jokes", jokes_1.default);
app.listen(PORT, function () { return console.log("Listning on port " + PORT); });
