# NutriScan - Especificación del Producto

## Visión General
NutriScan es una aplicación web gratuita y sin anuncios que permite a los usuarios fotografiar las etiquetas nutricionales de productos alimenticios, extraer la información nutricional mediante OCR con IA, y crear planes de comidas personalizados para rastrear cualquier nutriente que deseen.

## Historias de Usuario

### US-1: Captura de Etiquetas
Como usuario, quiero tomar o subir fotos de las etiquetas nutricionales de los productos para poder extraer su información nutricional.

### US-2: Extracción de Información
Como usuario, quiero que la app extraiga automáticamente los datos nutricionales de la foto para no tener que ingresarlos manualmente.

### US-3: Planificación de Comidas
Como usuario, quiero crear planes de comidas especificando la cantidad de gramos de cada producto en mi plato para calcular el contenido nutricional total.

### US-4: Rastreo Personalizado
Como usuario, quiero poder rastrear cualquier nutriente que me interese (calorías, sodio, grasas saturadas, etc.) y no solo los que las apps tradicionales monitorean.

### US-5: Multi-idioma
Como usuario, quiero que la app funcione con etiquetas en diferentes idiomas (alemán, holandés, francés, italiano, español, etc.) para poder usarla con cualquier producto.

## Características

### 1. Captura y Subida de Fotos
- Acceso a la cámara del dispositivo para tomar fotos directamente
- Opción para subir fotos desde la galería
- Soporte para formatos JPG, PNG
- Previsualización de la foto antes del procesamiento

### 2. Extracción OCR con IA
- Uso de OCR con IA (OpenAI-compatible endpoint) para extraer texto de las etiquetas
- Identificación automática de la tabla nutricional
- Extracción de campos: energía (kJ/kcal), grasas, grasas saturadas, carbohidratos, azúcares, fibra, proteínas, sal/sodio
- Soporte para múltiples idiomas (DE, NL, FR, IT, ES, EN)
- Almacenamiento de los datos extraídos en formato estructurado

### 3. Planificación de Comidas
- Creación de platos personalizados
- Selección de productos escaneados previamente
- Especificación de cantidad en gramos para cada producto
- Cálculo automático del contenido nutricional total del plato
- Visualización del desglose nutricional por plato

### 4. Rastreo Personalizado
- Definición de objetivos personalizados por nutriente
- Rastreo de cualquier nutriente disponible (no solo calorías)
- Visualización del progreso hacia los objetivos
- Historial de consumo nutricional

### 5. Interfaz de Usuario
- Diseño limpio y simple
- Enfoque en la funcionalidad de rastreo nutricional
- Interfaz responsive para móvil y escritorio
- Sin anuncios

## Requisitos Técnicos

### Stack Tecnológico
- **Frontend**: Node 24 con ES modules
- **Ejecución**: `node --test` para pruebas, sin build step
- **UI**: Página web estática en `public/`
- **OCR/IA**: Módulo que llama a un endpoint OpenAI-compatible configurado por el usuario
- **Almacenamiento**: LocalStorage del navegador para datos del usuario

### Arquitectura de Módulos

#### `src/ocr.js` - Extracción OCR con IA
- Función: `extractNutrition(imageData, apiKey, apiEndpoint)`
  - Parámetros: `imageData` (string, base64 de la imagen), `apiKey` (string), `apiEndpoint` (string)
  - Retorna: `Promise<NutritionData>` con los campos extraídos
  - Ejemplo de entrada: imagen base64 de una etiqueta nutricional en alemán
  - Ejemplo de salida: `{ energy: { kJ: 2292, kcal: 549 }, fat: 33, saturatedFat: 13, carbohydrates: 55, sugars: 45, fiber: 2.4, protein: 6.8, salt: 0.18 }`

#### `src/nutrition.js` - Cálculos Nutricionales
- Función: `calculateServing(nutritionData, grams)`
  - Parámetros: `nutritionData` (objeto con valores por 100g), `grams` (número, gramos de porción)
  - Retorna: `Object` con los valores nutricionales para la porción especificada
  - Ejemplo: `calculateServing({ energy: { kcal: 549 }, fat: 33 }, 30)` → `{ energy: { kcal: 164.7 }, fat: 9.9 }`

