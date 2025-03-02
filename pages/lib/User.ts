import { Models } from 'appwrite';
import { getUser, teams } from "../lib/appwrite";
import { TraderyUser } from './GetUser';
import { useState } from 'react';

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
        name: user.name,
        $id: user.$id,
        email: user.email
    };
}

export async function getTeams() {
    const data = await teams.list();
    return {
      teams: data.teams
    }
}