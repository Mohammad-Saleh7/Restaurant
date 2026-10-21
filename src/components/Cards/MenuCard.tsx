import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions } from "@mui/material";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/cartSlice";
import i18n from "../../i18n";

interface MenuCardProps {
  price: number | string;
  catName?: string;
  nameFa: string;
  nameEn: string;
  descriptionFa: string;
  descriptionEn: string;
  image: string;
  id: string;
  lang: "fa" | "en";
}

export default function MenuCard({
  price,
  catName,
  descriptionFa,
  descriptionEn,
  image,
  lang,
  nameFa,
  nameEn,
  id,
}: MenuCardProps) {
  const dispatch = useAppDispatch();
  const currentLang: "fa" | "en" = i18n.language === "fa" ? "fa" : "en";

  function normalizePrice(raw: number | string): number {
    if (typeof raw === "number") return raw;

    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    let normalized = raw.replace(/[۰-۹]/g, (d) =>
      persianDigits.indexOf(d).toString(),
    );

    normalized = normalized.replace(/[^\d.-]/g, "");

    const n = Number(normalized);
    return Number.isNaN(n) ? 0 : n;
  }

  const priceRial = normalizePrice(price);

  function toPersianNumber(num: number | string): string {
    return num
      .toString()
      .replace(
        /\d/g,
        (d) => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][parseInt(d)],
      );
  }

  const displayPrice =
    currentLang === "fa"
      ? `${toPersianNumber(priceRial.toLocaleString("fa-IR"))}`
      : priceRial.toLocaleString("en-US");

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        nameFa,
        nameEn,
        price: priceRial,
        image,
      }),
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {catName && <Typography>{catName}</Typography>}

      <Card
        sx={{
          width: "100%",
          maxWidth: 250,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            isolation: "isolate",
            display: "grid",
            bgcolor: "action.hover",
          }}
        >
          <Box
            component="img"
            src={image}
            alt=""
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(20px) brightness(0.8)",
              transform: "scale(1.15)",
              zIndex: -1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          />

          <Box
            component="img"
            src={image}
            alt={nameEn}
            loading="lazy"
            decoding="async"
            sx={{
              gridArea: "1 / 1",
              display: "block",
              width: "100%",
              height: "auto",
              minHeight: { xs: 160, sm: 180 },
              maxHeight: { xs: 220, sm: 240, md: 260, lg: 280 },
              objectFit: "contain",
              objectPosition: "center",
              margin: "0 auto",
            }}
          />
        </Box>

        <CardContent
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            gap: 1,
            bgcolor:
              theme.palette.mode === "dark"
                ? "background.darkPaper"
                : "background.default",
            minHeight: 100,
            color:
              theme.palette.mode === "dark"
                ? "text.primary"
                : "text.lightPrimary",
          })}
        >
          <Box>
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {lang === "fa" ? nameFa : nameEn}
            </Typography>

            <Typography
              variant="body2"
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark" ? "text.secondary" : undefined,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              })}
            >
              {lang === "fa" ? descriptionFa : descriptionEn}
            </Typography>
          </Box>

          <Typography>
            {t("cart.price")}: {displayPrice}
          </Typography>
        </CardContent>

        <CardActions
          sx={(theme) => ({
            bgcolor:
              theme.palette.mode === "dark"
                ? "background.darkPaper"
                : "background.default",
            mt: "auto",
            pt: 2,
            display: "flex",
            gap: 1,
          })}
        >
          <Button
            component={Link}
            to={`/menu/${id}`}
            variant="contained"
            sx={(theme) => ({
              width: 120,
              justifyContent: "center",
              whiteSpace: "nowrap",
              bgcolor:
                theme.palette.mode === "dark"
                  ? "background.default"
                  : "#67341b",
              borderColor:
                theme.palette.mode === "dark"
                  ? "background.default"
                  : "text.lightPrimary",
              height: 36,
              color: "#E7F2EF",
              fontWeight: "bold",
              fontSize: 13,
            })}
          >
            {t("button.viewDetails")}
          </Button>

          <Button
            variant="contained"
            sx={{
              width: 120,
              whiteSpace: "nowrap",
              height: 36,
              bgcolor: "#51b6a1",
              color: "white",
            }}
            onClick={handleAddToCart}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
              {t("button.addToCart")}
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
