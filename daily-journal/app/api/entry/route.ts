import {NextResponse} from "next/server";
import { getServerSession } from "next-auth";
import mysql from "mysql2/promise";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import { RowDataPacket } from "mysql2/promise";

