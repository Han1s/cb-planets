"use server";

import { revalidateTag } from "next/cache";

export async function revalidatePlanets() {
  revalidateTag("planets", "max");
}
