import { useEffect, useState } from "react";
import { fetchThietBiByGroup } from "../api/thietBiApi";
import { buildBrandGroups, BRAND_DESCRIPTIONS } from "../utils/thietBiMapper";

export const DEVICE_SECTIONS = [
  { code: "TAM_PIN", title: "Tấm quang năng" },
  { code: "BIEN_TAN", title: "Biến tần" },
  { code: "PIN_LUU_TRU", title: "Pin Lithium" },
];

const buildEmptySections = (sectionsConfig) =>
  sectionsConfig.map((section) => ({
    ...section,
    brandGroups: [],
  }));

export const useThietBiSections = ({
  sectionsConfig = DEVICE_SECTIONS,
  brandDescriptions = BRAND_DESCRIPTIONS,
} = {}) => {
  const [sections, setSections] = useState(() =>
    buildEmptySections(sectionsConfig)
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          sectionsConfig.map((section) => fetchThietBiByGroup(section.code))
        );

        if (!isMounted) return;

        const nextSections = sectionsConfig.map((section, index) => {
          const rawItems = Array.isArray(results[index]) ? results[index] : [];
          return {
            ...section,
            brandGroups: buildBrandGroups(rawItems, brandDescriptions),
          };
        });

        setSections(nextSections);
      } catch (fetchError) {
        console.error("Failed to load device list", fetchError);
        if (isMounted) {
          setError(fetchError);
          setSections(buildEmptySections(sectionsConfig));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAll();

    return () => {
      isMounted = false;
    };
  }, [sectionsConfig, brandDescriptions]);

  return { sections, loading, error };
};