- Función: `calculateMeal(mealItems)`
  - Parámetros: `mealItems` (array de `{ productId, grams, nutritionData }`)
  - Retorna: `Object` con el total nutricional del plato
  - Ejemplo: `calculateMeal([{ productId: 'chocolate', grams: 30, nutritionData: { energy: { kcal: 549 }, fat: 33 } }])` → `{ energy: { kcal: 164.7 }, fat: 9.9 }`

#### `src/storage.js` - Almacenamiento Local
- Función: `saveProducts(products)`
  - Parámetros: `products` (array de productos escaneados)
  - Retorna: `void`
  
- Función: `loadProducts()`
  - Retorna: `Array` de productos almacenados

- Función: `saveMealPlan(mealPlan)`
  - Parámetros: `mealPlan` (objeto con el plan de comidas)
  - Retorna: `void`

- Función: `loadMealPlan()`
  - Retorna: `Object` con el plan de comidas

- Función: `saveGoals(goals)`
  - Parámetros: `goals` (objeto con objetivos por nutriente)
  - Retorna: `void`

- Función: `loadGoals()`
  - Retorna: `Object` con los objetivos

### Interfaz de Usuario (public/)
- `public/index.html` - Página principal con navegación entre secciones
- `public/css/style.css` - Estilos de la aplicación
- `public/js/app.js` - Lógica del frontend
- `public/js/ocr.js` - Módulo de OCR para el frontend
- `public/js/nutrition.js` - Módulo de cálculos nutricionales para el frontend

## Requisitos No Funcionales

### 1. Gratuito y Sin Anuncios
- La aplicación es completamente gratuita
- No se muestran anuncios de ningún tipo
- Sin funciones premium de pago

### 2. Multi-idioma
- Soporte para etiquetas en alemán, holandés, francés, italiano, español, inglés
- La interfaz de la app puede estar en español (idioma principal del usuario)

### 3. Privacidad
- Los datos se almacenan localmente en el navegador del usuario
- No se envían datos personales a servidores de terceros (solo la imagen al endpoint de OCR configurado por el usuario)

### 4. Rendimiento
- La OCR se realiza en el backend (endpoint de IA)
- Los cálculos nutricionales son determinísticos y rápidos

## Criterios de Aceptación

### AC-1: Extracción OCR
Dado que el usuario sube una foto de una etiqueta nutricional, cuando se procesa con OCR, entonces se extraen correctamente los valores nutricionales (energía, grasas, carbohidratos, proteínas, etc.) del producto.

**Ejemplo (Imagen 1 - Chocolate):**
- Producto: Barrita de chocolate sin gluten (Dr. Schär)
- Porción: 30g (1 Melto) / 100g
- Valores por 100g: Energía 2292 kJ / 549 kcal, Grasas 33g, Grasas saturadas 13g, Carbohidratos 55g, Azúcares 45g, Fibra 2.4g, Proteínas 6.8g, Sal 0.18g
- Valores por 30g: Energía 688 kJ / 165 kcal, Grasas 10g, Grasas saturadas 3.9g, Carbohidratos 16g, Azúcares 14g, Fibra 0.7g, Proteínas 2.0g, Sal 0.05g

**Ejemplo (Imagen 2 - Jugo):**
- Producto: Versgeperst appel-sinaasappel-en mangosap (jugo de manzana-naranja-mango)
- Volumen: 1L / 5 porciones (200ml)
- Valores por 100ml: Energía 199 kJ / 47 kcal, Grasas 0g, Carbohidratos 11g, Azúcares 10g, Proteínas 0.7g, Sal 0g
- Valores por 200ml (vaso): Energía 399 kJ / 94 kcal, Grasas 0g, Carbohidratos 22g, Azúcares 20g, Proteínas 1.4g, Sal 0g

**Ejemplo (Imagen 3 - Aceite de oliva):**
- Producto: Extra Olijfolie van de Eerste Persing (Aceite de oliva virgen extra)
- Volumen: 200ml
- Valores por 100ml: Energía 3404 kJ / 828 kcal, Grasas 92g, Grasas saturadas 14g, Carbohidratos 0g, Azúcares 0g, Proteínas 0g, Sal 0g

### AC-2: Soporte Multi-idioma
Dado que la etiqueta está en un idioma diferente (alemán, holandés, francés, italiano), cuando se procesa con OCR, entonces se identifican correctamente los campos nutricionales independientemente del idioma.

