import { Member } from "@/types/member";
import promo2024 from "./2024";
import promo2025 from "./2025";

export const promos: Record<string, Member[]> = {
  "2024": promo2024,
  "2025": promo2025,
};

export const roleAbbreviations: Record<string, string> = {
  JV: "Les Jumeaux Vénitiens",
  SNE: "Le Songe d'une Nuit d'Été",
  VVD: "À venir",
};

export { promo2024, promo2025 };
