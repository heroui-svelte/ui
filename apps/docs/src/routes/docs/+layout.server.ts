import {getDocsNavigation} from "$lib/server/docs";

export async function load() {
  return {
    navSections: await getDocsNavigation(),
  };
}
