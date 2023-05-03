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
import { fetchRecipeMetaById } from "lib/http";
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
                                <Paper elevation={24} sx={{ width: "254px", height: "254px" }}>
                                    <Image
                                        src={imgSrc ? '/error_recipe.svg' : (data.image !== undefined && data.image !== null) ? data.image.url : '/error_recipe.svg'}
                                        alt={data.name}
                                        width={254}
                                        height={254}
                                        style={{objectFit: 'cover'}}
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
                                            {data.owner}
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
                                            {data.category && data.category.map((tag) => tag).join(`, `)}
                                        </Typography>
                                    </Typography>
                                    <Typography>
                                        {`Tags: `}
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="text.secondary"
                                            component="span"
                                        >
                                            {data.tags && data.tags.map((tag) => tag).join(`, `)}
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
                            {data.preparation && data.preparation.map((step, index) => (
                                <Box  key={index}>
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
                                </Box>
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
                            color="text.primary" component={"div"}
                        >
                            <Skeleton sx={{ minWidth: "5rem" }} />
                        </Typography>
                    </Breadcrumbs>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                <Paper elevation={24} sx={{ width: "254px", height: "254px" }}>
                                    <Skeleton sx={{ height: "254px", transform: "none" }} />
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
type Props = {
    params: { id: string };
};
interface PageProps {
    title: string;
    description: string;
    image: string;
  }
const RecipeDetails: NextPage<PageProps> = ({title,description,image} ) => {
    const router = useRouter();
    const { id } = router.query;
    const [, setSearchBarVisible] = useRecoilState(searchBarVisible);
    const [, setRecipeDetailsId] = useRecoilState(recipeDetailsIdState);
    // const bookDetailsLodable = useRecoilValueLoadable(bookDetailsQuery);
    useEffect(() => {
        id && setRecipeDetailsId(id as string);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    useEffect(() => {
        setSearchBarVisible(false);
    });

    return (
        <>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.png" />
                <meta name="description" content={description} />

                <meta property="og:type" content="website"/>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta name="image" property="og:image" content={image}/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image}/>
            </Head>

            <CommonLayout>
                <Container>
                    <RecipeInfoSection />
                </Container>
            </CommonLayout>
        </>
    );
};


export async function getServerSideProps(context: any) {
    // Retrieve id
    const { params } = context;
    const id = params.id;

    // Fetch data
    const data = await fetchRecipeMetaById(id);
    return {
        props: {
            title: data.title,
            description: data.description,
            image: data.image,
        }
    };
}

// // set dynamic metadata
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     // read route params
//     const id = params.id;
//     // fetch data
//     const data = await fetchRecipeMetaById(id);
//     console.log(data);

//     return {
//         title: data.title,
//         description: data.description,
//         image: data.image,
//     };
// }
export default RecipeDetails;
