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

  const languages = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "C", value: "c" },
    { label: "C++", value: "c++" },
    { label: "HTML", value: "html" },
    { label: "PHP", value: "php" },
    { label: "Java", value: "java" },
    {label: "C#", value: "csharp"},
    {label:"SQL", value: "sql"},
    {label:"Rust", value: "rust"},
  ];

  return (
    <div className="flex w-full h-500 p-4">
     
      <div className="w-1/6 bg-gray-200 p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Languages</h2>
        <ul>
          {languages.map((lang) => (
            <li
              key={lang.value}
              className={`p-2 cursor-pointer rounded ${
                language === lang.value ? "bg-gray-300 font-bold" : ""
              }`}
              onClick={() => setLanguage(lang.value)}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      </div>

     
      <div className="flex-1 p-4 flex flex-col">
        <div className="mb-4 flex justify-start items-center gap-4">
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

          <button
            className="p-2 bg-brandPrimary text-white rounded"
            onClick={handleRunCode}
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run Code"}
          </button>
        </div>

        <div className="flex gap-5 flex-1">
         
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

         
          <div className="flex-1 bg-gray-100 p-4 border border-gray-300 overflow-auto">
            <h3 className="text-lg font-bold mb-2">Output:</h3>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCompiler;
