import { LoadingButton } from '@mui/lab';
import {
    AppBar, Button, Card, CardContent, CardHeader, Checkbox, Container, Dialog, DialogContent,
    DialogTitle, Divider, Fab, FormControl, FormControlLabel,
    FormGroup, FormHelperText, Grid, IconButton, InputLabel, ListSubheader,
    MenuItem, Select, Slide, TextField, Toolbar, Tooltip, Typography
} from "@mui/material"
import { useSnackbar } from 'notistack';
import { forwardRef, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { IngredientProps, PreparationProps, RecipeProps } from 'const';
import { accessTokenState } from 'atoms';
import { useRecoilState } from 'recoil';
import { postNewRecipeUser } from 'lib/http';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function DialogRecipe(props: { idToEdit?: string, callback?: () => void }) {
    const { idToEdit: undefined, callback = () => { } } = props;
    const fabStyle = {
        margin: 0,
        top: 'auto',
        right: 16,
        bottom: 16,
        left: 'auto',
        position: 'fixed',
    }
    const defaultRecipe: RecipeProps = {
        name: "",
        description: "",
        lang: "es",
        owner: "",
        publisher: "",
        tags: [],
        year: new Date().getFullYear(),
        location: "",
        category: ["unknown"],
        portion: 0,
        preparation_time_minutes: 0,
        preparation: []
    };

    const defaultPreparation: PreparationProps = {
        name: "principal", ingredients: [
            {
                name: "",
                optional: false,
                quantity_si: 0,
                unit_si: "unknown",
                quantity_equivalence: 0,
                unit_equivalence: ""
            }
        ], steps: [{ detail: "" }]
    }
    const defaultIngredient: IngredientProps = {
        name: "",
        optional: false,
        quantity_si: 0,
        unit_si: "unknown",
        quantity_equivalence: 0,
        unit_equivalence: "taza"
    }

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recipe, setRecipe] = useState<RecipeProps>(defaultRecipe);
    const [fields, setFields] = useState<PreparationProps[]>([]);
    const [token] = useRecoilState(accessTokenState);
    const addPreparation = () => {
        setFields([...fields, defaultPreparation]);
    };
    const addIngredient = (index: number) => {
        const newFields = [...fields];
        newFields[index].ingredients.push(defaultIngredient);
        setFields(newFields);
    };

    const addStep = (index: number) => {
        const newFields = [...fields];
        newFields[index].steps.push({ detail: "" });
        setFields(newFields);
    };

    const handleChangeRecipe = (name: string, value: string) => {
        setRecipe({ ...recipe, [name]: value });
    }
    const handleChangeRecipeSplit = (name: string, value: string) => {
        const splitValue = value.split(",");
        setRecipe({ ...recipe, [name]: splitValue });
    }

    const handleChangeNamePreparation = (index: number, value: string) => {
        const newFields = [...fields];
        newFields[index].name = value;
        setFields(newFields);
    };
    const handleChangeNameIngredient = (indexPreparation: number, indexIngredient: number, value: string) => {
        const newFields = [...fields];
        newFields[indexPreparation].ingredients[indexIngredient].name = value;
        setFields(newFields);
    };
    const handleChangeQuantityIngredient = (indexPreparation: number, indexIngredient: number, value: string) => {
        const newFields = [...fields];
        const newValue = parseFloat(value);
        newFields[indexPreparation].ingredients[indexIngredient].quantity_si = newValue;
        setFields(newFields);
    };
    const handleChangeUnitySiIngredient = (indexPreparation: number, indexIngredient: number, value: string) => {
        const newFields = [...fields];
        newFields[indexPreparation].ingredients[indexIngredient].unit_si = value;
        setFields(newFields);
    };
    const handleChangeOptionalIngredient = (indexPreparation: number, indexIngredient: number, value: boolean) => {
        const newFields = [...fields];
        newFields[indexPreparation].ingredients[indexIngredient].optional = value;
        setFields(newFields);
    };
    const handleChangeQuantityEquivalenceIngredient = (indexPreparation: number, indexIngredient: number, value: string) => {
        const newFields = [...fields];
        const newValue = parseFloat(value);
        newFields[indexPreparation].ingredients[indexIngredient].quantity_equivalence = newValue;
        setFields(newFields);
    };
    const handleChangeUnitEquivalenceIngredient = (indexPreparation: number, indexIngredient: number, value: string) => {
        const newFields = [...fields];
        newFields[indexPreparation].ingredients[indexIngredient].unit_equivalence = value;
        setFields(newFields);
    };
    const handleChangeStep = (indexPreparation: number, indexStep: number, value: string) => {
        const newFields = [...fields];
        newFields[indexPreparation].steps[indexStep].detail = value;
        setFields(newFields);
    };
    const deleteStep = (indexPreparation: number, indexStep: number) => {
        const newFields = [...fields];
        newFields[indexPreparation].steps.splice(indexStep, 1);
        setFields(newFields);
    };
    const deleteIngredient = (indexPreparation: number, indexIngredient: number) => {
        const newFields = [...fields];
        newFields[indexPreparation].ingredients.splice(indexIngredient, 1);
        setFields(newFields);
    };
    const deletePreparation = (indexPreparation: number) => {
        const newFields = [...fields];
        newFields.splice(indexPreparation, 1);
        setFields(newFields);
    };

    const { enqueueSnackbar } = useSnackbar();
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleAction = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        console.log(e);
        let recipeData = recipe;
        recipeData.preparation = fields;
        console.log(recipeData);
        setRecipe(defaultRecipe);
        setFields([]);

        const response = await postNewRecipeUser(token, recipeData);
        if (response.error) {
            enqueueSnackbar(response.message, {
                variant: "error",
            });
            setLoading(false);
            // handleClose();
            return;
        }

        enqueueSnackbar(`Se adicionó la receta`, {
            variant: "success",
        });
        setRecipe(defaultRecipe);
        setFields([]);
        setLoading(false);
        handleClose();
        callback();
    };
    return (
        <div>
            <Fab sx={fabStyle} aria-label={"new recipe"} color={"secondary"} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}

            >
                <form onSubmit={handleAction}>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Nueva Receta
                            </Typography>
                            <LoadingButton type='submit' color="inherit" loading={loading} >
                                Guardar
                            </LoadingButton>
                        </Toolbar>
                    </AppBar>
                    <DialogTitle id="alert-dialog-title">
                        <RestaurantIcon color="secondary" sx={{ mb: -0.5, mr: 1 }} />
                        {"Crea una nueva receta, para compartirla con los demás"}
                    </DialogTitle>
                    <DialogContent>
                        <Container>
                            <Grid container spacing={2} >
                                <Grid item lg={12} sm={12} xs={12}>
                                    <TextField required fullWidth id="name" name='name' label="Nombre"
                                        value={recipe.name}
                                        variant="filled" onChange={(event) => handleChangeRecipe(event.target.name, event.target.value)} />
                                </Grid>
                                <Grid item lg={12} sm={12} xs={12}>
                                    <TextField fullWidth id="description" name='description' label="Descripción" variant="filled" multiline
                                        value={recipe.description}
                                        onChange={(event) => handleChangeRecipe(event.target.name, event.target.value)} />
                                </Grid>
                                <Grid item lg={6} md={12} xs={12}>
                                    <TextField fullWidth id="owner" name='owner' label="Dueño de la receta" variant="filled" multiline
                                        value={recipe.owner}
                                        onChange={(event) => handleChangeRecipe(event.target.name, event.target.value)} />
                                </Grid>
                                <Grid item lg={6} md={12} xs={12}>
                                    <FormControl fullWidth variant="filled" >
                                        <InputLabel id={"lang-label"}>Idioma</InputLabel>
                                        <Select
                                            required
                                            id='lang'
                                            name='lang'
                                            labelId={"lang-label"}
                                            value={recipe.lang}
                                            label="Idioma"
                                            onChange={(event) => handleChangeRecipe(event.target.name, event.target.value)}
                                        >
                                            <MenuItem value={"es"}>Español</MenuItem>
                                            <ListSubheader>Próximamente</ListSubheader>
                                            <MenuItem  value={"en"}>Ingles</MenuItem>
                                            <MenuItem disabled value={"ay"}>Aymara</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={6} md={12} xs={12}>
                                    <TextField fullWidth id="year" name='year' label="Año de la receta" variant="filled" type="number"
                                        value={recipe.year}
                                        onChange={(event) => handleChangeRecipe(event.target.name, event.target.value)} />
                                </Grid>
                                <Grid item lg={6} md={12} xs={12}>
                                    <TextField fullWidth id="location" name='location' label="Locación la receta" variant="filled"
                                        value={recipe.location}
                                        onChange={(event) => handleChangeRecipe(event.target.name, event.target.value)} />
                                </Grid>
                                <Grid item lg={6} md={12} xs={12}>
                                    <TextField required fullWidth id="portion" name='portion' label="Porciones" variant="filled" type="number"
                                        value={recipe.portion}
                                        onChange={(event) => handleChangeRecipe(event.target.name, event.target.value)} />
                                </Grid>
                                <Grid item lg={6} md={12} xs={12}>
                                    <TextField required fullWidth id="preparation_time_minutes" name='preparation_time_minutes' label="Tiempo de preparación"
                                        value={recipe.preparation_time_minutes}
                                        variant="filled" type="number" helperText="Preparación en minutos"
                                        onChange={(event) => handleChangeRecipe(event.target.name, event.target.value)} />
                                </Grid>
                                <Grid item lg={6} md={12} xs={12}>
                                    <TextField fullWidth id="tags" name='tags' label="Listado de Tags" variant="filled"
                                        helperText="Ingrese tags separados por coma"
                                        value={recipe.tags.join(",")}
                                        onChange={(event) => handleChangeRecipeSplit(event.target.name, event.target.value)} />
                                </Grid>
                                <Grid item lg={6} md={12} xs={12}>
                                    <TextField fullWidth id="category" name='category' label="Categorías" variant="filled" defaultValue={"unknown"}
                                        helperText="Ingrese categorías separadas por coma"
                                        value={recipe.category.join(",")}
                                        onChange={(event) => handleChangeRecipeSplit(event.target.name, event.target.value)} />
                                </Grid>
                                {fields.map((field, index) => (
                                    <>
                                        <Grid item lg={12} md={12} xs={12}>
                                            <Card sx={{ borderColor: "secondary.main" }}>
                                                <CardHeader action={
                                                    <IconButton aria-label="settings" onClick={() => deletePreparation(index)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                }
                                                    title={field.name}>
                                                </CardHeader>
                                                <CardContent>
                                                    <Grid container spacing={1}>
                                                        <Grid item lg={12} md={12} xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                variant="filled"
                                                                key={index}
                                                                label={`Nombre preparación ${index + 1}`}
                                                                value={field.name}
                                                                onChange={(event) => handleChangeNamePreparation(index, event.target.value)}
                                                                helperText={"Nombre de la preparación como masa, relleno, salsa, si es sólo una se recomienda dejar en principal"}
                                                            />
                                                        </Grid>
                                                        <Grid item lg={12} md={12} xs={12}>
                                                            <Typography variant='h6' color="secondary">Ingredientes</Typography>
                                                        </Grid>
                                                        {field.ingredients.map((ingredient, indexIngredient) => (
                                                            <Grid item lg={12} md={12} xs={12}>
                                                                <Card variant="outlined" sx={{ borderColor: "secondary.main" }}>
                                                                    <CardHeader action={
                                                                        <IconButton aria-label="settings" onClick={() => deleteIngredient(index, indexIngredient)}>
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    }
                                                                        title={ingredient.name}>
                                                                    </CardHeader>
                                                                    <CardContent>
                                                                        <Grid container spacing={1}>
                                                                            <Grid item lg={4} md={12} xs={12}>
                                                                                <TextField
                                                                                    required
                                                                                    fullWidth
                                                                                    variant="filled"
                                                                                    key={`ing-${index}-${indexIngredient}`}
                                                                                    label={`Nombre ingrediente ${indexIngredient + 1}`}
                                                                                    value={ingredient.name}
                                                                                    onChange={(event) => handleChangeNameIngredient(index, indexIngredient, event.target.value)}
                                                                                />
                                                                            </Grid>
                                                                            <Grid item lg={4} md={12} xs={12}>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    variant="filled"
                                                                                    key={`ing-${index}-${indexIngredient}`}
                                                                                    label={`Cantidad de ${ingredient.name}`}
                                                                                    value={ingredient.quantity_si}
                                                                                    onChange={(event) => handleChangeQuantityIngredient(index, indexIngredient, event.target.value)}
                                                                                    helperText="Cantidad en sistema internacional"
                                                                                    type='number'
                                                                                />
                                                                            </Grid>
                                                                            <Grid item lg={4} md={12} xs={12}>
                                                                                <FormControl fullWidth variant="filled" key={`ing-${index}-${indexIngredient}`}>
                                                                                    <InputLabel id={`unitSi-${index}-${indexIngredient}-label`}>Medida</InputLabel>
                                                                                    <Select
                                                                                        labelId={`unitSi-${index}-${indexIngredient}-label`}
                                                                                        value={ingredient.unit_si}
                                                                                        label="Medida"
                                                                                        onChange={(event) => handleChangeUnitySiIngredient(index, indexIngredient, event.target.value)}
                                                                                    >
                                                                                        <MenuItem value={"unknown"}>Unidad</MenuItem>
                                                                                        <ListSubheader>Masa</ListSubheader>
                                                                                        <MenuItem value={"kg"}>Kilogramos</MenuItem>
                                                                                        <MenuItem value={"g"}>Gramos</MenuItem>
                                                                                        <MenuItem value={"mg"}>Miligramos</MenuItem>
                                                                                        <ListSubheader>Volumen</ListSubheader>
                                                                                        <MenuItem value={"l"}>Litros</MenuItem>
                                                                                        <MenuItem value={"ml"}>Mililitros</MenuItem>
                                                                                        <MenuItem value={"dl"}>Decilitros</MenuItem>
                                                                                        <MenuItem value={"cl"}>Centilitros</MenuItem>
                                                                                    </Select>
                                                                                    <FormHelperText>
                                                                                        Medida en sistema internacional
                                                                                    </FormHelperText>
                                                                                </FormControl>
                                                                            </Grid>
                                                                            <Grid item lg={4} md={12} xs={12}>
                                                                                <FormGroup key={`ing-${index}-${indexIngredient}`}>
                                                                                    <FormControlLabel
                                                                                        control={<Checkbox value={ingredient.optional} />}
                                                                                        label="Ingrediente opcional"
                                                                                        onChange={(event) => handleChangeOptionalIngredient(index, indexIngredient, event.target.checked)} />
                                                                                </FormGroup>
                                                                            </Grid>
                                                                            <Grid item lg={4} md={12} xs={12}>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    variant="filled"
                                                                                    key={`ing-${index}-${indexIngredient}`}
                                                                                    label={`Cantidad de ${ingredient.name}`}
                                                                                    value={ingredient.quantity_equivalence}
                                                                                    onChange={(event) => handleChangeQuantityEquivalenceIngredient(index, indexIngredient, event.target.value)}
                                                                                    helperText="Cantidad de equivalencia a medidas comunes como taza, cucharada, etc."
                                                                                    type='number'
                                                                                />
                                                                            </Grid>
                                                                            <Grid item lg={4} md={12} xs={12}>
                                                                                <TextField
                                                                                    fullWidth
                                                                                    variant="filled"
                                                                                    key={`ing-${index}-${indexIngredient}`}
                                                                                    label={`Unidad equivalente para ${ingredient.name}`}
                                                                                    value={ingredient.unit_equivalence}
                                                                                    onChange={(event) => handleChangeUnitEquivalenceIngredient(index, indexIngredient, event.target.value)}
                                                                                    helperText="Unidad equivalente como: taza, cucharada, etc."
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </CardContent>
                                                                </Card>
                                                            </Grid>
                                                        ))
                                                        }
                                                        <Grid item lg={12} md={12} xs={12}>
                                                            <Button color='secondary' variant="outlined" startIcon={<AddIcon />} onClick={() => addIngredient(index)} fullWidth>
                                                                Adicionar Ingrediente
                                                            </Button>
                                                        </Grid>
                                                        <Grid item lg={12} md={12} xs={12}>
                                                            <Typography variant='h6' color="secondary">Pasos</Typography>
                                                        </Grid>
                                                        {field.steps.map((step, indexStep) => (
                                                            <Grid item lg={12} md={12} xs={12}>
                                                                <Card variant='outlined' sx={{ borderColor: "secondary.main" }}>
                                                                    <CardHeader action={
                                                                        <IconButton aria-label="settings" onClick={() => deleteStep(index, indexStep)}>
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    }
                                                                        title={`${indexStep + 1}`}>
                                                                    </CardHeader>
                                                                    <CardContent>
                                                                        <Grid container spacing={1}>
                                                                            <Grid item lg={12} md={12} xs={12}>
                                                                                <TextField
                                                                                    required
                                                                                    fullWidth
                                                                                    variant="filled"
                                                                                    key={`stp-${index}-${indexStep}`}
                                                                                    label={`Paso ${indexStep + 1}`}
                                                                                    value={step.detail}
                                                                                    onChange={(event) => handleChangeStep(index, indexStep, event.target.value)}
                                                                                    multiline
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </CardContent>
                                                                </Card>
                                                            </Grid>
                                                        ))}
                                                        <Grid item lg={12} md={12} xs={12}>
                                                            <Button color='secondary' variant="outlined" startIcon={<AddIcon />} onClick={() => addStep(index)} fullWidth>
                                                                Adicionar Paso
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                            {/* <Tooltip title="Eliminar preparación">
                                                <IconButton color='error' onClick={() => deletePreparation(index)}>
                                                    <DeleteIcon />
                                                </IconButton >
                                            </Tooltip>
                                            <Typography variant='button'>
                                                {index + 1}. {field.name}
                                            </Typography> */}
                                        </Grid>

                                    </>
                                ))}
                                <Grid item lg={12} md={12} xs={12}>
                                    <Button color='secondary' variant="outlined" startIcon={<AddIcon />} onClick={addPreparation} fullWidth>
                                        Preparación
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}