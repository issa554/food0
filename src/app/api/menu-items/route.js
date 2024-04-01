import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {

    const {name,desctption,categoryId,image,price,sizes} = await req.json();

    const newItem = await prisma.item.create({
      data: {
        categoryId,
        name,
        desctption,
        image,
        price,
      }
    });
    for (const size of sizes) {

  


        await prisma.size.create({
          data:{
            itemId:newItem.id,
            name:size.name,
            sizePrice:parseFloat(size.sizePrice)
          }
        });

      
      }
    return NextResponse.json({newItem}, { status: 200})

}
export async function PUT(req) {

  const {id ,sizes, ...data} = await req.json();

  await prisma.item.update({
      where: {
        id
      },
      data: {
        ...data
        },
    });
    for (const size of sizes) {
      const thisSize = await prisma.size.findMany({
        where: {
          name: size.name,
          itemId: id
        }
      })
      if(thisSize[0]){

        await prisma.size.update({
          where: { id : thisSize[0].id},
          data: {
            sizePrice: parseFloat(size.sizePrice)
          }
        });
      }else{
        await prisma.size.create({
          data:{
            itemId:id,
            name:size.name,
            sizePrice:parseFloat(size.sizePrice)
          }
        });

      }
    }



  return NextResponse.json({}, { status: 200})

}export async function GET(req) {
  const items = await prisma.item.findMany({
    include: {
      sizes: true,
      Category: {
        select: {
          id: true
        }
      }
    }
  });
  return NextResponse.json(items, { status: 200 });
}
