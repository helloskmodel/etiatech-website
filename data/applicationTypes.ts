import { applicationsData } from "./applicationsData";

type Base = (typeof applicationsData)[number];

// Element type of the reviewed application case studies. Derived from the data
// itself so components stay typed without hand-maintaining a parallel
// interface. The extra section fields don't exist in the base English data:
// `recommendedConfiguration` comes from the localized zh/th/vi overrides
// (merged in by ApplicationCaseStudyView), and `process`/`selectionFactors`
// are optional fields future entries may add — so all three are optional.
export type Application = Omit<Base, "sections"> & {
  sections: Base["sections"] & {
    recommendedConfiguration?: string;
    process?: string[];
    selectionFactors?: string[];
  };
};
