import {NextResponse} from "next/server";
import { getServerSession } from "next-auth";
import mysql, { ResultSetHeader } from "mysql2/promise";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import { RowDataPacket } from "mysql2/promise";
import connection from "@/app/lib/db";

export interface EntryRow extends RowDataPacket{
    id: number;
    text: string;
    createdAt: string;
    competencyID: number | null;
}

export type ThoughtResponse = {
    id: number;
    text: string;
    createdAt: string;
    competencies: number[];
}

export async function POST(req: Request){
    try{
        const session = await getServerSession(authOptions);
        if(!session || !session.user?.email){
            return NextResponse.json({error: "Not Authenticated"},{status:401})
        }
        const {text,competencyIDs} = await req.json();

        //insert our thought into the entry table
        const[entryResult] = await connection.execute<ResultSetHeader>(
            "INSERT INTO ENTRY(user, text) VALUES( ?, ?)",
            [session.user.email, text]
        );

        //insert competency entry relationships into the EntryCompetency
        const entryID = entryResult.insertId;
        for(const compID of competencyIDs){
            await connection.execute("INSERT INTO EntryCompetency (entryId, competencyID) VALUES(?,?)",
                [entryID, compID]
            );
        }

        return NextResponse.json({
            id: entryID, 
            text,
            createdAt: new Date().toISOString,
            competencies: competencyIDs
        });
    }
    catch(err){
        console.error("Entry POST error: ", err);
        return NextResponse.json({error: "Failed to add the entry."}, {status:500});
    }
}