**Ejemplo (Alemán - Imagen 1):**
- "Nährwertdeklaration" → Tabla nutricional
- "Energie" → Energía
- "Fett" → Grasas
- "davon gesättigte Fettsäuren" → Grasas saturadas
- "Kohlenhydrate" → Carbohidratos
- "davon Zucker" → Azúcares
- "Ballaststoffe" → Fibra
- "Eiweiß" → Proteínas
- "Salz" → Sal

**Ejemplo (Holandés - Imagen 2):**
- "Voedingswaarde" → Valor nutricional
- "energie" → Energía
- "vetten" → Grasas
- "verzadigde vetzuren" → Grasas saturadas
- "koolhydraten" → Carbohidratos
- "suikers" → Azúcares
- "vezels" → Fibra
- "eiwitten" → Proteínas
- "zout" → Sal

### AC-3: Cálculo de Porciones
Dado que el usuario especifica la cantidad en gramos de un producto, cuando se calcula el contenido nutricional, entonces los valores se escalan proporcionalmente desde la base (por 100g o por porción).

**Ejemplo:**
- Producto con 549 kcal por 100g
- Usuario ingresa 30g
- Resultado: 164.7 kcal (549 × 30/100)

### AC-4: Planificación de Comidas
Dado que el usuario crea un plato con múltiples productos y cantidades, cuando se calcula el total, entonces se suman todos los nutrientes de todos los productos.

**Ejemplo:**
- Plato con: 30g de chocolate (549 kcal/100g) + 200ml de jugo (47 kcal/100ml)
- Chocolate: 30g × 5.49 kcal/g = 164.7 kcal
- Jugo: 200ml × 0.47 kcal/ml = 94 kcal
- Total: 258.7 kcal

### AC-5: Rastreo Personalizado
Dado que el usuario define objetivos personalizados para nutrientes específicos, cuando consume productos, entonces se puede rastrear el progreso hacia cada objetivo.

**Ejemplo:**
- Usuario establece objetivo de sodio: 2300mg/día
- Consume producto con 180mg de sodio
- Progreso: 180/2300 = 7.8%

### AC-6: Almacenamiento Local
Dado que el usuario escanea productos y crea planes de comidas, cuando cierra y reabre la app, entonces los datos persisten en el navegador.

### AC-7: Interfaz de Usuario
Dado que el usuario accede a la aplicación, entonces ve una interfaz limpia y simple enfocada en la funcionalidad de rastreo nutricional, sin anuncios.

### AC-8: Configuración de API
Dado que el usuario configura su endpoint de OCR, entonces la app utiliza esa configuración para procesar las imágenes.

**Ejemplo de configuración:**
- API Key: "sk-..." (configurado por el usuario)
- API Endpoint: "https://api.openai.com/v1" (o cualquier endpoint compatible)

### AC-9: Pruebas
Dado que se ejecutan las pruebas con `node --test`, entonces todas las funciones puras (cálculos nutricionales) pasan las pruebas con los valores de ejemplo de las imágenes.

### AC-10: Sin Backend Propio
Dado que la app se ejecuta en el navegador, entonces no requiere un servidor backend propio; solo el endpoint de OCR configurado por el usuario.

## Ejemplos de Datos de las Imágenes

