import "./App.css";
import { useState, useEffect } from "react";
const { Configuration, OpenAIApi } = require("openai");

const App = () => {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: "What day is it?",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((res) => {
        setAnswer(res.data.choices[0].text);
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>What day is it?</p>
          Answer: {answer}
        </header>
      </div>
    </>
  );
};

export default App;
