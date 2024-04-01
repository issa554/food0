import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function GET(req) {


  
    // const session = await getServerSession(authOp)
    // const {email} = session.user
    //   if (!email) {
    //     return Response.json({});
    //   }
    
  
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200})

  
  }