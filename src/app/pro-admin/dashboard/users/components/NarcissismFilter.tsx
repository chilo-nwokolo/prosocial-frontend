import {
  FILTER_CATEGORY_KEYS,
  FILTER_PARENT_NAMES,
  FILTER_QUERY_KEYS,
} from "@/utils/admin.utils";
import { SimpleGrid } from "@chakra-ui/react";
import DoubleRangeFilterComponent from "./DoubleRangeFilterComponent";

const narcissismTraits = [
  {
    title: "Narcissism range",
    category: FILTER_CATEGORY_KEYS.narcissismScore,
    minValue: FILTER_QUERY_KEYS.narcissismScoreMin,
    maxValue: FILTER_QUERY_KEYS.narcissismScoreMax,
  },
  {
    title: "Social beliefs range",
    category: FILTER_CATEGORY_KEYS.socialBeliefsScore,
    minValue: FILTER_QUERY_KEYS.socialBeliefsScoreMin,
    maxValue: FILTER_QUERY_KEYS.socialBeliefsScoreMax,
  },
  {
    title: "Behavioral health range",
    category: FILTER_CATEGORY_KEYS.behavioralHealthScore,
    minValue: FILTER_QUERY_KEYS.behavioralHealthMin,
    maxValue: FILTER_QUERY_KEYS.behavioralHealthMax,
  },
];

export default function NarcissismFilter() {
  return (
    <SimpleGrid columns={3} spacing="8">
      {narcissismTraits.map((traits) => (
        <DoubleRangeFilterComponent
          key={traits.title}
          trait={traits.title}
          parentName={FILTER_PARENT_NAMES.narcissismSocialBehavioral}
          individualTraitCategory={traits.category}
          individualTraitValueMax={traits.maxValue}
          individualTraitValueMin={traits.minValue}
        />
      ))}
    </SimpleGrid>
  );
}
