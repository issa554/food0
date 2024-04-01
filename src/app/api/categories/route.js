import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {

    const {name} = await req.json();

    const newCategory = await prisma.category.create({
      data: {
        name
      }
    });
    return NextResponse.json({newCategory}, { status: 200})

}
export async function PUT(req) {

    const {id,name} = await req.json();

    await prisma.category.update({
      where: {
        id
      },
      data: {
          name
        },
    });
    return NextResponse.json({}, { status: 200})

}

export async function GET(req) {
  const categories = await prisma.category.findMany()
  return NextResponse.json(categories, { status: 200})

}

