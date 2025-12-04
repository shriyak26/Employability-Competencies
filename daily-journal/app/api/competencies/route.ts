import { NextResponse } from "next/server";
import connection from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

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

export async function GET(){
    const session = await getServerSession(authOptions);

    if(!session || !session.user?.email){
        return NextResponse.json([], {status:200});
    }

    const userEmail = session.user.email;
    const[entries] = await connection.execute("SELECT e.id, e.text, GROUP_CONCAT(c.skill) AS skills, GROUP_CONCAT(c.id) AS competency_ids FPOM Entry e LEFT JOIN EntryCompetency ec ON e.id = ec.entryID LEFT JOIN Competency c ON ec.competencyID = c.id WHERE e.user =? GROUP BY e.id ORDER BY e.id DESC",[userEmail]);

    return NextResponse.json(entries);
}