import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";

const OnlineCompiler = () => {
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("monokai");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (newValue) => {
    setCode(newValue);
  };

  const handleRunCode = async () => {
    if (!code.trim() || !language) {
      setOutput("Please provide code and select a language.");
      return;
    }

    setIsLoading(true);
    setOutput("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v2/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      setOutput(result.output || "No output from the code.");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-20 flex w-full flex-col">
      <h2 className="text-2xl mb-4">Online Compiler</h2>

      <div className="mb-10 text-center flex">
        <label>
          Select Theme
          <select
            className="p-2 border border-gray-500 ml-2"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="monokai">Monokai</option>
            <option value="github">Github</option>
            <option value="solarized_dark">Solarized Dark</option>
          </select>
        </label>

        <label className="ml-4">
          Select Language
          <select
            className="p-2 border border-gray-500 ml-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">Javascript</option>
            <option value="html">HTML</option>
            <option value="php">PHP</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
          </select>
        </label>

        <button
          className="p-2 bg-brandPrimary text-white rounded ml-4 self-center mt-2"
          onClick={handleRunCode}
          disabled={isLoading}
        >
          {isLoading ? "Running..." : "Run Code"}
        </button>
      </div>

      <div className="flex flex-1 gap-5">
        <AceEditor
          mode={language === "c++" ? "c_cpp" : language}
          theme={theme}
          onChange={handleCodeChange}
          width="50%"
          height="500px"
          fontSize={20}
          value={code}
          setOptions={{
            showLineNumbers: true,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            tabSize: 2,
          }}
        />

        <div className="mt-5 flex flex-1 flex-col">
          <h3>Output:</h3>
          <div className="bg-gray-100 p-5 overflow-auto h-64 border border-gray-300">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCompiler;
