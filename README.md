# P&L Calculator PRO — AI Edition 🧠🏪🛵

¡Bienvenido a **P&L Calculator PRO**! Una herramienta financiera interactiva diseñada específicamente para restaurantes que necesitan analizar de manera clara y dinámica sus estados de pérdidas y ganancias (P&L), comparando y consolidando sus ventas del canal físico y del canal de domicilios (Rappi).

## 🚀 Características Principales

- **Dashboard de KPIs en Tiempo Real**: Visualiza instantáneamente las métricas más importantes:
  - Ventas Totales (Orgánico + Ads)
  - Contribución Marginal (después de costos variables)
  - EBITDA (Retorno Operativo)
  - Margen Neto porcentual
- **Análisis por Canales**:
  - **Punto Físico**: Detalle financiero del local tradicional.
  - **Rappi**: Estructura de costos adaptada al canal de delivery, contemplando comisiones y pauta digital.
  - **Punto Físico + Rappi (Consolidado)**: Vista integrada para un análisis de salud financiera global.
- **Cálculos Financieros Clave**: Margen de contribución, costo de mercancía (COGS), gastos operativos (OPEX) y EBITDA.
- **Conversión de Moneda (TRM)**: Modifica la Tasa Representativa del Mercado (USD a COP) dinámicamente.
- **Exportación a Excel**: Descarga todos los estados financieros con un solo clic en formato `.xlsx` estructurado y limpio (desarrollado con SheetJS).
- **Diseño Moderno & Responsivo**: Interfaz premium con efectos visuales modernos (*Glassmorphism*), animaciones suaves y soporte multidispositivo.

## 🛠️ Tecnologías Utilizadas

- **HTML5** & **CSS3**: Estructura semántica y diseño con estilos personalizados (Vanilla CSS).
- **JavaScript (ES6+)**: Lógica interactiva y motor de cálculos financieros.
- **SheetJS (xlsx.full.min.js)**: Integración para la generación y exportación directa de libros Excel.

## 📂 Estructura del Repositorio

- `index.html`: Estructura principal de la aplicación web y elementos interactivos.
- `styles.css`: Hojas de estilo personalizadas con variables dinámicas, tarjetas de cristal (*glassmorphism*) y diseño responsivo.
- `app.js`: Motor interactivo de cálculos financieros, manejo de estados, pestañas y exportación de datos.
- `P&L Generico.xlsx` y `P&L (1).xlsx`: Plantillas de Excel de respaldo con el modelo financiero.
- `bg.png` y otras imágenes: Recursos visuales de la interfaz.

## 💻 Instalación y Uso Local

1. Clona este repositorio:
   ```bash
   git clone https://github.com/stiflerGlindo/P-L-.git
   ```
2. Entra en el directorio del proyecto:
   ```bash
   cd P-L-
   ```
3. Abre el archivo `index.html` en cualquier navegador web moderno. ¡Listo! No requiere de compilación ni servidores locales complejos.

---
*Desplegado en producción usando GitHub Pages: [https://stiflerglindo.github.io/P-L-/](https://stiflerglindo.github.io/P-L-/)*

