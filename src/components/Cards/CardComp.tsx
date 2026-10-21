import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";

interface CardProps {
  image: string;
  titleEn: string;
  titleFa: string;
  lang: "en" | "fa";
  id: string;
}

export default function CardComp({
  image,
  titleEn,
  titleFa,
  lang,
  id,
}: CardProps) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 0,
        width: "100%",
      }}
    >
      <CardActionArea component={Link} to={`/menu/${id}`}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            borderRadius: "4px",
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
            alt={titleEn}
            loading="lazy"
            decoding="async"
            sx={{
              gridArea: "1 / 1",
              display: "block",
              width: "100%",
              height: "auto",
              minHeight: { xs: 180, sm: 200 },
              maxHeight: { xs: 320, sm: 360, md: 400, lg: 420 },
              objectFit: "contain",
              objectPosition: "center",
              margin: "0 auto",
            }}
          />
        </Box>

        <CardContent
          sx={(theme) => ({
            bgcolor:
              theme.palette.mode === "dark"
                ? "background.darkPaper"
                : "background.default",
          })}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={(theme) => ({
              display: "flex",
              justifyContent: "center",
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
              textAlign: "center",
            })}
          >
            {lang === "fa" ? titleFa : titleEn}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
