import { translateDeep, type Translate } from "@/i18n/translate";
import { faqGeneral, faqPricing } from "@/data/faq";
import { problems } from "@/data/problems";
import { comparisonColumns, comparisonRows, processSteps } from "@/data/process";
import { projectReel, projects, socialPosts } from "@/data/projects";
import { serviceFaq } from "@/data/serviceFaq";
import { pricingRows, serviceCategories, services, type ServiceCategory } from "@/data/services";

/**
 * Localised views of the content modules. The modules themselves hold the Georgian source;
 * every text field is run through `tr` (slugs, icons and image paths pass through unchanged).
 */
export const getServices = (tr: Translate) => translateDeep(services, tr);
export const getService = (tr: Translate, slug: string) => {
  const service = services.find((s) => s.slug === slug);
  return service ? translateDeep(service, tr) : undefined;
};
export const getServicesByCategory = (tr: Translate, category: ServiceCategory) =>
  translateDeep(
    services.filter((s) => s.category === category),
    tr,
  );
export const getServiceCategories = (tr: Translate) => translateDeep(serviceCategories, tr);
export const getPricingRows = (tr: Translate) => translateDeep(pricingRows, tr);
export const getServiceFaq = (tr: Translate, slug: string) => translateDeep(serviceFaq[slug] ?? [], tr);

export const getFaq = (tr: Translate) => ({
  general: translateDeep(faqGeneral, tr),
  pricing: translateDeep(faqPricing, tr),
});

export const getProcess = (tr: Translate) => ({
  steps: translateDeep(processSteps, tr),
  columns: translateDeep(comparisonColumns, tr),
  rows: translateDeep(comparisonRows, tr),
});

export const getProblems = (tr: Translate) => translateDeep(problems, tr);

export const getProjects = (tr: Translate) => ({
  projects: translateDeep(projects, tr),
  reel: translateDeep(projectReel, tr),
  socialPosts: translateDeep([...socialPosts], tr),
});
