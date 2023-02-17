import express, { Request, Response, NextFunction } from "express";
import { Configuration, OpenAIApi } from "openai";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import "dotenv/config";
const app: express.Application = express();
const port: number = 5050 || process.env.PORT;
const api_key = process.env.OPENAI_API_KEY as string;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// console.log(process.env.OPENAI_API_KEY);
const configuration: Configuration = new Configuration({
  organization: "org-6MSLzuqrhVELtOW42LBJeaFH",
  apiKey: api_key,
});

const openai: OpenAIApi = new OpenAIApi(configuration);
// Routes
app.post("/api", async (req: Request, res: Response, next: NextFunction) => {
  const { message } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 3000,
      temperature: 0.9,
    });
    next();
    console.log(response.data.choices[0].text);
    res.send({ message: response.data.choices[0].text });
  } catch (error) {
    res.send({ message: "Sorry, There was an erro " + " " + error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port : ${port}`);
});
