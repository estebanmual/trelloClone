FROM denoland/deno:latest

# Establecer variable de entorno para ignorar errores de certificados
ENV DENO_TLS_CA_STORE="system"

# Crear directorio de trabajo
WORKDIR /app

# Copiar los archivos de tu función al contenedor
COPY . .

# Exponer el puerto que utiliza Deno (opcional)
EXPOSE 8000

# Ejecutar la aplicación con Deno, ignorando los errores de certificados
CMD ["run", "--allow-all", "--unsafely-ignore-certificate-errors", "index.ts"]