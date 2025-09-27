import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB() {
    try {
        console.log(`Attempting to connect to database: ${db}`);
        await databases.get(db);
        console.log("Database connected successfully");
    } catch (_error) {
        console.log(`Database '${db}' not found, creating new database...`);
        try {
            await databases.create(db, db);
            console.log(`Database '${db}' created successfully`);
            
            console.log("Creating collections...");
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection(),
            ]);
            console.log("All collections created successfully");
            console.log("Database setup completed");
        } catch (createError) {
            console.error("Error creating database or collections:", createError);
            throw createError;
        }
    }
    return databases;
}
