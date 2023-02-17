import React from "react";
import { socialMediaAuth } from "../auth/auth";
import robot from "../assets/robot.png";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  YahooLoginButton,
} from "react-social-login-buttons";
import {
  googleProvider,
  facebookProvider,
  yahooProvider,
} from "../auth/authMethods";

export const Login: React.FC = () => {
  const handleAuth = async (provider: any) => {
    await socialMediaAuth(provider);
  };

  return (
    <div className="bg-white h-screen text-center ">
      <div className="bg-white inline-block justify-center py-4 w-1/2">
        <h2 className="text-3xl font-medium "> Welcome to ChatGPT-clone! </h2>

        <h3 className="py-4">
          ChatGPT is a chatbot launched by OpenAI in November 2022. It is built
          on top of OpenAI's GPT-3.5 family of large language models, and is
          fine-tuned with both supervised and reinforcement learning techniques.
        </h3>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a
            href="https://beta.openai.com/docs/introduction"
            target="_blank"
            rel="noreferrer"
          >
            OpenAI Documentation
          </a>
        </button>
      </div>

      <div className="flex items-center  justify-center ">
        <div className="py-4  flex  items-center justify-center ">
          <img src={robot} width="400" height="400" alt="robot" />
        </div>

        <div className=" w-1/2 py-4 flex items-center justify-center  ">
          <div className="py-4  p-10  w-4/2 rounded-lg shadow-xl text-gray-700">
            <h2 className="text-3xl font-medium text-center"> Join Today ! </h2>
            <h3 className="py-4"> Sign in with of the providers</h3>
            <p></p>
            <div className="flex flex-col gap-4">
              <GoogleLoginButton
                text="Sign in with Google"
                onClick={() => handleAuth(googleProvider)}
              />
              <FacebookLoginButton
                text="Sign in with Facbook"
                onClick={() => handleAuth(facebookProvider)}
              />

              <YahooLoginButton
                text="Sign in with Yahoo"
                onClick={() => handleAuth(yahooProvider)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