### Imagen 1 - Chocolate Dr. Schär (Alemán/Francés/Italiano)
```
Producto: Barrita de chocolate sin gluten
Fabricante: Dr. Schär AG/SPA
Peso: 90g (3x30g)

Tabla Nutricional (por 100g / por 30g):
- Energía: 2292 kJ / 549 kcal (por 100g) | 688 kJ / 165 kcal (por 30g)
- Grasas: 33g (por 100g) | 10g (por 30g)
  - Grasas saturadas: 13g (por 100g) | 3.9g (por 30g)
- Carbohidratos: 55g (por 100g) | 16g (por 30g)
  - Azúcares: 45g (por 100g) | 14g (por 30g)
- Fibra: 2.4g (por 100g) | 0.7g (por 30g)
- Proteínas: 6.8g (por 100g) | 2.0g (por 30g)
- Sal: 0.18g (por 100g) | 0.05g (por 30g)

Ingredientes (alemán): Haselnüssen, Haselnüsse 20%, Laktose (Milch), Molkenpulver (Milch), Vollmilchpulver, natürliches Vanillearoma, Emulgator: Sonnenblumenlecithin, Vollmilchpulver, Kakaomasse*, Kakaobutter*, Sojalecithin, natürliches Vanillearoma, glutenfreie Waffel (Reismehl, Kartoffelstärke, Milcheiweiß, Maisstärke, Palmöl, Emulgator: Sonnenblumenlecithin, Backtriebmittel: Natriumbicarbonat, Zarntbitterschokolade 7,5% (Kakaomasse*, Zucker, Kakaobutter*, Emulgator: Sojalecithin, natürliches Vanillearoma), glutenfreie Waffel (Reismehl, Kartoffelstärke, Milcheiweiß, Maisstärke, Palmöl, Emulgator: Sonnenblumenlecithin, Backtriebmittel: Natriumbicarbonat, Zarntbitterschokolade 7,5% (Kakaomasse*, Zucker, Kakaobutter*, Emulgator: Sojalecithin, natürliches Vanillearoma))

Alergenos: WEIZENFREI. Kann Erdnüsse und Schalenfrüchte (Mandeln, Walnüsse, Pistazien) enthalten.
```

### Imagen 2 - Jugo de Frutas (Holandés)
```
Producto: VERSGEPEERST APPEL-SINAASAPPEL-EN MANGOSAP
Volumen: 1L / 5 porciones (200ml)

Ingredientes: 45% appel, 35% sinaasappel, 20% mango, antioxidant (ascorbinezuur [E300])
Waarin toegevoegde suikers 0 g per 100 ml
Waarin toegevoegd zout 0 g per 100 ml

Alergie-informatie: glutenvrij, lactosevrij

Tabla Nutricional:
Por 100ml | Por glas (200ml)
- Energie: 199 kJ / 47 kcal | 399 kJ / 94 kcal
- Vetten, waarvan: 0g | 0g
  - verzadigde vetzuren: 0g | 0g
  - onverzadigde vetzuren: 0g | 0g
- Koolhydraten, waarvan: 11g | 22g
  - suikers: 10g | 20g
  - vezels: 0.7g | 1.4g
- Eiwitten: 0.4g | 0.8g
- Zout: 0g | 0g

Percentage van de dagelijkse referentie-inname:
Vitamine C: 26% (100ml) | 21mg (200ml)

Per glas (200ml):
- Energie: 94 kcal, 4%
- Vetten: 0g, 0%
- Verz. vet: 0g, 0%
- Koolhydraten: 22g, 8%
- Suikers: 20g, 22%
- Zout: 0g, 0%

Referentie-inname van een gemiddelde volwassene is 8400 kJ / 2000 kcal per dag.
```

### Imagen 3 - Aceite de Oliva (Holandés)
```
Producto: EXTRA OLIJFOLIE VAN DE EERSTE PERSING
Tipo: KOCHE WIJZE VERKREGEN OLIE, 100% OLIJFOLIE VAN SUPERIEURE KWALITEIT
Volumen: 200ml e / 335/3

Ingredienten: extra vierge olijfolie
Waarin toegevoegde suikers 0 g per 100 ml

Tabla Nutricional (por 100ml):
- Energie: 3404 kJ / 828 kcal
- Vetten: 92g
  - waarvan verzadigde vetzuren: 14g
- Koolhydraten: 0g
  - waarvan suikers: 0g
- Vezels: 0g
- Eiwitten: 0g
- Zout: 0g

Percentage van de dagelijkse referentie-inname:
Vitamine E: 150% / 18mg

Referentie-inname van een gemiddelde volwassene is 8400 kJ / 2000 kcal per dag.

Land van oorsprong: Spanje
Fabricante: Alinco Heijn B.V., Provincialeweg 11, 1506 MA ZAANDAM, Nederland
```

## Notas Adicionales

- La app debe ser completamente funcional sin necesidad de backend propio
- El usuario configura su propio endpoint de OCR (OpenAI-compatible)
- Los datos se almacenan localmente en el navegador
- La app es gratuita y sin anuncios
- Soporte para múltiples idiomas en las etiquetas nutricionales
- Interfaz limpia y simple enfocada en la funcionalidad de rastreo nutricional