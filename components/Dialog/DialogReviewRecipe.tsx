import PublicIcon from '@mui/icons-material/Public';
import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { accessTokenState } from "atoms";
import { reviewRecipeUser } from "lib/http";
import { useSnackbar } from "notistack";
import React from "react";
import { useRecoilState } from "recoil";

export default function DialogReviewRecipe(props: {
    open: boolean,
    setOpen: (state: boolean) => void,
    recipeId: string,
    recipeTitle: string,
    callback?: () => void
}) {
    const [token] = useRecoilState(accessTokenState);
    const { open, setOpen, recipeId, recipeTitle, callback = () => { } } = props;
    const [loading, setLoading] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const handleClose = () => {
        setOpen(false);
    };
    const handleAction = async () => {
        setLoading(true);
        const response = await reviewRecipeUser(token, recipeId);
        if (response.error) {
            enqueueSnackbar(response.message, {
                variant: "error",
            });
            setLoading(false);
            handleClose();
            return;
        }
        enqueueSnackbar(`La receta fue enviada para revisión`, {
            variant: "success",
        });
        setLoading(false);
        handleClose();
        callback();
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <PublicIcon color="secondary" sx={{  mb: -0.5 ,mr: 1 }} />
                {"Enviar a revisión"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography color="secondary">
                    <b>"{recipeTitle}"</b>
                    </Typography>
                    <Typography>
                    {`Se enviará la receta para revisión para su posterior publicación`}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus disabled={loading} color='primary'>
                    Cerrar
                </Button>
                <LoadingButton onClick={handleAction} color="secondary" loading={loading}>
                    Enviar a revisión
                </LoadingButton>
            </DialogActions>
        </Dialog>);
}