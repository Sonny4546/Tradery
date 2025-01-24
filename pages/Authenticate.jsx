import { Account } from "appwrite";
import { client } from "./Login";
import { useNavigate } from "react-router-dom";

const account = new Account(client);

export const sessioncheck = async () => {
  try {
    await account.getSession()
    console.log(sessioncheck)
  } catch (error) {
    console.error(error)
    useNavigate("/")
  }
}