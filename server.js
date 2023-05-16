const PORT = 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const { Configuration, OpenAIApi } = require("openai");
const { reset } = require("nodemon");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/completions", async (req, res) => {
  try {
    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.message }],
        temperature: 0.7,
        max_tokens: 256,
      })
      .then((completion) => {
        res.send(completion.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
