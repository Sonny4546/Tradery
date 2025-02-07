import { Models } from 'appwrite';
import { getUser } from "../lib/appwrite";
import { TraderyUser } from './GetUser';

export async function fetchUserData() {
    const user = await getUser();

    if (!user) {
        console.error("User data is undefined");
        return null;
    }

    return mapUserToItem(user);
}

function mapUserToItem(user: Models.User<Models.Preferences>): TraderyUser {
    return {
        name: user.name
    };
}
