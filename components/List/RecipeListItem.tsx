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
import { useRecoilState } from "recoil";
import { searchRecipeUserPublishedState, searchRecipeUserNotRequestedState, searchRecipeUserNotReviewedState, searchRecipeUserRejectedState } from "atoms";
interface ListItemProps {
    primaryText: string;
    secondaryText: string;
}


export default function RecipeListItem(props: { recipe: RecipeProps, state: string }) {

    const [searchPublished, setSearchRecipePublishedState] = useRecoilState(searchRecipeUserPublishedState);
    const [searchNotRequest, setSearchRecipeNotRequestedState] = useRecoilState(searchRecipeUserNotRequestedState);
    const [searchNotReviewed, setSearchRecipeNotReviewedState] = useRecoilState(searchRecipeUserNotReviewedState);
    const [searchRejected, setSearchRecipeRejectedState] = useRecoilState(searchRecipeUserRejectedState);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { recipe, state } = props;
    const [openDelete, setOpenDelete] = useState(false);
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
        console.log(id)
        handleMenuClose();
    };
    const handlePublishRecipe = (id: string) => {
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
                <MenuItem onClick={() => handleUnPublishRecipe(id)}>
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
                <MenuItem onClick={() => handleEditPhotoRecipe(id)}>
                    <ListItemIcon>
                        <AddPhotoAlternateIcon fontSize="small" />
                    </ListItemIcon>Actualizar imagen
                </MenuItem>
                <MenuItem onClick={() => handleEditRecipe(id)}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>Editar Receta
                </MenuItem>
                <MenuItem onClick={() => handlePublishRecipe(id)}>
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
                </>
                : null}
            {state === "not_reviewed" ?
                <>
                    {menuItemsNotReviewed(recipe._id)}
                    <DialogDeleteRecipe
                        open={openDelete}
                        setOpen={setOpenDelete}
                        recipeId={recipe._id}
                        recipeTitle={recipe.name}
                        callback={() => {setSearchRecipeNotReviewedState({search: searchNotReviewed.search})}}
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
                        callback={() => {setSearchRecipeNotRequestedState({search: searchNotRequest.search})}}
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
                        callback={() => {setSearchRecipeRejectedState({search: searchRejected.search})}}
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