import { issueSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json(
      { error: "Issue does not exist." },
      { status: 404 }
    );

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // get the post
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  // check if post exists
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  // delete the post
  const deletedIssue = await prisma.issue.delete({
    where: { id: issue.id },
  });

  // return response to user
  return NextResponse.json(deletedIssue, { status: 201 });
}
