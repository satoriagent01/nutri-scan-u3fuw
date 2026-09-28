# NutriScan

Una aplicación web gratuita y sin anuncios para rastrear la información nutricional de los productos que consumes. Escanea etiquetas con tu cámara, extrae datos nutricionales con IA, y planifica tus comidas con metas personalizadas.

## Características

- **📷 Escaneo de etiquetas**: Toma fotos o sube imágenes de tablas nutricionales
- **🤖 OCR con IA**: Extrae automáticamente calorías, grasas, carbohidratos, proteínas, azúcares, fibra y sal
- **🍽️ Planificador de comidas**: Agrega productos con cantidades personalizadas en gramos
- **🎯 Metas personalizadas**: Rastrea cualquier nutriente que te interese (no solo calorías)
- **🌐 Multi-idioma**: Soporte para español, inglés, alemán, holandés, francés e italiano
- **💾 Almacenamiento local**: Todo se guarda en tu navegador, sin necesidad de cuenta

## Cómo usar

### 1. Configurar el endpoint de IA

Ve a la sección **⚙️ Config** y configura:

- **URL del Endpoint**: La URL de tu servicio OpenAI-compatible (ej: `https://api.openai.com/v1/chat/completions`)
- **API Key**: Tu clave de API del servicio de IA

### 2. Escanear un producto

1. Ve a la pestaña **📷 Escanear**
2. Toca el área de subida para tomar una foto o seleccionar una imagen
3. Presiona **🔍 Extraer Información**
4. Revisa los datos extraídos y presiona **💾 Guardar Producto**

### 3. Planificar comidas

1. Ve a la pestaña **🍽️ Comidas**
2. Selecciona un producto de tu lista y especifica los gramos
3. Presiona **➕ Agregar a la comida**
4. Repite para agregar más productos
5. El resumen nutricional se actualiza automáticamente

### 4. Configurar metas

1. Ve a la pestaña **🎯 Metas**
2. Edita los valores de tus metas diarias
3. Presiona **💾 Guardar Metas**
4. Observa las barras de progreso para ver cuánto has consumido

## Requisitos

- Node.js 24+
- Un navegador web moderno

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Servir la aplicación (con un servidor estático)
npx serve public
```

## Tests

```bash
npm test
```

## Tecnologías

- **Frontend**: HTML, CSS, JavaScript (ES Modules)
- **OCR**: OpenAI-compatible API (GPT-4o)
- **Almacenamiento**: localStorage del navegador
- **Tests**: Node.js test runner

## Lo que no está hecho aún

- No hay backend: todos los datos se almacenan localmente en el navegador
- No hay sincronización entre dispositivos
- No hay base de datos de productos predefinidos
- No hay reconocimiento automático de marcas o productos
- No hay exportación de datos

## Licencia

Gratuito y sin anuncios. Hazlo tuyo.