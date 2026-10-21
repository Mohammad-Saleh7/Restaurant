import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import restaurantData from "../data/restaurant.json";
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  Stack,
} from "@mui/material";
import HeaderMenu from "../components/Headers/HeaderMenu";
import { t } from "i18next";
import MenuCard from "../components/Cards/MenuCard";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/cartSlice";

import AIRecommendations from "../components/AIRecommendations";
import type { MenuCategory, MenuItem } from "../utils/aiTaste";
import { trackAddToCart, trackView } from "../utils/aiTaste";

const categories = restaurantData.restaurant.menu
  .categories as unknown as MenuCategory[];

const allItems: MenuItem[] = restaurantData.restaurant.menu.categories.flatMap(
  (cat) => cat.items,
);

const toPersianNumber = (num: number | string) =>
  num
    .toString()
    .replace(
      /\d/g,
      (d) => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][+d],
    );

const MenuItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const currentLang = i18n.language === "fa" ? "fa" : "en";

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const item = useMemo(() => allItems.find((x) => x.id === id), [id]);

  const category = useMemo(() => {
    return restaurantData.restaurant.menu.categories.find((cat) =>
      cat.items.some((it) => it.id === id),
    );
  }, [id]);

  const categoryId = category?.id || "unknown";

  useEffect(() => {
    if (!item) return;
    trackView(item.id, categoryId, item as unknown as MenuItem);
  }, [item, categoryId]);

  if (!item) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="error">
          Item not found!
        </Typography>
      </Box>
    );
  }

  const similarItems = category
    ? category.items.filter((it) => it.id !== item.id).slice(0, 4)
    : [];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: item.id,
        nameFa: item.name.fa,
        nameEn: item.name.en,
        price: item.price,
        image: item.image,
      }),
    );

    trackAddToCart(item.id, categoryId, item as unknown as MenuItem);
  };

  return (
    <Box>
      <HeaderMenu />

      <Container sx={{ mt: 2, pb: 6 }}>
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
            alignItems: "center",
            mb: 5,
          }}
        >
          <Box
            component="img"
            src={item.image}
            alt={item.name[currentLang]}
            sx={{
              width: "100%",
              maxWidth: 480,
              justifySelf: "center",
              borderRadius: 3,
              boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
            }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.4 }}>
            <Typography
              variant="h4"
              sx={(theme) => ({
                fontWeight: 1000,
                fontSize: { xs: 22, md: 32 },
                color:
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "text.lightPrimary",
              })}
            >
              {item.name[currentLang]}
            </Typography>

            <Typography
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(231,242,239,0.75)"
                    : "rgba(103,52,27,0.80)",
                fontSize: { xs: 14, md: 16 },
                fontWeight: 900,
              })}
            >
              {category?.name[currentLang]}
            </Typography>

            <Typography
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(231,242,239,0.75)"
                    : "rgba(103,52,27,0.78)",
                fontSize: { xs: 15, md: 18 },
                lineHeight: 1.8,
              })}
            >
              {item.description[currentLang]}
            </Typography>

            <Typography
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "text.lightPrimary",
                fontSize: { xs: 18, md: 22 },
                fontWeight: 1000,
                mt: 0.5,
              })}
            >
              {currentLang === "fa"
                ? `${toPersianNumber(item.price)} ریال`
                : `${item.price.toLocaleString("en-US")} Rial`}
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
              sx={{ mt: 1.5, flexWrap: "wrap" }}
            >
              <Button
                variant="contained"
                onClick={handleAddToCart}
                sx={(theme) => ({
                  px: 2.2,
                  py: 1,
                  borderRadius: 3,
                  fontWeight: 1000,
                  color: "#fff",
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(90deg, #22c55e, #4f46e5)"
                      : "linear-gradient(90deg, #67341b, #fcbc4e)",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 10px 25px rgba(34,197,94,0.16)"
                      : "0 12px 28px rgba(103,52,27,0.20)",
                  "&:hover": { transform: "translateY(-1px)" },
                  transition: "transform 140ms ease",
                })}
              >
                {t("button.addToCart")}
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                sx={(theme) => ({
                  px: 2.2,
                  py: 1,
                  borderRadius: 3,
                  fontWeight: 1000,
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.28)"
                      : "rgba(103,52,27,0.35)",
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(231,242,239,0.90)"
                      : theme.palette.text.lightPrimary,
                  "&:hover": { transform: "translateY(-1px)" },
                  transition: "transform 140ms ease",
                })}
              >
                {t("button.back")}
              </Button>
            </Stack>
          </Box>
        </Box>

        <AIRecommendations
          categories={categories}
          currentLang={currentLang}
          excludeIds={[item.id]}
          title={t("ai.title")}
        />

        <Divider sx={{ mt: 5 }} />

        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography
            variant="h5"
            sx={(theme) => ({
              fontWeight: 1000,
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
              mb: 2,
            })}
          >
            {t("similar.title")}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
            }}
          >
            {similarItems.map((similar) => (
              <MenuCard
                key={similar.id}
                nameFa={similar.name.fa}
                nameEn={similar.name.en}
                descriptionFa={similar.description.fa}
                descriptionEn={similar.description.en}
                price={similar.price}
                image={similar.image}
                lang={currentLang}
                id={similar.id}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MenuItemPage;
