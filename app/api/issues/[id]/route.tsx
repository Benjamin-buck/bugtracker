import { issueSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import delay from "delay";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Protecting the API Endpoint
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // Get the body of the request and validate
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Fetch issue from the database
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  // Validate an issue is returned
  if (!issue)
    return NextResponse.json(
      { error: "Issue does not exist." },
      { status: 404 }
    );

  // Update the issue with the request details
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });

  // Return the response to the user.
  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  await delay(2000);
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
