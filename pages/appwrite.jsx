import { useNavigate } from "react-router-dom";
import { Account, Client, OAuthProvider, Storage } from 'appwrite'

export const client = new Client()
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('678ba12f001dce105c6a')
export { OAuthProvider }

export const storage = new Storage(client)
export const account = new Account(client);

export async function CheckSession() {
  try {
    const sessionid = await account.getSession('current')
    console.log(sessionid)
  } catch (error) {
    console.error(error)
    useNavigate("/")
  }
};