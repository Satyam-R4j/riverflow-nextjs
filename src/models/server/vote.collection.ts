import { IndexType, Permission } from "node-appwrite";

import { voteCollection, db } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
    await databases.createCollection(db, voteCollection, voteCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("vote collection is created");

    await Promise.all([
        databases.createEnumAttribute(
            db,
            voteCollection,
            "type",
            ["question","answer"],
            true
        ),
        databases.createEnumAttribute(
            db,
            voteCollection,
            "voteStatus",
            ["upvote", "downvote"],
            true
        ),
        databases.createStringAttribute(
            db,
            voteCollection,
            "votedById",
            50,
            true
        ),
       
    ]);
    console.log("vote attributes created");
}
