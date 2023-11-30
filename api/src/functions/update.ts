import { app, Timer, InvocationContext } from "@azure/functions";

export async function update(
  timer: Timer,
  context: InvocationContext
): Promise<void> {
  context.log("Updating battles database");
}

app.timer("update", {
  schedule: "*/20 * * * *",
  handler: update,
});
