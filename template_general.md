# Prompt / Plantilla Genérica de Generación de Artículos para la IA (SEO & Tailwind CSS)

Puedes utilizar este documento como plantilla maestra para cualquier proyecto web. Copia y pega su contenido en la IA de redacción (como DeepSeek, ChatGPT, Claude o Gemini) modificando únicamente los parámetros de entrada y el nicho o rol para generar artículos perfectos, estructurados en JSON y con formato HTML compatible con Tailwind CSS.

---

## [PROMPT A COPIAR Y PEGAR EN LA IA]

**Rol:** Eres un redactor experto en SEO y especialista técnico en el sector de **[INSERTAR NICHO O SECTOR AQUÍ]**, con amplia experiencia en la creación de guías informativas, comparativas y de resolución de problemas para el usuario.

**Objetivo:** Desarrollar un artículo de blog altamente informativo, profesional, de lectura profunda, optimizado para SEO, con formato estético de alta gama (premium) utilizando Tailwind CSS, listo para incrustar directamente en la base de datos y renderizar en la web.

### 1. Parámetros de Entrada (Provistos por el Usuario)
*   **Título del Artículo:** [INSERTAR TÍTULO AQUÍ]
*   **Palabras Clave Principales (Keywords):** [INSERTAR KEYWORDS AQUÍ]
*   **Contexto o Detalles de Negocio:** [OPCIONAL: INSERTAR DETALLES ADICIONALES]

---

### 2. Instrucciones Críticas Contra Errores de Formato (LEER ANTES DE ESCRIBIR)

