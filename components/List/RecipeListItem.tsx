import MoreVertIcon from "@mui/icons-material/MoreVert";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem } from "@mui/material";
import { RecipeProps } from "const";
import { useState } from "react";
import Image from "next/image";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DialogDeleteRecipe from "components/Dialog/DialogDeleteRecipe";
import DialogReviewRecipe from "components/Dialog/DialogReviewRecipe";
import DialogUnReviewRecipe from "components/Dialog/DialogUnReviewRecipe";
import { useRecoilState } from "recoil";
import { searchRecipeUserPublishedState, searchRecipeUserNotRequestedState, searchRecipeUserNotReviewedState, searchRecipeUserRejectedState } from "atoms";
import DialogUnPublishRecipe from "components/Dialog/DialogUnPublishRecipe";
interface ListItemProps {
    primaryText: string;
    secondaryText: string;
}


export default function RecipeListItem(props: {
    recipe: RecipeProps, state: string,
    callbackPublished: () => void,
    callbackUnReview: () => void,
    callbackUnRequest: () => void,
    callbackReject: () => void,
}) {
    const { recipe, state, 
        callbackPublished = () => { },
        callbackUnReview = () => { },
        callbackUnRequest = () => { },
        callbackReject = () => { },
     } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [openUnReview, setOpenUnReview] = useState(false);
    const [openUnPublish, setOpenUnPublish] = useState(false);
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleVisualizeRecipe = (id: string) => {
        console.log(id)
        handleMenuClose();
    };
    const handleUnPublishRecipe = (id: string) => {
        setOpenUnPublish(true);
        console.log(id)
        handleMenuClose();
    };
    const handleUnReviewRecipe = (id: string) => {
        setOpenUnReview(true);
        console.log(id)
        handleMenuClose();
    };
    const handleReviewRecipe = (id: string) => {
        setOpenReview(true);
        console.log(id)
        handleMenuClose();
    };
    const handleEditRecipe = (id: string) => {
        console.log(id)
        handleMenuClose();
    };
    const handleEditPhotoRecipe = (id: string) => {
        console.log(id)
        handleMenuClose();
    };
    const handleDeleteRecipe = (id: string) => {
        setOpenDelete(true);
        console.log(id)
        handleMenuClose();
    };



    const menuItemsPublish = (id: string) => {
        return (
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleVisualizeRecipe(id)}>
                    <ListItemIcon>
                        <RestaurantIcon fontSize="small" />
                    </ListItemIcon>Ver receta
                </MenuItem>
                <MenuItem onClick={() => handleUnPublishRecipe(id)}>
                    <ListItemIcon>
                        <PublicOffIcon fontSize="small" />
                    </ListItemIcon>Retirar público
                </MenuItem>
            </Menu>
        )
    }
    const menuItemsNotReviewed = (id: string) => {
        return (
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleVisualizeRecipe(id)}>
                    <ListItemIcon>
                        <RestaurantIcon fontSize="small" />
                    </ListItemIcon>Ver receta
                </MenuItem>
                <MenuItem onClick={() => handleUnReviewRecipe(id)}>
                    <ListItemIcon>
                        <PublicOffIcon fontSize="small" />
                    </ListItemIcon>Retirar Revisión
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleDeleteRecipe(id)} >
                    <ListItemIcon >
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>Eliminar
                </MenuItem>
            </Menu>
        )
    }
    const menuItemsDraftAndReject = (id: string) => {
        return (
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleVisualizeRecipe(id)}>
                    <ListItemIcon>
                        <RestaurantIcon fontSize="small" />
                    </ListItemIcon>Ver receta
                </MenuItem>
                <MenuItem onClick={() => handleEditRecipe(id)}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>Editar Receta
                </MenuItem>
                <MenuItem onClick={() => handleEditPhotoRecipe(id)}>
                    <ListItemIcon>
                        <AddPhotoAlternateIcon fontSize="small" />
                    </ListItemIcon>Actualizar imagen
                </MenuItem>
                <MenuItem onClick={() => handleReviewRecipe(id)}>
                    <ListItemIcon>
                        <PublicIcon fontSize="small" />
                    </ListItemIcon>Publicar
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleDeleteRecipe(id)} >
                    <ListItemIcon >
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>Eliminar
                </MenuItem>

            </Menu>
        )
    }
    return (
        <ListItem
            key={recipe._id}
        >
            <ListItemAvatar>
                <Avatar>
                    {(recipe.image !== undefined && recipe.image !== null) ?
                        <Image src={recipe.image.url} alt={recipe.image.name} layout="fill" />
                        :
                        <RestaurantIcon />
                    }
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                sx={{ paddingRight: "15px" }}
                primary={recipe.name}
                secondary={recipe.description}
            />
            {state === "published" ?
                <>
                    {menuItemsPublish(recipe._id)}
                    <DialogUnPublishRecipe
                        open={openUnPublish}
                        setOpen={setOpenUnPublish}
                        recipeId={recipe._id}
                        recipeTitle={recipe.name}
                        callback={callbackPublished } />
                </>
                : null}
            {state === "not_reviewed" ?
                <>
                    {menuItemsNotReviewed(recipe._id)}
                    <DialogUnReviewRecipe
                        open={openUnReview}
                        setOpen={setOpenUnReview}
                        recipeId={recipe._id}
                        recipeTitle={recipe.name}
                        callback={callbackUnReview } />
                    <DialogDeleteRecipe
                        open={openDelete}
                        setOpen={setOpenDelete}
                        recipeId={recipe._id}
                        recipeTitle={recipe.name}
                        callback={callbackUnReview}
                    />
                </>
                : null}
            {state === "not_requested" ?
                <>
                    {menuItemsDraftAndReject(recipe._id)}
                    <DialogDeleteRecipe
                        open={openDelete}
                        setOpen={setOpenDelete}
                        recipeId={recipe._id}
                        recipeTitle={recipe.name}
                        callback={callbackUnRequest}
                    />
                    <DialogReviewRecipe
                        open={openReview}
                        setOpen={setOpenReview}
                        recipeId={recipe._id}
                        recipeTitle={recipe.name}
                        callback={callbackUnRequest}
                    />
                </>
                : null
            }
            {state === "rejected" ?
                <>
                    {menuItemsDraftAndReject(recipe._id)}
                    <DialogDeleteRecipe
                        open={openDelete}
                        setOpen={setOpenDelete}
                        recipeId={recipe._id}
                        recipeTitle={recipe.name}
                        callback={callbackReject}
                    />
                    <DialogReviewRecipe
                        open={openReview}
                        setOpen={setOpenReview}
                        recipeId={recipe._id}
                        recipeTitle={recipe.name}
                        callback={callbackReject}
                    />
                </>
                : null
            }
            <ListItemSecondaryAction sx={{ position: "absolute", top: "25px" }}>
                <IconButton edge="end" onClick={handleMenuOpen}>
                    <MoreVertIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}