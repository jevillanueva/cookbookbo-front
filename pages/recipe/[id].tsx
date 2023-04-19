import { recipeInfoQuery } from "selectors";
import React, { useEffect, useState } from "react";
import {
    useRecoilState,
    useRecoilValueLoadable,
} from "recoil";

import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CommonLayout from "components/Layout";
import Container from "@mui/material/Container";
import Head from "next/head";
import HomeIcon from "@mui/icons-material/Home";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { recipeDetailsIdState, searchBarVisible } from "atoms";
import { useRouter } from "next/router";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Divider from "@mui/material/Divider";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
const RecipeInfoSection = () => {

    const recipeDetailsLodable = useRecoilValueLoadable(recipeInfoQuery);
    const [imgSrc, setImgSrc] = useState(false);

    switch (recipeDetailsLodable.state) {
        case "hasValue":
            const data = recipeDetailsLodable.contents.content;
            return (
                <>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "1rem 0" }}>
                        <Link href="/">
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                Inicio
                            </Typography>
                        </Link>
                        <Typography
                            sx={{ display: "flex", alignItems: "center" }}
                            color="text.primary"
                        >
                            <RestaurantIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {data.name}
                        </Typography>
                    </Breadcrumbs>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                <Paper elevation={24} sx={{ width: "254px", height: "140px" }}>
                                    <Image
                                        src={imgSrc ? '/error_recipe.svg' : (data.image !== undefined && data.image !== null) ? data.image.url : '/error_recipe.svg'}
                                        alt={data.name}
                                        width={254}
                                        height={140}
                                        onError={() => { setImgSrc(true) }}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xl={8} lg={8} md={6} sm={12} xs={12}>
                                <Stack spacing={2}>
                                    <Typography variant="h5">
                                        Detalles de la Receta
                                    </Typography>
                                    <Typography>
                                        {`Propietario: `}
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            {data.owner.replaceAll(`_nbsp_`, ` `).replaceAll(`_amp_`, `&`)}
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        {`Nombre: `}
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            {data.name}
                                        </Typography>
                                    </Typography>

                                    <Typography>
                                        {`Categorías: `}
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            {data.category.map((tag) => tag).join(`, `)}
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        {`Tags: `}
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            {data.tags.map((tag) => tag).join(`, `)}
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        {`Porciones: `}
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            {data.portion}
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        {`Tiempo: `}
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            {data.preparation_time_minutes > 60
                                                ? `${~~(data.preparation_time_minutes / 60)} horas y ${data.preparation_time_minutes % 60} minutos`
                                                : `${data.preparation_time_minutes} minutos`}
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        {`Año y Ubicación: `}
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            {`${data.year} - ${data.location}`}
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        {`Idioma: `}
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            {data.lang}
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        {`Publicado por: `}
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            {data.publisher}
                                        </Typography>
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>

                    </Box>
                    <Divider sx={{ margin: "2rem 0" }} />
                    <Box>

                        <Stack >
                            {data.preparation.map((step, index) => (
                                <>
                                    <Typography key={index} variant="h5" sx={{ textTransform: 'uppercase' }}>
                                        {`${index + 1}. ${step.name}`}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xl={4} lg={6} md={6} sm={12} xs={12}>
                                            <Typography key={index} variant="h6">Ingredientes</Typography>
                                            <List dense={true}>
                                                {step.ingredients.map((ingredient, index) => (
                                                    <ListItem key={index}  >
                                                        <ListItemText
                                                            primary={
                                                                `${ingredient.quantity_si === 0 ? "" : ingredient.quantity_si} ${ingredient.unit_si === "unknown" ? "" : ingredient.unit_si} ${ingredient.name}`
                                                            }
                                                            secondary={`${ingredient.quantity_equivalence === 0 ? "" : ingredient.quantity_equivalence} ${ingredient.unit_equivalence === "unknown" ? "" : ingredient.unit_equivalence}`}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Grid>
                                        <Grid item xl={8} lg={6} md={6} sm={12} xs={12}>
                                            <Typography key={index} variant="h6">Preparación</Typography>
                                            <List dense={true}>
                                                {step.steps.map((preparation, index) => (
                                                    <ListItem key={index}>
                                                        <ListItemText
                                                            primary={`${index + 1}. ${preparation.detail}`}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Grid>
                                    </Grid>
                                </>
                            ))}
                        </Stack>
                    </Box>
                </>
            );
        case "loading":
            return (
                <>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "1rem 0" }}>
                        <Link href="/">
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                Inicio
                            </Typography>
                        </Link>
                        <Typography
                            sx={{ display: "flex", alignItems: "center" }}
                            color="text.primary"
                        >
                            <Skeleton sx={{ minWidth: "5rem" }} />
                        </Typography>
                    </Breadcrumbs>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                <Paper elevation={24} sx={{ width: "254px", height: "140px" }}>
                                    <Skeleton sx={{ height: "140px", transform: "none" }} />
                                </Paper>
                            </Grid>
                            <Grid item xl={8} lg={8} md={6} sm={12} xs={12}>
                                <Stack spacing={2}>
                                    <Typography variant="h5">
                                        <Skeleton />
                                    </Typography>
                                    <Typography>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            <Skeleton />
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            <Skeleton />
                                        </Typography>
                                    </Typography>

                                    <Typography>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            <Skeleton />
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >

                                            <Skeleton />
                                        </Typography>
                                    </Typography>
                                    <Typography>

                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >

                                            <Skeleton />
                                        </Typography>
                                    </Typography>
                                    <Typography>

                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            <Skeleton />
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            <Skeleton />
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            <Skeleton />
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            <Skeleton />
                                        </Typography>
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>

                    </Box>
                    <Divider sx={{ margin: "2rem 0" }} />
                    <Box>

                        <Stack >
                            <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>
                                <Skeleton />
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xl={4} lg={6} md={6} sm={12} xs={12}>
                                    <Typography variant="h6">
                                        <Skeleton /></Typography>
                                    <List dense={true}>
                                        <ListItem  >
                                            <ListItemText>
                                                <Skeleton />
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem  >
                                            <ListItemText>
                                                <Skeleton />
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem  >
                                            <ListItemText>
                                                <Skeleton />
                                            </ListItemText>
                                        </ListItem>

                                    </List>
                                </Grid>
                                <Grid item xl={8} lg={6} md={6} sm={12} xs={12}>
                                    <Typography variant="h6"><Skeleton /></Typography>
                                    <List dense={true}>
                                        <ListItem >
                                            <ListItemText>
                                                <Skeleton />
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText>
                                                <Skeleton />
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Box>

                </>
            );
        case "hasError":
            throw recipeDetailsLodable.contents;
    }
};

const RecipeDetails: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [, setSearchBarVisible] = useRecoilState(searchBarVisible);
    const [, setRecipeDetailsId] = useRecoilState(recipeDetailsIdState);
    // const bookDetailsLodable = useRecoilValueLoadable(bookDetailsQuery);
useRecoilState
    useEffect(() => {
        id && setRecipeDetailsId(id as string);
        setSearchBarVisible(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <>
            <Head>
                <title>Detalles de la receta</title>
                <meta name="description" content="Detalles de la receta" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <CommonLayout>
                <Container>
                    <RecipeInfoSection />
                </Container>
            </CommonLayout>
        </>
    );
};

export default RecipeDetails;
