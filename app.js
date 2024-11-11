import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";

// Function to get the count of feedback for a specific value
async function getFeedbackCount(value) {
  const kv = await Deno.openKv();  // Open the Deno KV store
  const result = await kv.get(["feedback", value]);  // Get the current feedback count for the value
  return result.value ? result.value : 0;  // Default to 0 if not present
}

// Function to increment the feedback count for a specific value
async function incrementFeedback(value) {
  const kv = await Deno.openKv();  // Open the Deno KV store
  const currentCount = await getFeedbackCount(value);  // Get the current count
  const newCount = currentCount + 1;  // Increment the count
  await kv.set(["feedback", value], newCount);  // Store the new count
}

const app = new Hono();

// GET /feedbacks/1 - Returns count of feedbacks with value 1
app.get("/feedbacks/1", async (c) => {
  const count = await getFeedbackCount("1");
  return c.text(`Feedback 1: ${count}`);
});

// POST /feedbacks/1 - Increments feedback count for value 1
app.post("/feedbacks/1", async (c) => {
  await incrementFeedback("1");
  const count = await getFeedbackCount("1");
  return c.text(`Feedback 1: ${count}`);
});

// GET /feedbacks/2 - Returns count of feedbacks with value 2
app.get("/feedbacks/2", async (c) => {
  const count = await getFeedbackCount("2");
  return c.text(`Feedback 2: ${count}`);
});

// POST /feedbacks/2 - Increments feedback count for value 2
app.post("/feedbacks/2", async (c) => {
  await incrementFeedback("2");
  const count = await getFeedbackCount("2");
  return c.text(`Feedback 2: ${count}`);
});

// GET /feedbacks/3 - Returns count of feedbacks with value 3
app.get("/feedbacks/3", async (c) => {
  const count = await getFeedbackCount("3");
  return c.text(`Feedback 3: ${count}`);
});

// POST /feedbacks/3 - Increments feedback count for value 3
app.post("/feedbacks/3", async (c) => {
  await incrementFeedback("3");
  const count = await getFeedbackCount("3");
  return c.text(`Feedback 3: ${count}`);
});

export default app;
