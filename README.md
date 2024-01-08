# Ayllu Food Frontend

## Desarrollo

Para levantar el servicio en local utilizar

```bash
npm run dev
```

Para configurar las variables de entorno clonar el archivo .env.example a .env y llenar las variables necesarias

Para generar el secret se puede utilizar esta web:

https://generate-secret.vercel.app/32

## Producción

Para producción conn Kubernetes se tienen en la carpeta k8s los archivos básicos para su deployment, el caso de secrets se tiene que crear de acuerdo a las variables .env donde la plantilla esta en .env.sample

```bash
cp .env.sample .env
# llenar los datos de .env
kubectl create secret generic cookbookbo-front --from-env-file=.env --dry-run=client -o yaml > k8s/secret.prod.yaml
kubectl create -f k8s/secret.prod.yaml
```

Levantar el deployment

```bash
kubectl create -f deploy.yaml
```

Para levantar el servicio

```bash
kubectl create -f service.yaml
```

Para levantar la exposicion mediante la ip del server se puede usar usando el explose.yml o el ingress.yaml que ya incluye configuracion de dominio.

```bash
kubect create -f ingress.yaml
```
