import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  const res = await fetch('/case-studies.json');
  const { case_studies } = await res.json();

  const caseStudy = case_studies.find((cs) => cs.slug === params.slug);

  if (!caseStudy) {
    error(404, 'Case study not found');
  }

  return {
    caseStudy,
    allCaseStudies: case_studies,
  };
};
