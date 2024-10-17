import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

const IssuePage = async ({ params }: { params: { id: string } }) => {
  if (typeof params.id !== "number") notFound();

  // Gets the unique issue from the url id.
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  // Shows a not found page if the issue doesn't exist in the DB.
  if (!issue) notFound();

  return (
    <div>
      <h1>{issue.title}</h1>
      <p>{issue.description}</p>
    </div>
  );
};

export default IssuePage;
