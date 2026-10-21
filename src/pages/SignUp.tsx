import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverMsg, setServerMsg] = useState<string>("");

  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const onSubmit = (data: SignupFormValues) => {
    setServerMsg("");

    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      setServerMsg(t("signup.enterInputs") || t("login.enterInputs"));
      return;
    }

    alert(t("signup.welcome") || t("login.welcome"));
    navigate("/");
    reset();
  };

  return (
    <Box
      sx={() => ({
        display: "grid",
        placeItems: "center",
        px: 2,
        py: 6,
      })}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={(theme) => ({
            borderRadius: 4,
            p: { xs: 2.5, sm: 4 },
            background:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.35)",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.14)"
                : "1px solid rgba(103,52,27,0.16)",
            backdropFilter: "blur(10px)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 20px 60px rgba(0,0,0,0.35)"
                : "0 18px 50px rgba(103,52,27,0.18)",
          })}
        >
          <Stack spacing={2.2}>
            <Box>
              <Typography
                variant="h4"
                fontWeight={1000}
                sx={(theme) => ({
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : theme.palette.text.lightPrimary,
                  letterSpacing: 0.3,
                })}
              >
                {t("login.signUp") || t("signup.title") || "Sign Up"}
              </Typography>

              <Typography
                variant="body2"
                sx={(theme) => ({
                  mt: 0.5,
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(231,242,239,0.70)"
                      : "rgba(103,52,27,0.70)",
                })}
              >
                {t("signup.subtitle") || "Create your account to continue."}
              </Typography>
            </Box>

            <Divider
              sx={(theme) => ({
                borderColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(103,52,27,0.18)",
              })}
            />

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2}>
                {/* Name */}
                <TextField
                  label={t("signup.name") || "Full Name"}
                  autoComplete="name"
                  fullWidth
                  error={!!errors.name}
                  helperText={
                    errors.name?.type === "required"
                      ? t("signup.nameRequired") || "Name is required."
                      : errors.name?.type === "minLength"
                        ? t("signup.nameMin") || "Name is too short."
                        : ""
                  }
                  {...register("name", {
                    required: true,
                    minLength: 2,
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Email */}
                <TextField
                  label={t("login.emailPlaceholder") || "Email"}
                  autoComplete="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={
                    errors.email?.type === "required"
                      ? t("login.emailRequired") || "Email is required."
                      : errors.email?.type === "pattern"
                        ? t("login.emailInvalid") || "Email is invalid."
                        : ""
                  }
                  {...register("email", {
                    required: true,
                    pattern: emailPattern,
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Password */}
                <TextField
                  label={t("login.passwordPlaceholder") || "Password"}
                  autoComplete="new-password"
                  type={showPass ? "text" : "password"}
                  fullWidth
                  error={!!errors.password}
                  helperText={
                    errors.password?.type === "required"
                      ? t("login.passwordRequired") || "Password is required."
                      : errors.password?.type === "pattern"
                        ? t("login.passwordPattern") ||
                          "Password must be strong."
                        : ""
                  }
                  {...register("password", {
                    required: true,
                    pattern: passwordPattern,
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPass((p) => !p)}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPass ? (
                            <VisibilityOffRoundedIcon />
                          ) : (
                            <VisibilityRoundedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Confirm Password */}
                <TextField
                  label={t("signup.confirmPassword") || "Confirm Password"}
                  autoComplete="new-password"
                  type={showConfirm ? "text" : "password"}
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword?.type === "required"
                      ? t("signup.confirmRequired") || "Confirm your password."
                      : errors.confirmPassword?.type === "validate"
                        ? t("signup.confirmMismatch") ||
                          "Passwords do not match."
                        : ""
                  }
                  {...register("confirmPassword", {
                    required: true,
                    validate: (v) => v === password,
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirm((p) => !p)}
                          edge="end"
                          aria-label="toggle confirm password visibility"
                        >
                          {showConfirm ? (
                            <VisibilityOffRoundedIcon />
                          ) : (
                            <VisibilityRoundedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {serverMsg ? (
                  <Alert
                    severity="error"
                    sx={(theme) => ({
                      borderRadius: 3,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(255,255,255,0.35)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.14)"
                          : "1px solid rgba(103,52,27,0.16)",
                    })}
                  >
                    {serverMsg}
                  </Alert>
                ) : null}

                <Button
                  type="submit"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={<PersonAddRoundedIcon sx={{ ml: 1 }} />}
                  sx={(theme) => ({
                    py: 1.2,
                    borderRadius: 3,
                    fontWeight: 1000,
                    letterSpacing: 0.2,
                    color: "#fff",
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(90deg, rgba(7, 4, 23, 0.9), rgba(27, 22, 117, 0.9))"
                        : "linear-gradient(90deg, #67341b, #fcbc4e)",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 10px 25px rgba(47, 20, 148, 0.53)"
                        : "0 12px 28px rgba(103,52,27,0.20)",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(90deg, rgba(1, 1, 5, 0.9), rgba(15, 13, 63, 0.9))"
                          : "linear-gradient(90deg, #5a2c17, #f7b640)",
                    },
                    transition: "transform 140ms ease",
                  })}
                  fullWidth
                >
                  {t("login.signUp") || "Sign Up"}
                </Button>

                <Typography
                  variant="body2"
                  sx={(theme) => ({
                    textAlign: "center",
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(231,242,239,0.70)"
                        : "rgba(103,52,27,0.75)",
                  })}
                >
                  {t("signup.haveAccount") || "Already have an account?"}{" "}
                  <Box
                    component={RouterLink}
                    to="/auth/login"
                    sx={(theme) => ({
                      color:
                        theme.palette.mode === "dark"
                          ? "#a5b4fc"
                          : theme.palette.text.lightPrimary,
                      fontWeight: 900,
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    })}
                  >
                    {t("login.login") || "Login"}
                  </Box>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
