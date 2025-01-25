import { client, account } from "./appwrite";

async function getUsername() {
    try {
        const user = await account.get();
        return(user.name)
    } catch (error) {
        console.error(error);
    }
};
export default getUsername