import { FirebaseOptions } from "firebase/app";
import { FIREBASE, FIREBASE_ADMIN } from "../utilities/constants";
import { initializeApp , cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { v4 as uuid } from 'uuid';
import { FileMetadata } from "@google-cloud/storage";

export class StorageService{
    private static instance: StorageService;
    private storage;
    private static storageUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE.storageBucket}/o`

    private constructor(){
        const _serviceAccount: FirebaseOptions = FIREBASE_ADMIN as FirebaseOptions;
        initializeApp({
            credential: cert(_serviceAccount),
            storageBucket: FIREBASE.storageBucket as string
        });
        this.storage = getStorage().bucket();
    }

    public static get(): StorageService {
        if(!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    public async uploadFile(file: Buffer, content: string, path: string): Promise<string>{
        try{
            const uploadFile = this.storage.file(path);
            const token =  uuid();
            const finalUrl = `${StorageService.storageUrl}/${encodeURIComponent(path)}?alt=media&token=${token}`;
            const metadata: FileMetadata = {
                contentType: content,
                cacheControl: 'max-age=31536000',

                metadata:{
                    firebaseStorageDownloadTokens: token,
                }
            };
            await uploadFile.save(file , {
                public: false,
                private: true,
            });
            await uploadFile.setMetadata(metadata);
            return finalUrl;
        }catch(error){
            console.log('error', error);
            throw error;
        }
    }
}