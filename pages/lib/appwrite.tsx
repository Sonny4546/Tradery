import { useNavigate } from "react-router-dom";
import { Account, Client, OAuthProvider, Storage, Databases, Teams } from 'appwrite'

export const client = new Client()
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
export { OAuthProvider }

export const storage = new Storage(client);
export const account = new Account(client);
export const database = new Databases(client);
export const teams = new Teams(client)

export async function getCurrentSession() {
  const session = await account.getSession('current');
  return {
    session
  }
}

export const getUser = async () => {
  try {
    return await account.get()
  } catch (error) {
    console.error(error)
  }
};

export async function DeleteSession() {
  await account.deleteSession('current');
  console.log("log out");
}

export async function getUserPrefs() {
  const data = await account.getPrefs();
  console.log(data);
}