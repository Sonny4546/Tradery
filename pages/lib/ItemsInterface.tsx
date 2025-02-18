export interface TraderyItems {
    $id: string;
    name: string;
    author: string;
    authorID: string;
    date: string;
    description: string;
    imageFileId: string;
    imageHeight: number;
    imageWidth: number;
    isApproved: boolean;
    requests?: string[];
}