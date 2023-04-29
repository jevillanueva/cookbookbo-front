import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import { accessTokenState } from "atoms";
import { changeImageRecipeUser, reviewRecipeUser } from "lib/http";
import { useSnackbar } from "notistack";
import React from "react";
import { useRecoilState } from "recoil";

export default function DialogUpdateImageRecipe(props: {
    open: boolean,
    setOpen: (state: boolean) => void,
    recipeId: string,
    recipeTitle: string,
    callback?: () => void
}) {
    const [token] = useRecoilState(accessTokenState);
    const { open, setOpen, recipeId, recipeTitle, callback = () => { } } = props;
    const [loading, setLoading] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState({name:""});
    const { enqueueSnackbar } = useSnackbar();
    const handleFileChange = (event: any ) => {
        const file = event.target.files[0];
        if (!file){
            setSelectedFile({name:""});
            return;
        }
        setSelectedFile(file);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAction = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const response = await changeImageRecipeUser(token, recipeId, selectedFile);
        if (response.error) {
            enqueueSnackbar(response.message, {
                variant: "error",
            });
            setLoading(false);
            handleClose();
            return;
        }
        enqueueSnackbar(`Se añadió la imagen`, {
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
            <form onSubmit={handleAction}>
                <DialogTitle id="alert-dialog-title">
                    <AddPhotoAlternateIcon color="secondary" sx={{ mb: -0.5, mr: 1 }} />
                    {"Imagen de receta"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography color="secondary">
                            <b>{`"${recipeTitle}"`}</b>
                        </Typography>
                        <Typography >
                            {"Se recomienda imágenes inferiores a 3 MB"}
                        </Typography>
                        <Typography >
                            {"Y en formato cuadrado 1:1 (ejemplo: 500x500)"}
                        </Typography>
                        <br></br>
                        <Button color='secondary' variant='outlined' component="label" endIcon={<PhotoCamera />}>
                            Seleccionar
                            <input hidden accept="image/avif,image/gif,image/jpeg,image/png,image/web,image/svg,image/svg+xml" type="file" onChange={handleFileChange} />
                        </Button>
                        <Typography>
                            {selectedFile ? selectedFile.name : "No se ha seleccionado ninguna imagen"}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus disabled={loading} color='primary'>
                        Cerrar
                    </Button>
                    <LoadingButton type='submit' color="secondary" loading={loading} disabled={!selectedFile}>
                        Enviar imagen
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>);
}