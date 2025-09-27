import { NextResponse, NextRequest } from "next/server";

import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

// This function can be marked `async` if using `await` inside
export async function middleware(_request: NextRequest) {
    try {
        console.log("🚀 MIDDLEWARE EXECUTING - Setting up database and storage...");
        console.log("📍 Middleware running at:", new Date().toISOString());
        
        await Promise.all([
            getOrCreateDB().catch(error => {
                console.error("Database setup error:", error);
                throw error;
            }),
            getOrCreateStorage().catch(error => {
                console.error("Storage setup error:", error);
                throw error;
            })
        ]);

        console.log("✅ Database and storage setup completed successfully");
        
    } catch (error) {
        console.error("Middleware setup failed:", error);
        // Don't block the request, but log the error
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!|_next/static|_next/image|favicon.ico).*)"],
};
