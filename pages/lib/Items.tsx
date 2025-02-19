import React from 'react';
import { Models, Query, ID } from 'appwrite';
import { database } from './appwrite';
import { TraderyItems } from './ItemsInterface';
import { deleteFileById } from './storage';

export async function getItems() {
    const {documents} = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                    import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, 
                                                    [Query.orderDesc('date'), Query.equal('isApproved', true)]);
    return{
        items: documents.map(mapDocumentToItem)
    }
}

export async function getItemsbySearch(ItemSearch: string) {
    const {documents} = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                    import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, 
                                                    [Query.orderDesc('date'),Query.contains('name', ItemSearch),]);
    return{
        items: documents.map(mapDocumentToItem)
    }
}

export async function getItemsbyCategory(category: string) {
    const {documents} = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                    import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, 
                                                    [Query.orderDesc('date'),Query.contains('itemCategory', category),]);
    return{
        items: documents.map(mapDocumentToItem)
    }
}

export async function getItemsbyUser(userId: string) {
    const {documents} = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                    import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, 
                                                    [Query.contains('authorID', userId), Query.orderDesc('date')]);
    return{
        items: documents.map(mapDocumentToItem)
    }
}

export async function getItemsbyApproval() {
    const {documents} = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                    import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, 
                                                    [Query.equal('isApproved', false), Query.orderDesc('date')]);
    return{
        items: documents.map(mapDocumentToItem)
    }
}

export async function getItemsById(itemsId: TraderyItems['$id']) {
    const document = await database.getDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, itemsId);
    return {
        items: mapDocumentToItem(document)
    }
}

export async function deleteItemById(itemId: TraderyItems['$id']) {
    const { items } = await getItemsById(itemId);
    await deleteFileById(items.imageFileId);
    await database.deleteDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, itemId);
}

export async function createItems(item: Omit<TraderyItems, '$id'>) {
    const document = await database.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, ID.unique(), item);
    return {
        items: mapDocumentToItem(document)
    }
}

export async function updateItem(itemsId: string, item: Omit<TraderyItems, '$id'>){
    const document = await database.updateDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
                                                import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID, itemsId, item);
    return {
        items: mapDocumentToItem(document)
    }
}

export async function addRequest(itemsId: string, item: Omit<TraderyItems, '$id, author, authorID, description, date, imageHeight, imageWidth, imageFileId'>){
    const document = await database.updateDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID, 
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
        isApproved: false,
        requests: document.requests,
        category: document.itemCategory
    }
    return items;
}