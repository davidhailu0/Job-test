"use client";
import { SanityClient, createClient } from "next-sanity";
import dynamic from "next/dynamic";
import { ChangeEvent, FormEvent, useEffect, useReducer } from "react";
import ReactPlayer from "react-player";
import config from "@/util/senity.config";

type State = {
  firstName: string;
  lastName: string;
  address: string;
  amount: string;
  submitted: boolean;
  showAlert: false;
};

type User = {
  _type: string;
  first_name: string;
  last_name: string;
  address: string;
  amount: string;
};

type Action = {
  type: string;
  payload: string | boolean;
};
const reducer = (state: State, action: Action) => {
  return { ...state, [action.type]: action.payload };
};
function Donate() {
  const [state, dispatch] = useReducer(reducer, {
    firstName: " ",
    lastName: " ",
    address: " ",
    amount: "0",
    submitted: false,
    showAlert: false,
  });
  useEffect(() => {}, []);

  const submitAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Object.values(state).forEach((val) => {
      if (val.toString().trim() == "" || val.toString().trim() == "0") {
        dispatch({ type: "submitted", payload: true });
        return;
      }
    });
    const client: SanityClient = createClient(config);
    const newUser: User = {
      _type: "user",
      first_name: state.firstName,
      last_name: state.lastName,
      address: state.address,
      amount: state.amount,
    };
    await client.create(newUser, {
      token: process.env.NEXT_PUBLIC_TOKEN,
    });
    dispatch({ type: "showAlert", payload: true });
    setTimeout(() => {
      dispatch({ type: "showAlert", payload: false });
    }, 3000);
    dispatch({ type: "firstName", payload: " " });
    dispatch({ type: "lastName", payload: " " });
    dispatch({ type: "address", payload: " " });
    dispatch({ type: "amount", payload: "0" });
    dispatch({ type: "submitted", payload: false });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };
  return (
    <div className="flex w-full h-[100vh] sm:flex-col md:flex-row">
      {state.showAlert && (
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md absolute top-0 left-0 right-0"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">User has been Successfully registered</p>
            </div>
          </div>
        </div>
      )}
      <div className="sm:w-full md:w-6/12 flex justify-center items-center">
        <form className="w-full max-w-lg" onSubmit={submitAction}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                className={
                  (state.submitted && state.firstName.trim() == ""
                    ? "border-red-500 "
                    : "") +
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                }
                id="grid-first-name"
                type="text"
                name="firstName"
                placeholder="Abebe"
                onChange={handleChange}
              />
              {state.submitted && state.firstName.trim() == "" && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                className={
                  (state.submitted && state.lastName.trim() == ""
                    ? "border-red-500 "
                    : "") +
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                }
                id="grid-last-name"
                type="text"
                name="lastName"
                onChange={handleChange}
                placeholder="Kebede"
              />
              {state.submitted && state.lastName.trim() == "" && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-address"
              >
                Address
              </label>
              <input
                className={
                  (state.submitted && state.address.trim() == ""
                    ? "border-red-500 "
                    : "") +
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                }
                id="grid-address"
                type="text"
                name="address"
                onChange={handleChange}
                placeholder="Addis Ababa"
              />
              {state.submitted && state.address.trim() == "" && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-amount"
              >
                Amount
              </label>
              <input
                className={
                  (state.submitted && state.amount.trim() == "0"
                    ? "border-red-500 "
                    : "") +
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                }
                id="grid-amount"
                type="number"
                name="amount"
                onChange={handleChange}
                placeholder="100 Birr"
              />
              {state.submitted && state.amount.trim() == "0" && (
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              )}
            </div>
          </div>
          <div
            className="flex w-full
            justify-center"
          >
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="sm:w-full md:w-6/12 flex justify-center items-center flex-col">
        <ReactPlayer
          url={
            "https://www.youtube.com/watch?v=5jj4GjMC7cE&pp=ygURY2hhcml0eSBhbmltYXRpb24%3D"
          }
          controls={false}
          playing={true}
          height={"50%"}
          width={"100%"}
        />
        <p className="w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          corrupti nostrum maiores placeat? At, debitis eius aspernatur eveniet
          eaque est inventore laborum perferendis illum voluptatum quod magnam,
          unde dolore asperiores.
        </p>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Donate), {
  ssr: false,
});
