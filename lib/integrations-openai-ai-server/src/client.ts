import OpenAI from "openai";

let _client: OpenAI | undefined;

function getClient(): OpenAI {
  if (!_client) {
    const apiKey =
      process.env.AI_INTEGRATIONS_OPENAI_API_KEY ?? process.env.OPENAI_API_KEY;
    const baseURL =
      process.env.AI_INTEGRATIONS_OPENAI_BASE_URL ??
      process.env.OPENAI_BASE_URL ??
      undefined; // undefined => official https://api.openai.com/v1
    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY (or AI_INTEGRATIONS_OPENAI_API_KEY) must be set.",
      );
    }
    _client = new OpenAI({ apiKey, baseURL });
  }
  return _client;
}

/** Created on first use so a missing key does not crash module import (serverless-friendly). */
export const openai = new Proxy({} as OpenAI, {
  get: (_t, prop) => Reflect.get(getClient(), prop),
});
