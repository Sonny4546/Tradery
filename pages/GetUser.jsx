import { Account } from "appwrite";
import { Client, OAuthProvider } from 'appwrite'

const client = new Client()
client
  .setEndpoint('https://cloud.appwrite.io/v1/account')
  .setProject('678ba12f001dce105c6a')
export { OAuthProvider }

const account = new Account(client);

async function getUsername() {
    try {
        const user = await account.get();
        return(user.name)
    } catch (error) {
        console.error(error);
    }
};

getUsername();