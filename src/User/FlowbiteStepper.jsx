import React from "react";

const FlowbiteStepper = ({ topics, visitedTopics, selectedTopic }) => {
  return (
    <div className="flex flex-col items-center">
      <ol className="relative text-gray-500">
        {topics.map((topic) => (
          <li key={topic.id} className="mb-6">
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white dark:ring-gray-900 ${
                visitedTopics.includes(topic.id)
                  ? "bg-green-200 dark:bg-green-900"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${
                  visitedTopics.includes(topic.id)
                    ? "text-green-500 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FlowbiteStepper;
