# PrintForge — 3D Printing Cost Calculator

> **"Calculate. Optimize. Print."**  
> A premium, interactive engineering cost estimator for additive manufacturing, built with an accessible, high-contrast **User-Friendly Neumorphism 2.0** design system.

---

## 🚀 Overview

**PrintForge** is a production-grade 3D printing cost calculator engineered for makers, 3D printing businesses, freelancers, print farms, and engineering students. It calculates the true cost of every 3D printed part by accounting for:

- **Material Spool / Resin Consumption** (with price per gram/kg and density calculations)
- **Machine Wear & Equipment Depreciation** (or manual hourly machine rates)
- **Electrical Energy Consumption** (Watts/kW, local kWh tariffs)
- **Hardware Maintenance & Tooling Wear** (nozzles, belts, lube, build sheets)
- **Labor & Post-Processing** (setup, slicing, support removal, UV curing/wash)
- **Wastage & Print Failure Allowance** (supports, purges, risk buffer)
- **Business Overhead & Commercial Profit Margins**
- **Batch Scaling & Unit Cost Optimization**

---

## 🎛️ Design Direction: User-Friendly Neumorphism 2.0

Unlike traditional flat or low-contrast neumorphism, **Neumorphism 2.0** combines soft physical extrusion with high-contrast usability:
- **Crystal Clear Contrast & Legibility**: Pure crisp whites and vibrant high-contrast text against matte cyber-slate backgrounds (`#1c202c` dark / `#e6ecf5` light).
- **Extruded Convex Cards & Buttons**: Raised elements with dual opposing light and dark shadow pairs (top-left light source highlight + bottom-right depth shadow).
- **Distinct Carved Inset Wells**: Inputs and selects look like clearly defined engraved wells with subtle edge definition so you always know where to click or type.
- **Glowing Interactive Focus States**: When an input is focused or a button is active, it illuminates with a radiant cyan/emerald glow.
- **Physical Push Feedback**: Buttons and preset chips indent into the surface when pressed (`box-shadow: inset ...` on `:active`).
- **Comfortable Ergonomic Touch Targets**: Large 42px touch-friendly steppers, range knobs, and pill buttons.

---

## ⚙️ Core Architecture & Features

### 1. Print Parameters (Left Column)
- **Material Parameters**:
  - Materials: PLA, PETG, ABS, ASA, TPU, Nylon, Resin, Custom.
  - Automatic density lookups (e.g. 1.24 g/cm³ for PLA, 1.04 g/cm³ for ABS).
  - Price per gram or price per kg toggle with live equivalence.
  - Mass in grams or kilograms.
  - Expandable volumetric calculation (cm³) and extruded filament length ($L = \frac{V}{\pi r^2}$).
- **Print Duration**:
  - Hours, Minutes, and optional Seconds.
  - Steppers and real-time total decimal calculation.
  - Visual timeline progress bar (0 to 24h+ scale).
- **Machine & Energy**:
  - Toggle between **Auto Depreciation** (`Purchase Price / Lifespan Hours`) and **Manual Hourly Rate**.
  - Power consumption in Watts or kW.
  - Local electricity tariff per kWh.
  - Maintenance allocation per operating hour.
- **Labor & Post-Processing**:
  - Enable/disable toggle for personal vs commercial jobs.
  - Hourly operator rate.
  - Preparation/slicing time and post-processing/support-removal time.
- **Wastage & Risk Allowance**:
  - Synchronized neumorphic range sliders and number inputs.
  - Material waste percentage (supports, purge towers, brims).
  - Failed-print contingency percentage.
- **Business Overhead & Margins**:
  - Overhead percentage (rent, software licenses, packaging).
  - Commercial profit margin percentage.
  - Batch quantity stepper and quick multipliers (`1x`, `5x`, `20x`, `50x`).

---

