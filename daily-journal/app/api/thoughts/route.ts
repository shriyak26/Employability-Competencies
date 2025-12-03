import { NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2";
import { getServerSession } from "next-auth";
import connection from "@/app/lib/db";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";


export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
        if(!session || !session.user?.email){
            return NextResponse.json({error: "Not Authenticated"},{status:401})
        }

        const {text,competencyIDs} = await req.json();
        const userEmail = session.user.email;

        
    }