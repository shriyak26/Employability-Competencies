import { NextResponse } from "next/server";
import connection from "@/app/lib/db";

// A GET function returns some data based on a request
export async function GET() {
    try {
        const [rows] = await connection.execute("SELECT id, skill, description FROM Competency ORDER BY skill ASC");
        return NextResponse.json(rows);
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({error: "Failed to fetch competencies."}, {status: 500});
    }
} 