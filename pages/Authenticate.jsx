import { Account } from "appwrite";
import { useNavigate } from "react-router-dom";
import { Client, Account, OAuthProvider } from 'appwrite'

const client = new Client()
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('678ba12f001dce105c6a')
export { OAuthProvider }

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