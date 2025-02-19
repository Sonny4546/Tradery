import React from 'react';
import { Models, Query, ID } from 'appwrite';
import { database } from './appwrite';
import { TraderyItems } from './ItemsInterface';
import { deleteFileById } from './storage';

interface TraderyProfiles {
    $id: string;
    profileImageId: string;
    profileSummary: string;
    profileImageWidth: string;
    profileImageHeight: string;
}

export async function createProfileData(item: Omit<TraderyProfiles, '$id'>) {
    const document = await database.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID, ID.unique(), item);
    return {
        items: mapDocumentToItem(document)
    }
}

export async function searchProfileData(item: Omit<TraderyProfiles, '$id'>) {
    const document = await database.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID, ID.unique(), item);
    return {
        items: mapDocumentToItem(document)
    }
}

function mapDocumentToItem(document: Models.Document) {
    const items: TraderyProfiles = {
        $id: document.$id,
        profileImageId: document.profileImageId,
        profileSummary: document.profileSummary,
        profileImageWidth: document.profileImageWidth,
        profileImageHeight: document.profileImageHeight,
    }
    return items;
}