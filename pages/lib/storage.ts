import { ID } from 'appwrite'
import { storage } from './appwrite';
export async function uploadFile(file: File) {
  const data = await storage.createFile(import.meta.env.VITE_APPWRITE_STORAGE_ITEM_ID, ID.unique(), file)
  return data;
}
export async function deleteFileById(fileId: string) {
  const data = await storage.deleteFile(import.meta.env.VITE_APPWRITE_STORAGE_ITEM_ID, fileId)
  return data;
}
export function getPreviewImageById(fileId: string) {
  return storage.getFilePreview(import.meta.env.VITE_APPWRITE_STORAGE_ITEM_ID, fileId)
}
export function getProfilePreviewImageById(fileId: string) {
  return storage.getFilePreview(import.meta.env.VITE_APPWRITE_STORAGE_USER_ID, fileId)
}
export async function uploadUserFile(userId: string, file: File) {
  const data = await storage.createFile(import.meta.env.VITE_APPWRITE_STORAGE_USER_ID, userId, file)
  return data;
}