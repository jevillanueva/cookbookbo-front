import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { RecipeProps } from "const";

export default function BasicCard(props: RecipeProps) {
  const { _id, name, description, lang, owner,
    publisher, tags, year, location, category, portion, preparation_time_minutes,
    score, preparation, image, published } = props;
  const [src, setSrc] = React.useState((image !== undefined && image !== null)? image.url : '/error_recipe.svg');

  return (
    <Card
      sx={{
        width: 256,
        boxShadow:
          "0 0.5em 1em -0.125em hsl(0deg 0% 4% / 10%), 0 0 0 1px hsl(0deg 0% 4% / 2%)",
        border: "1px solid #e9eaee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {(image !== undefined && image !== null) && (
          <CardMedia sx={{width: "254px", height: "140px"}}>
            <Image
              onError={() => setSrc('/error_recipe.svg')}
              src={src}
              alt={name}
              width={254}
              height={140}
              style={{objectFit: 'cover'}}
            />
          </CardMedia>
        )}
        <CardContent>
          {owner && (
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {owner.replaceAll(`_nbsp_`, ` `).replaceAll(`_amp_`, `&`)}
            </Typography>
          )}
          <Link href={`/recipe/${_id}`}>
            <Typography variant="h5" component="div" sx={{ cursor: "pointer" }}>
              {name}
            </Typography>
          </Link>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {tags.map((tag) => tag).join(`, `)}
          </Typography>
          <Typography
            component="div"
            variant="body1"
            sx={{ color: "#616161" }}
          >{portion} porciones</Typography>
          <Typography
            component="div"
            variant="body1"
            sx={{ color: "#616161" }}
          >{preparation_time_minutes > 60
            ? `${~~(preparation_time_minutes / 60)} horas y ${preparation_time_minutes % 60} minutos`
            : `${preparation_time_minutes} minutos`}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography
              component="div"
              variant="body2"
              sx={{ color: "#616161" }}
            >{year} - {location}</Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
