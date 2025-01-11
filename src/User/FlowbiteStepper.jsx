import React from "react";

const FlowbiteStepper = ({ topics, visitedTopics, selectedTopic, handleTopicClick }) => {
  return (
    <div className="flex flex-col items-center">
      <ol className="relative text-gray-500 space-y-4">
        {topics.map((topic) => (
          <li
            key={topic.id}
            className="flex items-center cursor-pointer"
            onClick={() => handleTopicClick(topic)} // Call the parent function
          >
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-full ring-4 ring-white dark:ring-gray-900 ${
                visitedTopics.includes(topic.id)
                  ? "bg-green-200 dark:bg-green-900"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              <svg
                className={`w-5 h-5 ${
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
            <span
              className={`ml-4 text-sm font-medium ${
                selectedTopic?.id === topic.id
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {topic.topic_name}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FlowbiteStepper;
