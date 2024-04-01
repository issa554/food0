import { getServerSession } from "next-auth";
import prisma from "../../../../lib/db";
import authOptions from "../../../../lib/authOptions";
import { NextResponse } from "next/server";
export async function PUT(req) {

    const {name , city ,code,street} = await req.json();
    const session = await getServerSession(authOptions)
    const {email} = session.user

    await prisma.user.update({
        where: {
          email
        },
        data: {
            name,
            city,
            street,
            code
          },
      });

  

    return NextResponse.json({name }, { status: 200})

}


export async function GET(req) {


  
  const session = await getServerSession(authOptions)
  const {email} = session.user
    if (!email) {
      return Response.json({});
    }
  

  const userInfo = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if(!userInfo){
    return Response.json({email:email});
  }
  return Response.json({...userInfo});

}