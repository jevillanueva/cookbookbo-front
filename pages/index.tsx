import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/HomePage.module.css";
import CommonLayout from "components/Layout";
import { Box, Container, Pagination, Skeleton, Typography } from "@mui/material";
import { homePageQueryState, homePageRecipeSumState } from "atoms";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { homePageQuery } from "selectors";
import RecipeInfo from "components/Card/RecipeInfo";
import { RecipeSekeleton } from "components/Skeleton/RecipeCardSkeleton";
const PAGE_SIZE = 10;


const RecipeList = (props: { page: number }) => {
  const { page } = props;
  const recipeListLoadable = useRecoilValueLoadable(homePageQuery);
  const [homePageRecipeSum, setHomePageRecipeSum] = useRecoilState(homePageRecipeSumState);
  switch (recipeListLoadable.state) {
    case "hasValue":
      setHomePageRecipeSum(recipeListLoadable.contents.total);
      return (
        <>
          {!!homePageRecipeSum && (
            <Typography
              component="div"
              variant="body2"
              sx={{ padding: "1rem 0" }}
            >{`${PAGE_SIZE * (page - 1) + 1} ~ ${PAGE_SIZE * page
              } de ${homePageRecipeSum} resultados`}</Typography>
          )}
          <div className={styles.itemList}>
            {recipeListLoadable.contents.content.map((recipe) => (
              <RecipeInfo key={recipe._id} {...recipe} />
            ))}
          </div>
        </>
      );
    case "loading":
      return (
        <>
          <Skeleton sx={{ maxWidth: "10rem", margin: "1rem 0" }} />
          <div className={styles.itemList} >
            {Array.from(Array(PAGE_SIZE)).map((i, idx) => (
              <RecipeSekeleton key={idx} />
            ))}
          </div>
        </>
      );
    case "hasError":
      throw recipeListLoadable.contents;
  }
};

const Home: NextPage = () => {
  const [homePageQueryData, setHomePageQueryData] = useRecoilState(homePageQueryState);
  const [homePageRecipeSum] = useRecoilState(homePageRecipeSumState);
  return (
    <>
      <Head>
        <title>Cocina Boliviana</title>
        <meta name="description" content="Cocina Boliviana" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <CommonLayout>
        <div className={styles.content}>
          <main className={styles.main}>
            <Container>
              <RecipeList page={homePageQueryData.page} />
              <Box
                sx={{
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={Math.ceil(homePageRecipeSum / PAGE_SIZE)}
                  page={homePageQueryData.page}
                  color="primary"
                  onChange={(
                    event: React.ChangeEvent<unknown>,
                    page: number
                  ) => {
                    // setHomePageIdx(page);
                    setHomePageQueryData({ ...homePageQueryData, page });
                  }}
                />
              </Box>
            </Container>
          </main>
        </div>
      </CommonLayout>
    </>
  );
};

export default Home;
