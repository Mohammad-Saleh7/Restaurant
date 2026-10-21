import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import type { SxProps, Theme } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";

import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import SettingHome from "../settings/SettingsHome";

type ElevationScrollProps = {
  children: React.ReactElement<{ sx?: SxProps<Theme> }>;
  window?: () => Window;
};

function ElevationScroll({
  children,
  window: windowProp,
}: ElevationScrollProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 8,
    target: windowProp ? windowProp() : undefined,
  });

  return React.cloneElement(children, {
    sx: {
      boxShadow: trigger ? "0 10px 30px rgba(0,0,0,0.25)" : "none",
      transform: "translateY(0)",
    },
  });
}

type HeaderHomeProps = {
  window?: () => Window;
};

export default function HeaderHome(props: HeaderHomeProps) {
  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTiny = useMediaQuery("(max-width:360px)");

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const closeDrawer = () => setDrawerOpen(false);
  const openDrawer = () => setDrawerOpen(true);

  const bg =
    theme.palette.mode === "dark" ? "/nav-home-dark.png" : "/nav-home.png";

  const go = (path: string) => {
    navigate(path);
    closeDrawer();
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <ElevationScroll {...props}>
        <AppBar
          position="sticky"
          sx={{
            bgcolor: "rgba(10,14,24,0.35)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar
              sx={{
                px: { xs: 0, sm: 0 },
                minHeight: { xs: 64, sm: 74 },
                gap: { xs: 1, sm: 2 },
              }}
            >
              {/* Brand */}
              <Box
                onClick={() => navigate("/")}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, sm: 1 },
                  userSelect: "none",
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 },
                    borderRadius: 2.5,
                    background:
                      "linear-gradient(135deg, rgba(7, 4, 23, 0.9), rgba(27, 22, 117, 0.9))",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    flex: "0 0 auto",
                  }}
                >
                  <RestaurantMenuRoundedIcon sx={{ color: "#fff" }} />
                </Box>

                {!isTiny && (
                  <Typography
                    noWrap
                    sx={{
                      fontWeight: 900,
                      letterSpacing: 0.3,
                      color: "#fff",
                      fontSize: { xs: 16, sm: 20 },
                      maxWidth: { xs: 160, sm: 240 },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {t("navbar.title")}
                  </Typography>
                )}
              </Box>

              <Box sx={{ flex: 1 }} />

              {/* Desktop actions */}
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Button
                  variant="text"
                  onClick={() => navigate("/menu")}
                  startIcon={<MenuBookOutlinedIcon />}
                  sx={navTextBtnSX}
                >
                  {t("hero.viewMenu")}
                </Button>

                <SettingHome />

                <Button
                  variant="outlined"
                  onClick={() => navigate("/auth/login")}
                  startIcon={<LoginRoundedIcon sx={{ ml: 1 }} />}
                  sx={navOutlineBtnSX}
                >
                  {t("login.login")}
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/auth/signup")}
                  startIcon={<PersonAddAltRoundedIcon sx={{ ml: 1 }} />}
                  sx={navCtaBtnSX}
                >
                  {t("login.signUp")}
                </Button>
              </Stack>

              {/* Mobile actions */}
              <Box
                sx={{
                  display: { xs: "flex", sm: "none" },
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <IconButton
                  onClick={openDrawer}
                  sx={{
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.18)",
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.06)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.10)" },
                  }}
                  aria-label="open menu"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: "min(86vw, 360px)",
            bgcolor:
              theme.palette.mode === "dark" ? "rgba(10,14,24,0.98)" : "#fff",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2.5,
              background:
                "linear-gradient(135deg, rgba(7, 4, 23, 0.9), rgba(27, 22, 117, 0.9))",
              display: "grid",
              placeItems: "center",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            <RestaurantMenuRoundedIcon sx={{ color: "#fff" }} />
          </Box>
          <Typography sx={{ fontWeight: 900 }}>{t("navbar.title")}</Typography>
        </Box>

        <Divider />

        <List sx={{ py: 1 }}>
          <ListItemButton onClick={() => go("/menu")}>
            <ListItemIcon>
              <MenuBookOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t("hero.viewMenu")} />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          {/*Drawer Setting*/}
          <Box sx={{ px: 2, py: 1 }}>
            <SettingHome />
          </Box>

          <Divider sx={{ my: 1 }} />

          <ListItemButton onClick={() => go("/auth/login")}>
            <ListItemIcon>
              <LoginRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={t("login.login")} />
          </ListItemButton>

          <ListItemButton onClick={() => go("/auth/signup")}>
            <ListItemIcon>
              <PersonAddAltRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={t("login.signUp")} />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          display: "grid",
          width: "100%",
          overflow: "hidden",
          isolation: "isolate",
          bgcolor: "#0b1020",
        }}
      >
        <Box
          component="img"
          src={bg}
          alt=""
          aria-hidden
          sx={{
            gridArea: "1 / 1",
            width: "100%",
            height: "auto",
            maxHeight: "calc(100svh - 64px)",
            visibility: "hidden",
            pointerEvents: "none",
          }}
        />

        <Box
          component="img"
          src={bg}
          alt=""
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(28px) brightness(0.7)",
            transform: "scale(1.15)",
            zIndex: -4,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        <Box
          component="img"
          src={bg}
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            zIndex: -3,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: -2,
            background:
              "linear-gradient(180deg, rgba(11,16,32,0.65) 0%, rgba(11,16,32,0.55) 45%, rgba(11,16,32,0.85) 100%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            background:
              "radial-gradient(1000px 500px at 20% 20%, rgba(124,58,237,0.30), transparent 60%), radial-gradient(900px 500px at 80% 20%, rgba(18, 97, 154, 0.22), transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            gridArea: "1 / 1",
            position: "relative",
            zIndex: 1,
            display: "grid",
            placeItems: "center",
            minHeight: { xs: 420, sm: 480, md: 560 },
            py: { xs: 5, sm: 8 },
            px: { xs: 2, sm: 2 },
          }}
        >
          <Box sx={{ textAlign: "center", maxWidth: 860 }}>
            <Typography
              onClick={() => navigate("/")}
              variant="h1"
              sx={{
                color: "#fff",
                cursor: "pointer",
                fontSize: { xs: "2rem", sm: "3.1rem", md: "4rem" },
                lineHeight: 1.05,
                textShadow: "0 14px 40px rgba(0,0,0,0.45)",
                transition: "transform 180ms ease",
                "&:hover": { transform: "translateY(-2px)" },
                px: { xs: 0.5, sm: 0 },
              }}
            >
              {t("hero.title")}
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "rgba(255,255,255,0.78)",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
                px: { xs: 0.5, sm: 0 },
              }}
            >
              {t("hero.subtitle")}
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "rgba(255,255,255,0.78)",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
                px: { xs: 0.5, sm: 0 },
              }}
            >
              {t("hero.subtitle2")}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.25}
              sx={{
                mt: { xs: 3, sm: 4 },
                justifyContent: "center",
                alignItems: "stretch",
              }}
            >
              <Button
                variant="contained"
                size="large"
                fullWidth={isMobile}
                onClick={() => navigate("/menu")}
                startIcon={<MenuBookOutlinedIcon sx={{ ml: 1 }} />}
                sx={heroPrimaryBtnSX}
              >
                {t("hero.viewMenu")}
              </Button>

              <Button
                variant="outlined"
                size="large"
                fullWidth={isMobile}
                onClick={() => navigate("/auth/login")}
                startIcon={<LoginRoundedIcon sx={{ ml: 1 }} />}
                sx={heroOutlineBtnSX}
              >
                {t("login.login")}
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
}

