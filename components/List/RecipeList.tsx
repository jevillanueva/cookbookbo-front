import { Box, List, ListItem, Pagination, Skeleton } from "@mui/material"
import { RecipeProps } from "const";
import { Loadable } from "recoil";
import RecipeListItem from "./RecipeListItem";
export default function RecipeList(props: {
    data: Loadable<{
        content: RecipeProps[];
        total: number;
        error?: any;
    }>,
    page_size?: number,
    page: number,
    state: string,
    setPaginationQueryData: any,
    paginationQueryData: any
    callbackPublished?: () => void,
    callbackUnReview?: () => void,
    callbackUnRequest?: () => void,
    callbackReject?: () => void,
}) {
    const { data, page_size = 10, page, state, setPaginationQueryData,
        paginationQueryData,
        callbackPublished = () => { },
        callbackUnReview = () => { },
        callbackUnRequest = () => { },
        callbackReject = () => { },
    } = props;
    switch (data.state) {
        case "hasValue":
            return (
                <Box>
                    <List dense={false}>
                        {data.contents.content.map((recipe) => (
                            <RecipeListItem key={recipe._id} recipe={recipe} state={state}
                                callbackPublished={callbackPublished}
                                callbackUnReview={callbackUnReview}
                                callbackUnRequest={callbackUnRequest}
                                callbackReject={callbackReject}
                            />
                        ))}
                    </List>
                    <Box
                        sx={{
                            padding: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Pagination
                            count={Math.ceil(data.contents.total / page_size)}
                            page={page}
                            color="primary"
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                page: number
                            ) => {
                                setPaginationQueryData({ ...paginationQueryData, page });
                            }}
                        />
                    </Box>
                </Box>
            );
        case "loading":
            return (
                <Box>
                    <List dense={false}>
                        <ListItem>
                            <Skeleton variant="circular" width={45} height={40} />
                            <Skeleton sx={{ marginLeft: "30px", width: "100%" }} />
                        </ListItem>
                        <ListItem>
                            <Skeleton variant="circular" width={45} height={40} />
                            <Skeleton sx={{ marginLeft: "30px", width: "100%" }} />
                        </ListItem>
                        <ListItem>
                            <Skeleton variant="circular" width={45} height={40} />
                            <Skeleton sx={{ marginLeft: "30px", width: "100%" }} />
                        </ListItem>
                    </List>
                </Box>
            );
        case "hasError":
            throw data.contents;
    }
}