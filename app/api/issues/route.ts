import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../ValidationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });
  // Gets the body of the request
  const body = await request.json();

  // Runs ZOD validation checks on the body
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Add the issue to the database
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  // Return the issue to the client
  return NextResponse.json(newIssue, { status: 201 });
}
