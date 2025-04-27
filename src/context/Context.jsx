import { useState, createContext } from "react";
import { run } from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState(""); //save the input from the user
  const [recentPrompt, setRecentPrompt] = useState(""); //save the recent prompt
  const [prevPrompts, setPrevPrompts] = useState([]); //save the previous prompts to show in recent area
  const [showResult, setShowResult] = useState(false); //show the result area
  const [loading, setLoading] = useState(false); //show the loading spinner
  const [resultData, setResultData] = useState(""); //save the result data and show in the result area

  const newChat = () => {
    setRecentPrompt("");
    setInput("");
    setShowResult(false);
    setLoading(false);
  };

  const onSent = async (prompt) => {
    setLoading(true);
    setResultData("");
    setShowResult(true);
    let result;
    if (prompt !== undefined) {
      result = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setRecentPrompt(input);
      setPrevPrompts((prev) => [...prev, input]);
      result = await run(input);
    }
    setTimeout(() => {
      setLoading(false);
      setResultData(result);
      setInput("");
    }, 1000);
    // setShowResult(true);
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    loading,
    resultData,
    input,
    setInput,
    showResult,
    newChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
