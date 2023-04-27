import PublicOffIcon from '@mui/icons-material/PublicOff';
import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { accessTokenState } from "atoms";
import { unReviewRecipeUser } from "lib/http";
import { useSnackbar } from "notistack";
import React from "react";
import { useRecoilState } from "recoil";

export default function DialogUnReviewRecipe(props: {
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
    const handleDelete = async () => {
        setLoading(true);
        const response = await unReviewRecipeUser(token, recipeId);
        if (response.error) {
            enqueueSnackbar(response.message, {
                variant: "error",
            });
            setLoading(false);
            handleClose();
            return;
        }
        enqueueSnackbar(`La receta fue devuelta, no se revisará`, {
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
                <PublicOffIcon color="warning" sx={{  mb: -0.5,mr: 1 }} />
                {"Cancelar revisión "}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography color="warning">
                    <b>"{recipeTitle}"</b>
                    </Typography>
                    <Typography>
                    {`Se cancelará la revisión de la receta, no se revisará`}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus disabled={loading} color="primary">
                    Cerrar
                </Button>
                <LoadingButton onClick={handleDelete} color='warning' loading={loading}>
                    Cancelar revisión
                </LoadingButton>
            </DialogActions>
        </Dialog>);
}