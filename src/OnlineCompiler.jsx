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
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 text-2xl font-bold flex justify-between items-center">
        <span>Online Compiler</span>
        <button
          className="md:hidden p-2 bg-gray-200 rounded"
          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
        >
          Languages
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            isLanguageMenuOpen ? "block" : "hidden"
          } md:block w-full md:w-1/4 bg-gray-100 border-r border-gray-300 p-4 flex flex-col`}
        >
          <h2 className="text-lg font-semibold mb-4">Languages</h2>
          <ul className="flex flex-col gap-2">
            {["javascript", "html", "php", "python", "c", "c++"].map((lang) => (
              <li
                key={lang}
                className={`p-2 rounded cursor-pointer ${
                  language === lang ? "bg-brandPrimary text-white" : "bg-gray-200"
                }`}
                onClick={() => {
                  setLanguage(lang);
                  setIsLanguageMenuOpen(false); // Close the menu on language select
                }}
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center p-6">
          <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
            {/* Code Editor */}
            <div className="w-full md:w-2/2">
              <div className="flex justify-between mb-2">
                <span className="text-lg font-semibold">{language.toUpperCase()}</span>
                <button
                  className="px-6 py-2 bg-brandPrimary text-white rounded hover:bg-brandPrimaryDark"
                  onClick={handleRunCode}
                  disabled={isLoading}
                >
                  {isLoading ? "Running..." : "Run Code"}
                </button>
              </div>
              <AceEditor
                mode={language === "c++" ? "c_cpp" : language}
                theme={theme}
                onChange={handleCodeChange}
                width="100%"
                height="400px"
                fontSize={16}
                value={code}
                setOptions={{
                  showLineNumbers: true,
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  tabSize: 2,
                }}
                className="border border-gray-300 rounded-md"
              />
            </div>

            {/* Output Section */}
            <div className="w-full md:w-1/2">
              <h3 className="text-lg font-semibold mb-4">Output:</h3>
              <div className="bg-gray-100 p-4 border border-gray-300 rounded-md h-96 overflow-auto">
                <pre>{output}</pre>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OnlineCompiler;
