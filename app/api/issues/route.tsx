import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../ValidationSchema";

export async function POST(request: NextRequest) {
  // Gets the body of the request
  const body = await request.json();

  // Runs ZOD validation checks on the body
  const validation = createIssueSchema.safeParse(body);
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
