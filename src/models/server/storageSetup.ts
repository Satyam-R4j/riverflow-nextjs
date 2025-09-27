import { Permission } from "node-appwrite";

import { questionAttachmentBucket} from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage(){
    try {
        console.log(`Attempting to connect to storage bucket: ${questionAttachmentBucket}`);
        await storage.getBucket(questionAttachmentBucket);
        console.log("Storage bucket connected successfully");
        
    } catch (_error) {
        console.log(`Storage bucket '${questionAttachmentBucket}' not found, creating new bucket...`);
        try {
            await storage.createBucket(
                questionAttachmentBucket,
                questionAttachmentBucket,[
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.create("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                false,
                undefined,
                undefined,["jpg","png","gif","jpeg","webp","heic"]
            );

            console.log(`Storage bucket '${questionAttachmentBucket}' created successfully`);
            console.log("Storage setup completed");
            
        } catch (createError) {
            console.error("Error creating storage bucket:", createError);
            throw createError;
        }
    }
    return storage;
}

