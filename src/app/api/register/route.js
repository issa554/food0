import prisma from "../../../../lib/db";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import { NextResponse } from "next/server";

export async function POST(req) {

    const body = await req.json();
    const hash = bcrypt.hashSync(body.password, 10); // Hash the password

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hash
      }
    });
    return NextResponse.json({newUser}, { status: 200})

}
