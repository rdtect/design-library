import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/case-studies.json');
  const { case_studies } = await res.json();

  return {
    caseStudies: case_studies,
  };
};
