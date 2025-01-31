import React from 'react';
import { database } from './appwrite';
import { TraderyItems } from './ItemsInterface';

export async function getItems() {
    const {documents} = await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ITEM_ID, import.meta.env.VITE_APPWRITE_COLLECTION_ITEM_ID);
    return{
        events:documents.map(document => {
            const items: TraderyItems = {
                $id: document.$id,
                name: document.name,
                author: document.author,
                date: document.date
            }
            return items;
        })
    }
}