### 2. Live Cost Intelligence (Right Column)
- **Central Neumorphic Podium**:
  - Prominent real-time total cost display in selected currency (`₹`, `$`, `€`, `£`).
  - Cost per part badge.
  - Net commercial profit margin callout.
- **Interactive SVG Donut Chart**:
  - 8 distinct color-coded cost segments.
  - Scooped recessed circular bed with an extruded center island.
  - Center hole telemetry with dynamic hover readouts (category name, percentage, exact amount).
  - Synchronized highlighting with breakdown meter bars.
- **Itemized Breakdown**:
  - Material, Machine Depreciation, Electricity, Labor, Maintenance, Waste & Risk, Overhead, Profit.
- **Financial Subtotals Matrix**:
  - Direct Base Cost, Cost Before Profit, Final Batch Total, Price Per Part.

---

### 3. "Print DNA" & Layer Simulation Widget
- **Telemetry Readouts**:
  - Estimated Layer Count (based on 0.20mm standard layer height).
  - Total Filament Length extruded in meters.
  - Part Volume in cm³.
  - Total Electrical Footprint in kWh.
- **Virtual 3D Build Chamber Simulator**:
  - Interactive **Print Progress Slider** (0% → 100%).
  - **Simulate / Pause / Reset** controls.
  - Dynamic virtual layer stack building up on an isometric build plate.
  - Toolhead gantry rail and extruder nozzle with glowing brass tip depositing filament.
  - Real-time telemetry updating during simulation (current layer, material extruded, elapsed time).

---

### 4. Deterministic Cost Insights
- Rule-based analysis evaluating cost ratios:
  - Detects dominant cost drivers (e.g. material spool price vs machine depreciation).
  - Suggests infill optimizations (e.g. gyroid vs grid).
  - Highlights waste buffers and batch economies of scale.
  - Analyzes commercial profitability buffers.

---

### 5. Scenario Comparison ("Compare Print Scenarios")
- Compares 3 distinct fabrication scenarios:
  - **Scenario A (Standard)**
  - **Scenario B (Optimized / Lightweight)**
  - **Scenario C (Premium / High-Strength)**
- Tabular breakdown of Material, Machine, Energy, Labor, Base Cost, Profit, and Final Price.
- Visual badges for **Lowest Cost** and **Highest Margin**.
- One-click **"Apply to Calc"** and **"Clone Current into Scenario"**.

---

### 6. Quick Presets
One-click realistic configurations:
1. **PLA Prototype** (Standard 0.2mm, 125g, 6.5h)
2. **PETG Functional Part** (High strength, 180g, 9.25h)
3. **ABS Engineering Part** (Enclosure, 140g, 8h, heated bed 320W)
4. **Resin Miniature** (LCD screen wear, 55g, IPA wash + UV curing)
5. **High-Volume Production** (50 units batch, bulk spool discount)
6. **Custom Setup**

---

### 7. Estimate History (`localStorage`)
- **Save Current Estimate** with custom job name and notes.
- Saved estimates show: Name, Material, Print Duration, Batch Quantity, Final Cost, Cost per part, and timestamp.
- Actions on saved estimates:
  - 🔄 **Load / Restore** back into calculator
  - 📋 **Duplicate**
  - 🗑️ **Delete**
  - **Clear All History**

---

### 8. Export & Printable Invoice
- Formal quotation modal displaying:
  - Document ID, Date, Client Name, Job Reference.
  - Technical specs (material, duration, quantity, energy).
  - Itemized cost lines and subtotals.
- **Print / Save as PDF**: Clean `@media print` stylesheet that removes web UI and formats an invoice ready for client delivery.
- **Download JSON**: Full parameters and calculations backup.
- **Copy Summary**: Formatted quotation text copied to clipboard for email or Slack.

---

## 💻 How to View & Run

Visit the running local server:
👉 **[http://localhost:3000](http://localhost:3000)**

Or open directly in any browser:
📁 [index.html](file:///Users/aarushmane/.gemini/antigravity/scratch/printforge/index.html)
