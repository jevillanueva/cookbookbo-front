import { pageDetailsIdState, searchBarVisible } from "atoms";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

import CommonLayout from "components/Layout";
import { Box, Breadcrumbs, Container, Grid, Link, Skeleton, Typography } from "@mui/material";
import { pageInfoQuery } from "selectors";

import { AppDetails, PageProps } from "const";
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from '@mui/icons-material/Description';
const PageDetailSection = (props: {
    setTitle: (title: string) => void,
    setDescription: (description: string) => void
}) => {
    const { setTitle, setDescription } = props;
    const pageDetailsLoadable = useRecoilValueLoadable(pageInfoQuery);
    const [html, setHtml] = useState<string>("");
    const loadContent = async (content: PageProps) => {
        const file = await unified()
            .use(remarkParse)
            .use(remarkHtml)
            .process(content.html)
        setHtml(file.toString())
    };
    switch (pageDetailsLoadable.state) {
        case "hasValue":
            const data = pageDetailsLoadable.contents.content;
            loadContent(data);
            setTitle(data.title);
            setDescription(data.title);
            return (
                <Box>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "1rem 0" }}>
                        <Link href="/" aria-label="Inicio">
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
                            <DescriptionIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            {data.title}
                        </Typography>
                    </Breadcrumbs>
                    <Grid container>
                        <Grid item lg={12} md={12} xs={12} >
                            {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
                        </Grid>
                    </Grid>
                </Box>

            );
        case "loading":
            return (
                <Box>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "1rem 0" }}>
                        <Link href="/" aria-label="Inicio">
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
                    <Grid container>
                        <Grid item lg={12} md={12} xs={12} >
                            <Skeleton variant="rectangular" sx={{ height: "150px" }} />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="rectangular" sx={{ height: "150px" }} />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="rectangular" sx={{ height: "150px" }} />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </Grid>
                    </Grid>
                </Box>
            );
        case "hasError":
            throw pageDetailsLoadable.contents;
    }
}
const PagePage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [, setSearchBarVisible] = useRecoilState(searchBarVisible);
    const [, setPageDetailsIdState] = useRecoilState(pageDetailsIdState);
    const [title, setTitle] = useState<string>(AppDetails.title);
    const [description, setDescription] = useState<string>(AppDetails.description);
    useRecoilState
    useEffect(() => {
        id && setPageDetailsIdState(id as string);
        setSearchBarVisible(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#a96766"/>
            </Head>
            <CommonLayout>
                <Container>
                    <PageDetailSection setTitle={setTitle} setDescription={setDescription} />
                </Container>
            </CommonLayout>
        </>
    );

};

export default PagePage;