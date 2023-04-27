import { AppBar, Box, Button, Container, Fab, Grid, Tab, Tabs, Typography } from "@mui/material";
import {
    searchBarVisible,
    searchRecipeUserNotRequestedQueryState,
    searchRecipeUserNotRequestedState,
    searchRecipeUserNotReviewedQueryState,
    searchRecipeUserNotReviewedState,
    searchRecipeUserPublishedQueryState,
    searchRecipeUserPublishedState,
    searchRecipeUserRejectedQueryState,
    searchRecipeUserRejectedState
} from "atoms";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import AddIcon from '@mui/icons-material/Add';
import CommonLayout from "components/Layout";
import RecipeList from "components/List/RecipeList";
import SearchForm from "components/Forms/searchForm";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
import React from "react";
import {
    userRecipesNotRequestedQuery,
    userRecipesNotReviewedQuery,
    userRecipesPublishedQuery,
    userRecipesRejectedQuery
} from "selectors";
const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 16,
    bottom: 16,
    left: 'auto',
    position: 'fixed',
}
const PAGE_SIZE = 10;
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
const Recipes = () => {
    const [searchPublished, setSearchRecipePublishedState] = useRecoilState(searchRecipeUserPublishedState);
    const [searchNotRequested, setSearchRecipeNotRequestedState] = useRecoilState(searchRecipeUserNotRequestedState);
    const [searchNotReviewed, setSearchRecipeNotReviewedState] = useRecoilState(searchRecipeUserNotReviewedState);
    const [searchRejected, setSearchRecipeRejectedState] = useRecoilState(searchRecipeUserRejectedState);

    const [srPublishedQueryState, setSearchRecipeUserPublishedQueryState] = useRecoilState(searchRecipeUserPublishedQueryState);
    const [srNotRequestedQueryState, setSearchRecipeUserNotRequestedQueryState] = useRecoilState(searchRecipeUserNotRequestedQueryState);
    const [srNotReviewedQueryState, setSearchRecipeUserNotReviewedQueryState] = useRecoilState(searchRecipeUserNotReviewedQueryState);
    const [srRejectedQueryState, setSearchRecipeUserRejectedQueryState] = useRecoilState(searchRecipeUserRejectedQueryState);

    const recipeListLoadableNotRequested = useRecoilValueLoadable(userRecipesNotRequestedQuery);
    const recipeListLoadableNotReviewed = useRecoilValueLoadable(userRecipesNotReviewedQuery);
    const recipeListLoadableRejected = useRecoilValueLoadable(userRecipesRejectedQuery);
    const recipeListLoadablePublished = useRecoilValueLoadable(userRecipesPublishedQuery);

    useEffect(() => {
        let searchElement = document.getElementById("searchNotRequested");
        if (searchElement) {
            searchElement.value = searchNotRequested.search;
        }
    })
    useEffect(() => {
        let searchElement = document.getElementById("searchNotReviewed");
        if (searchElement) {
            searchElement.value = searchNotReviewed.search;
        }
    })
    useEffect(() => {
        let searchElement = document.getElementById("searchRejected");
        if (searchElement) {
            searchElement.value = searchRejected.search;
        }
    })
    useEffect(() => {
        let searchElement = document.getElementById("searchPublished");
        if (searchElement) {
            searchElement.value = searchPublished.search;
        }
    })
    const submitSearchPublished = (e: any) => {
        e.preventDefault();
        setSearchRecipePublishedState({ search: e.target[0].value })
    };
    const submitSearchNotRequested = (e: any) => {
        e.preventDefault();
        setSearchRecipeNotRequestedState({ search: e.target[0].value })
    };
    const submitSearchNotReviewed = (e: any) => {
        e.preventDefault();
        setSearchRecipeNotReviewedState({ search: e.target[0].value })
    };
    const submitSearchRejected = (e: any) => {
        e.preventDefault();
        setSearchRecipeRejectedState({ search: e.target[0].value })
    };
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                setSearchRecipeUserNotRequestedQueryState({ ...srNotRequestedQueryState, page: 1 });
                break;
            case 1:
                setSearchRecipeUserRejectedQueryState({ ...srRejectedQueryState, page: 1 });
                break;
            case 2:
                setSearchRecipeUserNotReviewedQueryState({ ...srNotReviewedQueryState, page: 1 });
                break;
            case 3:
                setSearchRecipeUserPublishedQueryState({ ...srPublishedQueryState, page: 1 });
                break;
        }
    };
    return (
        <Box>
            <AppBar position="static" sx={{ boxShadow: "0px 3px 1px 0px rgba(0,0,0,0.2)" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="full width tabs example"
                >
                    <Tab label="Borradores" id="full-width-tab-0" aria-controls="full-width-tabpanel-0" />
                    <Tab label="Rechazados" id="full-width-tab-1" aria-controls="full-width-tabpanel-1" />
                    <Tab label="Pendientes" id="full-width-tab-2" aria-controls="full-width-tabpanel-2" />
                    <Tab label="Publicados" id="full-width-tab-3" aria-controls="full-width-tabpanel-3" />
                </Tabs>
            </AppBar>

            <Container>

                <TabPanel value={value} index={0}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <SearchForm submitSearch={submitSearchNotRequested} idSearch="searchNotRequested" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <RecipeList
                                data={recipeListLoadableNotRequested}
                                page_size={PAGE_SIZE}
                                page={srNotRequestedQueryState.page}
                                paginationQueryData={srNotRequestedQueryState}
                                setPaginationQueryData={setSearchRecipeUserNotRequestedQueryState}
                                state="not_requested"
                                callbackUnRequest={() => { setSearchRecipeNotRequestedState({ search: searchNotRequested.search }) }}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <SearchForm submitSearch={submitSearchRejected} idSearch="searchRejected" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <RecipeList data={recipeListLoadableRejected} page_size={PAGE_SIZE}
                                page={srRejectedQueryState.page}
                                paginationQueryData={srRejectedQueryState}
                                setPaginationQueryData={setSearchRecipeUserRejectedQueryState}
                                state="rejected"
                                callbackReject={() => { setSearchRecipeRejectedState({ search: searchRejected.search }) }}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <SearchForm submitSearch={submitSearchNotReviewed} idSearch="searchNotReviewed" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <RecipeList data={recipeListLoadableNotReviewed} page_size={PAGE_SIZE}
                                page={srNotReviewedQueryState.page}
                                paginationQueryData={srNotReviewedQueryState}
                                setPaginationQueryData={setSearchRecipeUserNotReviewedQueryState}
                                state="not_reviewed"
                                callbackUnReview={() => { setSearchRecipeNotReviewedState({ search: searchNotReviewed.search }) }}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <SearchForm submitSearch={submitSearchPublished} idSearch="searchPublished" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <RecipeList data={recipeListLoadablePublished} page_size={PAGE_SIZE}
                                page={srPublishedQueryState.page}
                                paginationQueryData={srPublishedQueryState}
                                setPaginationQueryData={setSearchRecipeUserPublishedQueryState}
                                state="published"
                                callbackPublished={() => { setSearchRecipePublishedState({ search: searchPublished.search }) }}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
            </Container>



            <Fab sx={fabStyle} aria-label={"new recipe"} color={"primary"}>
                <AddIcon />
            </Fab>

        </Box>
    )
}
const MyRecipesPage: NextPage = () => {
    const [, setSearchBarVisible] = useRecoilState(searchBarVisible);
    useEffect(() => { setSearchBarVisible(false) });
    return (
        <>
            <Head>
                <title>Mis Recetas</title>
                <meta name="description" content="Mis Recetas" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <CommonLayout>
                <Recipes />
            </CommonLayout>
        </>
    );
};

export default MyRecipesPage;