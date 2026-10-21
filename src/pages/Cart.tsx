import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import React from "react";
import { clearCart, removeFromCart } from "../redux/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import HeaderMenu from "../components/Headers/HeaderMenu";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Cart: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "fa" ? "fa" : "en";
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cart.items);

  const toPersianNumber = (num: string | number) =>
    num
      .toString()
      .replace(
        /\d/g,
        (d) => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][parseInt(d)],
      );

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <Box>
      <HeaderMenu />

      <Container sx={{ mb: 5, mt: 2, px: { xs: 1, sm: 2 } }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ mt: { xs: 2, sm: 4 }, mb: 1 }}
        >
          {t("cart.title")}
        </Typography>

        <Divider />

        {items.length === 0 ? (
          <Typography
            textAlign="center"
            sx={{ mt: 3, fontSize: { xs: 16, sm: 18 } }}
          >
            {t("cart.empty")}
          </Typography>
        ) : (
          <>
            {/* ITEMS LIST */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 2,
              }}
            >
              {items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    pb: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    sx={{
                      width: { xs: 70, sm: 90 },
                      height: { xs: 70, sm: 90 },
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />

                  <Box sx={{ flex: 1, minWidth: "200px" }}>
                    <Typography variant="h6" fontSize={{ xs: 16, sm: 18 }}>
                      {currentLang === "fa" ? item.nameFa : item.nameEn}
                    </Typography>

                    <Typography fontSize={{ xs: 14, sm: 16 }}>
                      {t("cart.price")}:{" "}
                      {currentLang === "fa"
                        ? toPersianNumber(item.price)
                        : `${item.price} Rial`}
                    </Typography>

                    <Typography fontSize={{ xs: 14, sm: 16 }}>
                      {t("cart.quantity")}:{" "}
                      {currentLang === "fa"
                        ? toPersianNumber(item.quantity)
                        : item.quantity}
                    </Typography>
                  </Box>

                  <IconButton
                    aria-label={
                      currentLang === "fa"
                        ? `حذف ${item.nameFa} از سبد خرید`
                        : `Remove ${item.nameEn} from cart`
                    }
                    onClick={() => handleRemove(item.id)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* TOTAL + BUTTONS */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: { xs: 2, sm: 0 },
              }}
            >
              <Typography
                variant="h6"
                textAlign={{ xs: "left", sm: "right" }}
                fontSize={{ xs: 16, sm: 18 }}
              >
                {t("cart.total")} :
                {currentLang === "fa" ? toPersianNumber(total) : total}
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClear}
                  sx={{ width: 125 }}
                >
                  {t("cart.clear")}
                </Button>

                <Button variant="outlined" color="success" sx={{ width: 125 }}>
                  {t("cart.buy")}
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
