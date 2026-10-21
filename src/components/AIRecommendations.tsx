// src/components/AIRecommendations.tsx
import type { TFunction } from "i18next";
import React, { useMemo } from "react";
import { Box, Chip, Divider, Stack, Typography, Button } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useTranslation } from "react-i18next";

import type { MenuCategory, Lang } from "../utils/aiTaste";
import {
  hasAnyTasteData,
  recommendItems,
  resetTasteProfile,
} from "../utils/aiTaste";
import MenuCard from "./Cards/MenuCard";

function fmtReason(reason: string, lang: Lang, t: TFunction) {
  // cat:xxx or tag:yyy
  if (reason.startsWith("cat:")) return t("ai.reasonCategory");
  if (reason.startsWith("tag:")) {
    const tag = reason.replace("tag:", "");
    // translate some tags
    const mapFa: Record<string, string> = {
      pizza: "پیتزا",
      burger: "برگر",
      pasta: "پاستا",
      steak: "استیک",
      seafood: "غذاهای دریایی",
      vegan: "وگان",
      salad: "سالاد",
      soup: "سوپ",
      coffee: "قهوه",
      tea: "چای",
      juice: "آبمیوه",
      mocktail: "نوشیدنی",
      hummus: "حمص",
      falafel: "فلافل",
      general: "عمومی",
    };
    const mapEn: Record<string, string> = {
      pizza: "Pizza",
      burger: "Burger",
      pasta: "Pasta",
      steak: "Steak",
      seafood: "Seafood",
      vegan: "Vegan",
      salad: "Salad",
      soup: "Soup",
      coffee: "Coffee",
      tea: "Tea",
      juice: "Juice",
      mocktail: "Drink",
      hummus: "Hummus",
      falafel: "Falafel",
      general: "General",
    };
    return lang === "fa" ? mapFa[tag] || tag : mapEn[tag] || tag;
  }
  return reason;
}

type Props = {
  categories: MenuCategory[];
  currentLang: Lang;
  excludeIds?: string[];
  title?: string;
};

const AIRecommendations: React.FC<Props> = ({
  categories,
  currentLang,
  excludeIds = [],
  title,
}) => {
  const { t } = useTranslation();

  const canShow = hasAnyTasteData();

  const recs = useMemo(() => {
    if (!canShow) return [];
    return recommendItems({ categories, excludeItemIds: excludeIds, limit: 4 });
  }, [canShow, categories, excludeIds]);

  if (!canShow) {
    return (
      <Box
        sx={(theme) => ({
          mt: 4,
          p: { xs: 2, sm: 2.5 },
          borderRadius: 3,
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.14)"
              : "1px solid rgba(103,52,27,0.18)",
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.35)",
        })}
      >
        <Stack direction="row" spacing={1} alignItems="center" mb={0.6}>
          <AutoAwesomeRoundedIcon />
          <Typography
            sx={(theme) => ({
              fontWeight: 1000,
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
            })}
          >
            {title || t("ai.title")}
          </Typography>
        </Stack>

        <Typography
          sx={(theme) => ({
            color:
              theme.palette.mode === "dark"
                ? "rgba(231,242,239,0.70)"
                : "rgba(103,52,27,0.75)",
            fontSize: { xs: 13, sm: 14 },
          })}
        >
          {t("ai.emptyHint")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={1}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <AutoAwesomeRoundedIcon />
          <Typography
            variant="h5"
            sx={(theme) => ({
              fontWeight: 1000,
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
            })}
          >
            {title || t("ai.title")}
          </Typography>
        </Stack>

        <Button
          startIcon={<DeleteForeverRoundedIcon />}
          onClick={() => {
            resetTasteProfile();
            window.location.reload(); // ساده و مطمئن برای ریفرش UI
          }}
          sx={(theme) => ({
            borderRadius: 3,
            fontWeight: 1000,
            color: theme.palette.mode === "dark" ? "#fecaca" : "#7f1d1d",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(239,68,68,0.35)"
                : "1px solid rgba(127,29,29,0.25)",
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(239,68,68,0.10)"
                : "rgba(127,29,29,0.08)",
            "&:hover": {
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(239,68,68,0.16)"
                  : "rgba(127,29,29,0.12)",
            },
          })}
        >
          {t("ai.reset")}
        </Button>
      </Stack>

      <Divider sx={{ mt: 2, mb: 2 }} />

      {/* reason chips */}
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        sx={{ rowGap: 1, mb: 2 }}
      >
        <Chip
          label={t("ai.explain")}
          sx={(theme) => ({
            fontWeight: 1000,
            borderRadius: 999,
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.14)"
                : "1px solid rgba(103,52,27,0.20)",
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.06)"
                : "rgba(255,255,255,0.40)",
          })}
        />
        {Array.from(new Set(recs.flatMap((r) => r.reasons).filter(Boolean)))
          .slice(0, 6)
          .map((reason) => (
            <Chip
              key={reason}
              label={fmtReason(reason, currentLang, t)}
              sx={(theme) => ({
                borderRadius: 999,
                fontWeight: 900,
                color:
                  theme.palette.mode === "dark"
                    ? "#fff"
                    : theme.palette.text.lightPrimary,
                border:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255,255,255,0.14)"
                    : "1px solid rgba(103,52,27,0.20)",
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.35)",
              })}
            />
          ))}
      </Stack>

      {/* cards */}
      <Box
        sx={{
          display: "grid",
          gap: 2,
          justifyContent: "center",
          gridTemplateColumns: {
            xs: "repeat(1, minmax(240px, 1fr))",
            sm: "repeat(2, minmax(240px, 1fr))",
            md: "repeat(3, minmax(240px, 1fr))",
            lg: "repeat(4, minmax(240px, 1fr))",
          },
        }}
      >
        {recs.map((r) => (
          <MenuCard
            key={r.item.id}
            id={r.item.id}
            image={r.item.image}
            nameEn={r.item.name.en}
            nameFa={r.item.name.fa}
            descriptionEn={r.item.description.en}
            descriptionFa={r.item.description.fa}
            price={r.item.price}
            lang={currentLang}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AIRecommendations;
