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

const APP_URL = import.meta.env.VITE_REACT_APP_URL;

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
      const response = await fetch(`${APP_URL}/api/v2/execute`, {
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
    <div className="flex min-h-screen">
      {/* All Languages */}
      <div className="w-1/4 bg-gray-100 border-r border-gray-300 p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Languages</h2>
        <ul className="flex flex-col gap-2">
          {["javascript", "html", "php", "python", "c", "c++"].map((lang) => (
            <li
              key={lang}
              className={`p-2 rounded cursor-pointer ${
                language === lang ? "bg-brandPrimary text-white" : "bg-gray-200"
              }`}
              onClick={() => setLanguage(lang)}
            >
              {lang.toUpperCase()}
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-6">Themes</h2>
        <select
          className="p-2 border border-gray-500 mt-2"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="monokai">Monokai</option>
          <option value="github">Github</option>
          <option value="solarized_dark">Solarized Dark</option>
        </select>
      </div>

      {/* Write Code Here */}
      <div className="flex-1 flex flex-col p-4">
        <h2 className="text-2xl mb-4">Online Compiler</h2>

        {/* Run Code Button */}
        <div className="flex justify-center mb-4">
          <button
            className="p-2 bg-brandPrimary text-white rounded"
            onClick={handleRunCode}
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run Code"}
          </button>
        </div>

        <div className="flex flex-1 flex-col md:flex-row gap-5">
          <AceEditor
            mode={language === "c++" ? "c_cpp" : language}
            theme={theme}
            onChange={handleCodeChange}
            width="100%"
            height="100%"
            fontSize={16}
            value={code}
            setOptions={{
              showLineNumbers: true,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              tabSize: 2,
            }}
            className="md:w-1/2 h-full"
          />

          <div className="mt-5 flex flex-col w-full md:w-1/2">
            <h3 className="text-lg font-semibold">Output:</h3>
            <div className="bg-gray-100 p-5 overflow-auto h-full border border-gray-300">
              <pre>{output}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCompiler;