const navTextBtnSX = {
  color: "rgba(255,255,255,0.9)",
  fontWeight: 900,
  "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
  borderRadius: 999,
};

const navOutlineBtnSX = {
  color: "#fff",
  borderColor: "rgba(255,255,255,0.32)",
  borderRadius: 999,
  "&:hover": {
    borderColor: "rgba(255,255,255,0.65)",
    bgcolor: "rgba(255,255,255,0.08)",
  },
};

const navCtaBtnSX = {
  fontWeight: 950,
  color: "#fff",
  borderRadius: 999,
  background:
    "linear-gradient(90deg,rgba(7, 4, 23, 0.9), rgba(27, 22, 117, 0.9))",
  "&:hover": {
    background:
      "linear-gradient(90deg, rgba(1, 1, 5, 0.9), rgba(15, 13, 63, 0.9))",
  },
};

const heroPrimaryBtnSX = {
  py: 1.25,
  px: 2.5,
  borderRadius: 999,
  fontWeight: 950,
  color: "#fff",
  background:
    "linear-gradient(90deg, rgba(7, 4, 23, 0.9), rgba(27, 22, 117, 0.9))",
  boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
  "&:hover": {
    background:
      "linear-gradient(90deg,  rgba(1, 1, 5, 0.9), rgba(15, 13, 63, 0.9))",
  },
};

const heroOutlineBtnSX = {
  py: 1.25,
  px: 2.5,
  borderRadius: 999,
  fontWeight: 950,
  color: "#fff",
  borderColor: "rgba(255,255,255,0.40)",
  "&:hover": {
    borderColor: "rgba(255,255,255,0.70)",
    bgcolor: "rgba(255,255,255,0.10)",
  },
};
