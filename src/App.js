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
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello world" }],
        temperature: 0.7,
        max_tokens: 256,
      })
      .then((res) => {
        setAnswer(JSON.stringify(res.data.choices[0].message));  
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>role: user, content: Hello world</p>
          Answer: {answer}
        </header>
      </div>
    </>
  );
};

export default App;
