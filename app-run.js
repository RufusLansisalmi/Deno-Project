import app from "./app.js";
import { serve } from "https://deno.land/std@0.125.0/http/server.ts";

serve(app.fetch, { port: 3000 });
