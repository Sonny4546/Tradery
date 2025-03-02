import { Models, Query, ID } from 'appwrite';
import { database } from './appwrite';

export interface TraderyProfiles {
    userId: string;
    displayName?: string | null;
    defaultName: string;
    profileImageId: string;
    profileSummary?: string | null;
    profileImageWidth: number;
    profileImageHeight: number;
    userEmail: string;
}

export async function createProfileData(userId: string, item) {
    const document = await database.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID, userId, item);
    return {
        userdb: mapDocumentToItem(document)
    }
}

export async function getUserDataById(itemsId: TraderyProfiles['userId']) {
    const document = await database.getDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID, itemsId);
    return {
        userdb: mapDocumentToItem(document)
    }
}

export async function getUserDataByName(username: string) {
    const {documents} = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                    import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, 
                                                    [Query.contains('displayName', username)]);
    return{
        userdb: documents.map(mapDocumentToItem)
    }
}

export async function checkUserNameDuplicate(username: string) {
    try {
    const {documents} = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                    import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, 
                                                    [Query.contains('displayName', username)]);
    return !!documents;
    } catch (error) {
        return false;
    }
}

export async function findUserDataById(userId: string) {
    try {
        const document = await database.getDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID, 
            import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID, 
            userId
        );
        return !!document; // Returns true if document exists, false otherwise
    } catch (error) {
        return false; // Ensures function never throws an error
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
    const userdb: TraderyProfiles = {
        userId: document.$id,
        displayName: document.displayName,
        defaultName: document.defaultName,
        profileImageId: document.profileImageId,
        profileSummary: document.profileSummary,
        profileImageWidth: document.profileImageWidth,
        profileImageHeight: document.profileImageHeight,
        userEmail: document.userEmail,
    }
    return userdb;
}