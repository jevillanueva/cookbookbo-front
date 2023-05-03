import { accessTokenState, searchBarVisible } from "atoms";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

import CommonLayout from "components/Layout";
import { Box, Breadcrumbs, Container, Grid, Link, Paper, Skeleton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import axios from "axios";
import { mePageQuery } from "selectors";

import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from "@mui/icons-material/Home";
import Image from "next/image";
const MeInfoSection = () => {
    const meDetailsLoadable = useRecoilValueLoadable(mePageQuery);
    switch (meDetailsLoadable.state) {
        case "hasValue":
            const data = meDetailsLoadable.contents.content;
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
                            <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {data.username}
                        </Typography>
                    </Breadcrumbs>
                    <Box>
                        <Grid container spacing={2} alignItems="center"
                            justifyContent="center" >
                            <Grid item lg={6} md={6} sm={12} >
                                <Image src={data.picture} alt={data.given_name} width={92} height={92} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12}>
                                <Typography>
                                    {`Usuario: `}
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        component="span"
                                    >
                                        {data.username}
                                    </Typography>
                                </Typography>
                                <Typography>
                                    {`Email: `}
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        component="span"
                                    >
                                        {data.email}
                                    </Typography>
                                </Typography>
                                <Typography>
                                    {`Nombre: `}
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        component="span"
                                    >
                                        {data.given_name} {data.family_name}
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
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
                        <Grid container spacing={2} alignItems="center"
                            justifyContent="center" >
                            <Grid item lg={6} md={6} sm={12} >
                                <Skeleton sx={{ height: "96px", transform: "none" }} />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12}>
                                <Typography>
                                    <Skeleton />
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        component="span"
                                    >
                                        <Skeleton />
                                    </Typography>
                                </Typography>
                                <Typography>
                                    <Skeleton />
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        component="span"
                                    >
                                        <Skeleton />
                                    </Typography>
                                </Typography>
                                <Typography>
                                    <Skeleton />
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        component="span"
                                    >
                                        <Skeleton />
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            );
        case "hasError":
            throw meDetailsLoadable.contents;
    }
};

const MePage: NextPage = () => {
    const router = useRouter();
    const [, setSearchBarVisible] = useRecoilState(searchBarVisible);
    useEffect(() => { setSearchBarVisible(false) });
    return (
        <>
            <Head>
                <title>Mi Perfil</title>
                <meta name="description" content="Perfil de Usuario" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <CommonLayout>
                <Container>
                    <MeInfoSection />
                </Container>
            </CommonLayout>
        </>
    );
};

export default MePage;