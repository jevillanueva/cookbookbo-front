import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { accessTokenState } from "atoms";
import { deleteRecipesUser } from "lib/http";
import { useSnackbar } from "notistack";
import React from "react";
import { useRecoilState } from "recoil";

export default function DialogDeleteRecipe(props: {
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
        const response = await deleteRecipesUser(token, recipeId);
        if (response.error) {
            enqueueSnackbar(response.message, {
                variant: "error",
            });
            setLoading(false);
            handleClose();
            return;
        }
        enqueueSnackbar(`La receta fue eliminada`, {
            variant: "success",
        });
        setLoading(false);
        handleClose();
        callback();
        // Router.reload();
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <ReportProblemIcon color="error" sx={{  mb: -0.5,mr: 1 }} />
                {"Eliminar receta "}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography color="error">
                    <b>"{recipeTitle}"</b>
                    </Typography>
                    <Typography>
                    {`Esta operación no se puede deshacer. ¿Estás seguro de que quieres eliminar esta receta?`}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus disabled={loading}>
                    Cerrar
                </Button>
                <LoadingButton onClick={handleAction} color="error" loading={loading}>
                    Eliminar
                </LoadingButton>
            </DialogActions>
        </Dialog>);
}