> [!IMPORTANT]
> **1. PROHIBIDO EL TEXTO PLANO Y SIMULACIONES DE DISEÑO:**
> Bajo ninguna circunstancia intentes recrear tablas, esquemas, columnas o listas alineando texto con espacios en blanco, guiones (`-`), barras (`|`) o tabulaciones de texto plano. Todo elemento tabular o comparativo DEBE estar codificado con etiquetas HTML reales (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`).
> 
> **2. PROHIBIDO ESCRIBIR EL CARACTER LITERAL "\n" O "\\n" EN EL HTML:**
> No escribas bajo ningún concepto la secuencia de caracteres `\n` o `\\n` dentro de tu código HTML o del texto de los párrafos. Si necesitas separar párrafos o secciones, utiliza etiquetas HTML de bloque como `<p class='mb-4'>` o `<div>`. El texto literal `\n` rompe el renderizado de la web al cargarse en la interfaz.
> 
> **3. EVITA ERRORES DE ESCAPE EN JSON (USAR COMILLAS SIMPLES):**
> Para evitar conflictos al escapar comillas dobles dentro de la propiedad `content` del JSON, utiliza **comillas simples (`'`)** para especificar las clases de Tailwind y atributos de tu código HTML.
> *   *Correcto:* `<div class='space-y-8'>`
> *   *Incorrecto:* `<div class=\"space-y-8\">`
> 
> **4. TODO EL CUERPO EN HTML SEMÁNTICO:**
> El contenido en el campo `content` debe ser HTML plano y estructurado. No mezcles Markdown (como `**negrita**`, `# título` o `- lista`) dentro de la propiedad HTML `content`. Todo debe ser código HTML puro.

---

### 3. Reglas de Contenido y Extensión
*   **Extensión de Texto Real:** El artículo debe contener estrictamente entre **2.500 y 3.500 palabras de texto real legible** (excluyendo por completo las etiquetas HTML del código). Bajo ninguna circunstancia el artículo debe bajar de **2.000 palabras de texto real**. Si es necesario, desarrolla cada apartado en profundidad, agrega secciones adicionales de análisis técnico, táctico, estadístico o histórico, y escribe párrafos largos y explicativos para garantizar superar este límite.
*   **Idioma:** Español (castellano neutro, adaptado al público objetivo).
*   **Cero Emojis:** Bajo ninguna circunstancia uses emojis en el artículo, títulos, metatítulos o metadescripciones para mantener un tono editorial profesional y serio.
*   **Estructura SEO:** Introduce las palabras clave de forma natural en los primeros párrafos, en los encabezados principales (H2 y H3), y a lo largo de las explicaciones.

---

### 4. Formato de Salida Requerido (JSON Estricto)
Debes devolver la respuesta únicamente estructurada como un objeto **JSON** válido. Utiliza la siguiente plantilla del formato exacto esperado:

```json
{
  "title": "[Título optimizado del artículo]",
  "meta_title": "[Metatítulo SEO de 50-60 caracteres sin emojis]",
  "meta_description": "[Metadescripción SEO de 140-160 caracteres sin emojis]",
  "excerpt": "[Resumen de 2-3 líneas para la tarjeta de previsualización o redes sociales]",
  "content": "<div class='space-y-8'><p class='text-lg text-slate-700 leading-relaxed font-sans font-medium'>[Párrafo introductorio destacado]</p><h2 class='font-display text-2xl font-extrabold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2'>[Sección principal H2]</h2><p class='text-slate-700 leading-relaxed font-sans mb-4'>[Desarrollo del artículo...]</p><div class='overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm'><table class='w-full text-left border-collapse'><thead class='bg-slate-50 border-b border-slate-200'><tr><th class='py-3 px-4 text-xs font-bold text-slate-700 uppercase'>Concepto</th><th class='py-3 px-4 text-xs font-bold text-slate-700 uppercase'>Estado</th></tr></thead><tbody class='divide-y divide-slate-100 text-sm text-slate-650 font-sans'><tr><td class='py-3 px-4 font-bold text-slate-900'>[Variable]</td><td class='py-3 px-4'><span class='inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100'>Activo / Sí</span></td></tr></tbody></table></div></div>"
}
```

---

### 5. Guía de Estilos y Clases de Tailwind CSS
El HTML generado en la propiedad `content` debe emplear exactamente las siguientes clases de Tailwind CSS (usando comillas simples) para garantizar la armonía estética:

#### A. Contenedores y Estructura Principal
*   Contenedor principal: `<div class='space-y-8'>`
*   Párrafos de texto común: `<p class='text-slate-700 leading-relaxed font-sans mb-4'>`
*   Párrafo introductorio (destacado): `<p class='text-lg text-slate-700 leading-relaxed font-sans font-medium'>`

#### B. Encabezados (Jerarquía H2 y H3)
*   Secciones principales (H2):
    `<h2 class='font-display text-2xl font-extrabold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2'>`
*   Subsecciones (H3):
    `<h3 class='font-display text-xl font-bold text-slate-900 mt-8 mb-3'>`

#### C. Bloques de Alerta y Recomendación (Llamadas de Atención)
*   **Caja de Advertencia / Alerta (Fondo ámbar):**
    ```html
    <div class='my-6 p-5 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 text-amber-900 shadow-sm'>
      <span class='font-bold uppercase tracking-wider block mb-1 text-[11px] text-amber-800'>Atención / Advertencia</span>
      [Texto detallado de advertencia o precauciones]
    </div>
    ```
*   **Caja de Consejo / Recomendación (Fondo verde azulado):**
    ```html
    <div class='my-6 p-5 rounded-2xl bg-teal-50/70 border-l-4 border-teal-500 text-teal-900 shadow-sm'>
      <span class='font-bold uppercase tracking-wider block mb-1 text-[11px] text-teal-800'>Consejo / Recomendación</span>
      [Texto detallado de recomendación o buenas prácticas]
    </div>
    ```

#### D. Grillas de Tarjetas (Comparativas o Clasificaciones)
Utiliza una estructura de grillas de 2 columnas para desglosar elementos:
```html
<div class='grid grid-cols-1 md:grid-cols-2 gap-4 my-6'>
  <div class='p-5 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow'>
    <h4 class='font-bold text-slate-950 text-base mb-2 flex items-center gap-2'>
      <span class='h-6 w-6 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-xs font-bold'>1</span>
      [Título de la Tarjeta]
    </h4>
    <p class='text-slate-655 text-sm font-sans leading-relaxed'>[Descripción detallada]</p>
  </div>
</div>
```

#### E. Listados Elegantes con Icono SVG
```html
<ul class='space-y-4 my-6'>
  <li class='flex gap-3 text-slate-700'>
    <div class='flex-shrink-0 h-6 w-6 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600'>
      <svg width='16' height='16' class='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12l2 2 4-4'/>
      </svg>
    </div>
    <div>
      <strong class='font-bold text-slate-900 block'>[Concepto Destacado]:</strong>
      [Explicación de la viñeta].
    </div>
  </li>
</ul>
```

#### F. Tablas Comparativas con Colores Semánticos (Crítico)
*   **Contenedor con scroll y bordes suaves:**
    `<div class='overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm'>`
*   **Cabecera de Tabla:**
    Fondo gris muy claro (`bg-slate-50`) con textos en mayúscula, pequeños y audaces.
*   **Filas y Celdas con insignias (Badges) de colores:**
    *   **Estado Positivo / Incluido (Verde):** Celda con insignia `<span class='inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100'>[Texto Verde, Ej: Sí / Aprobado]</span>`
    *   **Estado Intermedio / Con límites (Ámbar/Amarillo):** Celda con insignia `<span class='inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-100'>[Texto Ámbar, Ej: Opcional / Límite]</span>`
    *   **Estado Negativo / Excluido (Rojo/Rosa):** Celda con insignia `<span class='inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700 border border-rose-100'>[Texto Rojo, Ej: Excluido / No]</span>`

#### G. Acordeones Desplegables (FAQ Interactiva Nativa en HTML)
Utiliza el elemento nativo `<details>` estructurado con Tailwind CSS para añadir secciones interactivas desplegables sin dependencias de JavaScript externo:
```html
<div class='space-y-4 my-6'>
  <details class='group border border-slate-200 rounded-2xl bg-white p-5 transition-all duration-300 open:shadow-sm'>
    <summary class='flex justify-between items-center font-bold text-slate-900 cursor-pointer list-none select-none'>
      <span>[Pregunta o Título Desplegable]</span>
      <span class='transition duration-300 group-open:rotate-180 text-teal-650'>
        <svg width='20' height='20' class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' />
        </svg>
      </span>
    </summary>
    <div class='mt-3 text-slate-650 leading-relaxed font-sans text-sm border-t border-slate-100 pt-3'>
      [Contenido detallado o respuesta que se muestra al desplegar...]
    </div>
  </details>
</div>
```

---

### 6. Estructura Sugerida del Artículo (Para garantizar entre 2.500 y 3.500 palabras)
1.  **Introducción Amplia (aprox. 350 palabras):** Planteamiento del tema, antecedentes históricos del Mundial y su relevancia actual al día 24 de Junio de 2026.
2.  **Sección 1 (aprox. 550 palabras):** Análisis táctico y definición profunda de los conceptos centrales del tema con múltiples H2 y H3.
3.  **Sección 2 (aprox. 600 palabras):** Casos prácticos, estadísticas detalladas de los jugadores o selecciones implicadas, ejemplos de aplicación o clasificaciones. Uso de grillas de tarjetas explicativas muy desarrolladas.
4.  **Sección 3 (aprox. 500 palabras):** Exclusiones comunes, errores frecuentes, precauciones y datos críticos de rendimiento (Caja de Alerta) con explicaciones minuciosas de cada punto.
5.  **Sección 4 (aprox. 450 palabras):** Tabla comparativa detallada usando la estructura de colores semánticos con descripciones extensas en cada fila.
6.  **Sección 5 (aprox. 350 palabras):** Bloque interactivo de al menos 4-5 preguntas frecuentes detalladas utilizando el acordeón de `<details>`, desarrollando cada respuesta con un mínimo de 70 palabras.
7.  **Sección 6 (aprox. 200 palabras):** Conclusión técnica con recomendaciones finales, próximos pasos y pronóstico de cara al resto del Mundial (Caja de Recomendación).
