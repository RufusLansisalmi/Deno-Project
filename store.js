// store.js

export const setStore = async (key, value) => {
  const kv = await Deno.openKv();
  try {
    await kv.set(["feedback", key], value);
  } finally {
    kv.close();
  }
};

export const getStore = async (key) => {
  const kv = await Deno.openKv();
  try {
    const data = await kv.get(["feedback", key]);
    return data ? data.value : 0;  // Return 0 if no data is found
  } finally {
    kv.close();
  }
};
