import React from 'react';
import { Models, Query, ID } from 'appwrite';
import { database } from './appwrite';
import { TraderyItems } from './ItemsInterface';
import { deleteFileById } from './storage';

export interface TraderyProfiles {
    $id: string;
    profileName: string;
    profileImageId: string;
    profileSummary: string;
    profileImageWidth: number;
    profileImageHeight: number;
}

export async function createProfileData(userId: string, item: Omit<TraderyProfiles, '$id'>) {
    const document = await database.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID, userId, item);
    return {
        userdb: mapDocumentToItem(document)
    }
}

export async function getUserDataById(itemsId: TraderyProfiles['$id']) {
    const document = await database.getDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID, itemsId);
    return {
        userdb: mapDocumentToItem(document)
    }
}

export async function updateUserData(userId: string, item: Omit<TraderyProfiles, '$id'>) {
    const document = await database.updateDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID, userId, item);
    return {
        userdb: mapDocumentToItem(document)
    }
}

function mapDocumentToItem(document: Models.Document) {
    const items: TraderyProfiles = {
        $id: document.$id,
        profileName: document.profileName,
        profileImageId: document.profileImageId,
        profileSummary: document.profileSummary,
        profileImageWidth: document.profileImageWidth,
        profileImageHeight: document.profileImageHeight,
    }
    return items;
}