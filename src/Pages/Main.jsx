import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative"></div>
      <div className="bg-red-50 h-50 w-[70%] text-center rounded-xl text-[30px] border-black p-4 border-4 m-auto mt-10 font-bold">
        Port99
      </div>
      <div className="grid grid-cols-2 mt-10 w-[70%] m-auto gap-6">
        <div className="bg-red-50 w-[100%] text-center rounded-xl text-[15px] border-black p-4 border-4 font-bold">
          Login
        </div>
        <div className="bg-red-50 w-[100%] text-center rounded-xl text-[15px] border-black p-4 border-4  font-bold">
          Sign-up
        </div>
      </div>
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="grid grid-cols-2 mb-20">
            <div className="w-80 bg-white shadow rounded border border-transparent hover:border-blue-500 cursor-pointer mr-20">
              <div className="h-48 w-full checker-bg flex items-center justify-center p-4 text-blue-500">
                <div className="w-32 h-32 bg-gray-100 rounded-full bg-cover bg-center"></div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <h1 className="text-gray-600 font-medium text-center"> Liar</h1>
              </div>
            </div>
            <div
              onClick={() => {
                navigate("/estarlist");
              }}
              className="w-80 bg-white shadow rounded border border-transparent hover:border-blue-500 cursor-pointer ml-20"
            >
              <div className="h-48 w-full checker-bg flex items-center justify-center p-4 text-blue-500">
                <div className="w-32 h-32 bg-gray-100 rounded-full bg-cover bg-center"></div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h1 className="text-gray-600 font-medium"> Estargram</h1>
                  <button className="text-gray-500 hover:text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
