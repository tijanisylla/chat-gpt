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
const app = (0, express_1.default)();
const port = 8000;
const api_key = "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";
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const configuration = new openai_1.Configuration({
    organization: "org-6MSLzuqrhVELtOW42LBJeaFH",
    apiKey: api_key,
});
const openai = new openai_1.OpenAIApi(configuration);
// const response = await openai.listEngines();
// Routes
app.post("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    const response = yield openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500,
        temperature: 0,
    });
    res.send(response.data.choices[0].text);
    console.log(response.data.choices[0].text);
}));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
