import React from "react";
import { t } from "./theme";

interface ErrorsProps {
  errorType: number;
}

const Errors: React.FC<ErrorsProps> = ({ errorType }) => {
  const wrapper = "mt-12 text-center";

  switch (errorType) {
    case 404:
      return (
        <div className={wrapper}>
          <h1 className={`text-2xl font-bold ${t.text}`}>404 - Page Not Found</h1>
          <p className={`mt-2 ${t.textMuted}`}>
            Sorry, the page you are looking for does not exist.
          </p>
          <a
            href="/"
            className={`mt-4 inline-block text-sm font-medium underline-offset-4 hover:underline ${t.textBrand}`}
          >
            Go back to Home
          </a>
        </div>
      );
    case 500:
      return (
        <div className={wrapper}>
          <h1 className={`text-2xl font-bold ${t.text}`}>500 - Internal Server Error</h1>
          <p className={`mt-2 ${t.textMuted}`}>Oops! Something went wrong on our end.</p>
        </div>
      );
    default:
      return (
        <div className={wrapper}>
          <h1 className={`text-2xl font-bold ${t.text}`}>Unknown Error</h1>
          <p className={`mt-2 ${t.textMuted}`}>
            Something went wrong. Please try again later.
          </p>
        </div>
      );
  }
};

export default Errors;
