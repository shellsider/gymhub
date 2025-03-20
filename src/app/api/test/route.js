import { NextResponse } from "next/server";

/**
 * GET /api/test
 * Returns: { message: "The test API was hit" }
 */
export async function GET() {
    try {
        return NextResponse.json({ message: "The test API was hit" });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
