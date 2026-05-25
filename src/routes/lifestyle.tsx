import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/lifestyle")({
  loader: () => {
    throw redirect({ to: "/expenses" });
  },
  component: () => null,
});