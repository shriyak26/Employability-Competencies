import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// A GET function returns some data based on a request
export async function GET() {
    try {
        // Connection returns a promise 
        // (placeholder for the value that will eventually be returned)
        const connection = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB,
        });

        const [rows] = await connection.execute("SELECT id, skill, description FROM Competency ORDER BY skill ASC");

        return NextResponse.json(rows);
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({error: "Failed to fetch competencies."}, {status: 500});
    }
} 









import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
    providers: [
    GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID!,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
    }),
    ],
    callbacks: {
        async session({session}){
            //session.user.email will identify the student
            return session;
        }
    }
});

export {handler as GET, handler as POST};