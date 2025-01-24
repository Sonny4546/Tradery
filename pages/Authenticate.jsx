import { Account } from "appwrite";
import { useNavigate } from "react-router-dom";
import { Client, OAuthProvider } from 'appwrite'

const client = new Client()
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('678ba12f001dce105c6a')
export { OAuthProvider }

const account = new Account(client);

export const CheckSession = async () => {
  try {
    const sessionid = await account.getSession()
    console.log(sessionid)
  } catch (error) {
    console.error(error)
    useNavigate("/")
  }
}

CheckSession()