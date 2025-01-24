import { Account } from "appwrite";
import { Client, OAuthProvider } from 'appwrite'

const client = new Client()
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('678ba12f001dce105c6a')
export { OAuthProvider }

const account = new Account(client);

export const getUsername = async () => {
    const userAccount = await account.get();
    const userAccountMap = userAccount.toMap();
    const name = userAccountMap["name"];
    return(name)
}