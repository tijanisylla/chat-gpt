"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openai_1 = require("openai");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = 5050 || process.env.PORT;
const api_key = process.env.OPENAI_API_KEY;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// console.log(process.env.OPENAI_API_KEY);
const configuration = new openai_1.Configuration({
    organization: "org-6MSLzuqrhVELtOW42LBJeaFH",
    apiKey: api_key,
});
const openai = new openai_1.OpenAIApi(configuration);
// Routes
app.post("/api", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    try {
        const response = yield openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            max_tokens: 3000,
            temperature: 0.9,
        });
        next();
        console.log(response.data.choices[0].text);
        res.send({ message: response.data.choices[0].text });
    }
    catch (error) {
        res.send({ message: "Sorry, There was an erro " + " " + error });
    }
}));
app.listen(port, () => {
    console.log(`Example app listening on port : ${port}`);
});
