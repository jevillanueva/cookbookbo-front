import PublicOffIcon from '@mui/icons-material/PublicOff';
import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { accessTokenState } from "atoms";
import { unPublishRecipeUser } from "lib/http";
import { useSnackbar } from "notistack";
import React from "react";
import { useRecoilState } from "recoil";

export default function DialogUnPublishRecipe(props: {
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
        const response = await unPublishRecipeUser(token, recipeId);
        if (response.error) {
            enqueueSnackbar(response.message, {
                variant: "error",
            });
            setLoading(false);
            handleClose();
            return;
        }
        enqueueSnackbar(`La receta ya no se encuentra pública`, {
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
                <PublicOffIcon color="error" sx={{  mb: -0.5,mr: 1 }} />
                {"Cancelar publicación"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography color="error">
                    <b>{`"${recipeTitle}"`}</b>
                    </Typography>
                    <Typography>
                    {`Se cancelará la publicación de la receta, no se mostrará abierta al público`}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus disabled={loading} color="primary">
                    Cerrar
                </Button>
                <LoadingButton onClick={handleAction} color='error' loading={loading}>
                    Cancelar publicación
                </LoadingButton>
            </DialogActions>
        </Dialog>);
}