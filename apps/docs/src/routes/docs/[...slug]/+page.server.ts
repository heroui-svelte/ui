import {error} from "@sveltejs/kit";

import {getAllDocEntries, getDocBySlug} from "$lib/server/docs";

export const prerender = true;

export async function entries() {
  const docs = await getAllDocEntries();

  return docs.map((slug) => ({slug}));
}

export async function load({params}) {
  const slugParts = params.slug ? params.slug.split("/") : [];
  const doc = await getDocBySlug(slugParts);

  if (!doc) {
    throw error(404, "Documentation page not found");
  }

  return {
    doc,
  };
}
