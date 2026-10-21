import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

import { t } from "i18next";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";

import { setSearch } from "../../redux/searchSlice";

import SettingHeader from "../settings/SettingHeader";

const SearchWrap = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 520,
  borderRadius: 999,
  border:
    theme.palette.mode === "dark"
      ? "1px solid rgba(255,255,255,0.10)"
      : "1px solid rgba(103,52,27,0.20)",
  background:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.06)"
      : "rgba(255,255,255,0.35)",
  backdropFilter: "blur(10px)",
  transition:
    "transform 140ms ease, border-color 140ms ease, background 140ms ease",
  "&:hover": {
    transform: "translateY(-1px)",
    borderColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.18)"
        : "rgba(103,52,27,0.35)",
    background:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.50)",
  },
}));

const SearchIconWrap = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 12,
  top: "50%",
  transform: "translateY(-50%)",
  display: "grid",
  placeItems: "center",
  opacity: 0.9,
  color:
    theme.palette.mode === "dark"
      ? "rgba(231,242,239,0.9)"
      : "rgba(103,52,27,0.9)",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: "10px 14px 10px 44px",
    fontWeight: 700,
    letterSpacing: 0.2,
    borderRadius: 999,
    transition: theme.transitions.create(["width", "opacity"]),
    [theme.breakpoints.up("md")]: {
      width: "42ch",
    },
    "&::placeholder": {
      opacity: 0.75,
      fontWeight: 600,
    },
  },
}));

export default function HeaderMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const search = useAppSelector((state) => state.search.value);
  const items = useAppSelector((state) => state.cart.items);

  const count = React.useMemo(
    () => items.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [items],
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={(theme) => ({
          bgcolor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.default, 0.75)
              : alpha(theme.palette.background.default, 0.82),
          borderBottom:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(103,52,27,0.16)",
          backdropFilter: "blur(12px)",
        })}
      >
        <Toolbar
          sx={(theme) => ({
            minHeight: { xs: 64, md: 72 },
            display: "flex",
            gap: { xs: 1, sm: 2 },
            color:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : theme.palette.text.lightPrimary,
          })}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              minWidth: { xs: "auto", sm: 210 },
            }}
          >
            <Typography
              variant="h6"
              sx={(theme) => ({
                fontWeight: 1000,
                letterSpacing: 0.3,
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.primary
                    : theme.palette.text.lightPrimary,
                textShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 18px rgba(0,0,0,0.25)"
                    : "0 8px 18px rgba(103,52,27,0.18)",
                display: { xs: "none", sm: "block" },
              })}
              noWrap
            >
              {t("hero.title")}
            </Typography>

            <Typography
              sx={(theme) => ({
                display: { xs: "block", sm: "none" },
                fontWeight: 1000,
                letterSpacing: 0.2,
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.primary
                    : theme.palette.text.lightPrimary,
              })}
            >
              Cyrus
            </Typography>
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <SearchWrap>
              <SearchIconWrap>
                <SearchRoundedIcon />
              </SearchIconWrap>

              <SearchInput
                placeholder={t("hero.search")}
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
              />
            </SearchWrap>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              onClick={() => navigate("/cart")}
              sx={(theme) => ({
                borderRadius: 2.5,
                border:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255,255,255,0.10)"
                    : "1px solid rgba(103,52,27,0.18)",
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.28)",
                transition: "transform 140ms ease, background 140ms ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.10)"
                      : "rgba(255,255,255,0.45)",
                },
              })}
            >
              <Badge badgeContent={count} color="success" overlap="circular">
                <LocalMallOutlinedIcon sx={{ fontSize: 28 }} />
              </Badge>
            </IconButton>

            <SettingHeader />
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ height: { xs: 10, md: 12 } }} />
    </>
  );
}
