import express, { Request, Response, NextFunction } from "express";
import { Configuration, OpenAIApi } from "openai";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import "dotenv/config";
const app: express.Application = express();
const port: number = 8000 || process.env.PORT;
const api_key: string = "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";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

console.log(process.env.OPENAI_API_KEY);
const configuration = new Configuration({
  organization: "org-6MSLzuqrhVELtOW42LBJeaFH",
  apiKey: api_key,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// Routes
app.post("/api", async (req: Request, res: Response, next: NextFunction) => {
  const { message } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 500,
    temperature: 0.9,
  });
  res.send({ message: response.data.choices[0].text });
  console.log(response.data.choices[0].text);
});

app.listen(port, () => {
  console.log(`Example app listening on port : ${port}`);
});
