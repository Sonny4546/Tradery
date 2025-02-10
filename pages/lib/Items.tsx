import React from 'react';
import { Models, Query, ID } from 'appwrite';
import { database } from './appwrite';
import { TraderyItems } from './ItemsInterface';

export async function getItems() {
    const {documents} = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ITEM_ID, 
                                                    import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, 
                                                    [Query.orderDesc('date'),]);
    return{
        items: documents.map(mapDocumentToItem)
    }
}

export async function getItemsbySearch(ItemSearch: string) {
    const {documents} = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ITEM_ID, 
                                                    import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, 
                                                    [Query.orderDesc('date'),Query.contains('name', ItemSearch),]);
    return{
        items: documents.map(mapDocumentToItem)
    }
}

export async function getItemsbyUser(userId: string) {
    const {documents} = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ITEM_ID, 
                                                    import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, 
                                                    [Query.contains('authorID', userId),]);
    return{
        items: documents.map(mapDocumentToItem)
    }
}

export async function getItemsById(itemsId: string) {
    const document = await database.getDocument(import.meta.env.VITE_APPWRITE_DATABASE_ITEM_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, itemsId);
    return {
        items: mapDocumentToItem(document)
    }
}

export async function createItems(item: Omit<TraderyItems, '$id'>) {
    const document = await database.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ITEM_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, ID.unique(), item);
    return {
        items: mapDocumentToItem(document)
    }
}

export async function addRequest(itemsId: string, item: Omit<TraderyItems, '$id, author, authorID, description, date, imageHeight, imageWidth, imageFileId'>){
    const document = await database.updateDocument(import.meta.env.VITE_APPWRITE_DATABASE_ITEM_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, itemsId, item);
    return {
        items: mapDocumentToItem(document)
    }
}

function mapDocumentToItem(document: Models.Document) {
    const items: TraderyItems = {
        $id: document.$id,
        name: document.name,
        author: document.author,
        authorID: document.authorID,
        date: document.date,
        description: document.description,
        imageFileId: document.imageFileId,
        imageHeight: document.imageHeight,
        imageWidth: document.imageWidth,
    }
    return items;
}