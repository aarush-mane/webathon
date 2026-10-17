/**
 * PRINTFORGE — 3D PRINTING COST CALCULATOR
 * Production Engineering Calculation & Visualization Engine
 */

'use strict';

// ============================================================================
// 1. MATERIAL DATABASE & SPECIFICATIONS
// ============================================================================
const MATERIALS_DB = {
  PLA: {
    name: 'PLA (Polylactic Acid)',
    density: 1.24, // g/cm³
    typicalCostPerGram: 1.80,
    properties: 'FDM Thermoplastic • ~1.24 g/cm³ • 190-215°C',
    diameter: 1.75
  },
  PETG: {
    name: 'PETG (Polyethylene Terephthalate)',
    density: 1.27,
    typicalCostPerGram: 2.20,
    properties: 'Chemical & Impact Resistant • ~1.27 g/cm³ • 230-250°C',
    diameter: 1.75
  },
  ABS: {
    name: 'ABS (Acrylonitrile Butadiene Styrene)',
    density: 1.04,
    typicalCostPerGram: 1.95,
    properties: 'Thermal Toughness • ~1.04 g/cm³ • Enclosure Recommended',
    diameter: 1.75
  },
  ASA: {
    name: 'ASA (Acrylonitrile Styrene Acrylate)',
    density: 1.07,
    typicalCostPerGram: 2.50,
    properties: 'UV & Weatherproof • ~1.07 g/cm³ • Outdoor Applications',
    diameter: 1.75
  },
  TPU: {
    name: 'TPU (Thermoplastic Polyurethane 95A)',
    density: 1.21,
    typicalCostPerGram: 3.20,
    properties: 'Flexible Elastomer • ~1.21 g/cm³ • Slow Speed (~25mm/s)',
    diameter: 1.75
  },
  Nylon: {
    name: 'Nylon (Polyamide PA6/PA12)',
    density: 1.14,
    typicalCostPerGram: 4.50,
    properties: 'High Tensile & Friction Wear • ~1.14 g/cm³ • Dry Storage Critical',
    diameter: 1.75
  },
  Resin: {
    name: 'Resin (Standard Photopolymer)',
    density: 1.12,
    typicalCostPerGram: 3.50,
    properties: 'SLA/DLP/LCD Micro-Detail • ~1.12 g/cm³ • UV Wash & Cure',
    diameter: 1.75
  },
  Custom: {
    name: 'Custom Filament / Resin',
    density: 1.20,
    typicalCostPerGram: 2.00,
    properties: 'User-Defined Composite • Custom Specific Gravity',
    diameter: 1.75
  }
};

// ============================================================================
// 2. CURRENCY CONFIGURATION
// ============================================================================
const CURRENCIES = {
  INR: { symbol: '₹', code: 'INR', rate: 1.0, locale: 'en-IN' },
  USD: { symbol: '$', code: 'USD', rate: 0.012, locale: 'en-US' },
  EUR: { symbol: '€', code: 'EUR', rate: 0.011, locale: 'de-DE' },
  GBP: { symbol: '£', code: 'GBP', rate: 0.0095, locale: 'en-GB' }
};

// ============================================================================
// 3. PRESETS CONFIGURATION
// ============================================================================
const PRESETS = {
  pla_prototype: {
    name: 'PLA Prototype',
    materialType: 'PLA',
    materialPrice: 1.80,
    priceUnit: 'g',
    materialQuantity: 125,
    massUnit: 'g',
    density: 1.24,
    printHours: 6,
    printMinutes: 30,
    printSeconds: 0,
    machineRateMode: true, // auto depreciation
    machinePurchasePrice: 35000,
    machineLifespanHours: 5000,
    manualMachineHourlyRate: 7.00,
    powerWatts: 120,
    powerUnit: 'W',
    electricityRate: 10.00,
    maintenanceRate: 8.00,
    laborEnabled: true,
    laborHourlyRate: 150.00,
    prepTimeMinutes: 15,
    postTimeMinutes: 15,
    wastePercent: 8,
    failedPrintPercent: 0,
    overheadPercent: 5,
    profitPercent: 25,
    quantity: 1
  },
  petg_functional: {
    name: 'PETG Functional Part',
    materialType: 'PETG',
    materialPrice: 2.20,
    priceUnit: 'g',
    materialQuantity: 180,
    massUnit: 'g',
    density: 1.27,
    printHours: 9,
    printMinutes: 15,
    printSeconds: 0,
    machineRateMode: true,
    machinePurchasePrice: 45000,
    machineLifespanHours: 5000,
    manualMachineHourlyRate: 9.00,
    powerWatts: 220,
    powerUnit: 'W',
    electricityRate: 10.00,
    maintenanceRate: 10.00,
    laborEnabled: true,
    laborHourlyRate: 180.00,
    prepTimeMinutes: 20,
    postTimeMinutes: 25,
    wastePercent: 10,
    failedPrintPercent: 5,
    overheadPercent: 8,
    profitPercent: 30,
    quantity: 1
  },
  abs_engineering: {
    name: 'ABS Engineering Part',
    materialType: 'ABS',
    materialPrice: 2.10,
    priceUnit: 'g',
    materialQuantity: 140,
    massUnit: 'g',
    density: 1.04,
    printHours: 8,
    printMinutes: 0,
    printSeconds: 0,
    machineRateMode: true,
    machinePurchasePrice: 60000,
    machineLifespanHours: 5000,
    manualMachineHourlyRate: 12.00,
    powerWatts: 320,
    powerUnit: 'W',
    electricityRate: 10.00,
    maintenanceRate: 12.00,
    laborEnabled: true,
    laborHourlyRate: 200.00,
    prepTimeMinutes: 20,
    postTimeMinutes: 30,
    wastePercent: 12,
    failedPrintPercent: 10,
    overheadPercent: 10,
    profitPercent: 35,
    quantity: 1
  },
  resin_miniature: {
    name: 'Resin Miniature',
    materialType: 'Resin',
    materialPrice: 3.80,
    priceUnit: 'g',
    materialQuantity: 55,
    massUnit: 'g',
    density: 1.12,
    printHours: 4,
    printMinutes: 30,
    printSeconds: 0,
    machineRateMode: true,
    machinePurchasePrice: 28000,
    machineLifespanHours: 2500, // Monochrome LCD lifespan
    manualMachineHourlyRate: 11.20,
    powerWatts: 60,
    powerUnit: 'W',
    electricityRate: 10.00,
    maintenanceRate: 15.00,
    laborEnabled: true,
    laborHourlyRate: 200.00,
    prepTimeMinutes: 15,
    postTimeMinutes: 45, // Wash & UV Curing
    wastePercent: 15,
    failedPrintPercent: 5,
    overheadPercent: 12,
    profitPercent: 40,
    quantity: 1
  },
  high_volume: {
    name: 'High-Volume Production',
    materialType: 'PLA',
    materialPrice: 1.50, // bulk discount
    priceUnit: 'g',
    materialQuantity: 85,
    massUnit: 'g',
    density: 1.24,
    printHours: 4,
    printMinutes: 15,
    printSeconds: 0,
    machineRateMode: true,
    machinePurchasePrice: 35000,
    machineLifespanHours: 6000,
    manualMachineHourlyRate: 5.83,
    powerWatts: 120,
    powerUnit: 'W',
    electricityRate: 10.00,
    maintenanceRate: 6.00,
    laborEnabled: true,
    laborHourlyRate: 150.00,
    prepTimeMinutes: 30,
    postTimeMinutes: 60,
    wastePercent: 5,
    failedPrintPercent: 2,
    overheadPercent: 5,
    profitPercent: 20,
    quantity: 50
  },
  custom: {
    name: 'Custom Setup'
  }
};

// ============================================================================
// 4. APPLICATION STATE STORE
// ============================================================================
class CalculatorState {
  constructor() {
    this.currency = 'INR';
    this.massUnit = 'g'; // 'g' | 'kg'
    this.priceUnit = 'g'; // 'g' | 'kg'
    this.powerUnit = 'W'; // 'W' | 'kW'
    this.theme = 'light';

    // Model Inputs
    this.materialType = 'PLA';
    this.materialPrice = 1.80; // per gram
    this.materialQuantity = 125; // in active massUnit
    this.density = 1.24;
    this.filamentDiameter = 1.75; // mm

    this.printHours = 6;
    this.printMinutes = 30;
    this.printSeconds = 0;

    this.machineRateMode = true; // true = auto depreciation, false = manual
    this.machinePurchasePrice = 35000;
    this.machineLifespanHours = 5000;
    this.manualMachineHourlyRate = 7.00;

    this.powerWatts = 120;
    this.electricityRatePerKwh = 10.00;
    this.maintenanceRatePerHour = 8.00;

    this.laborEnabled = true;
    this.laborHourlyRate = 150.00;
    this.prepTimeMinutes = 15;
    this.postTimeMinutes = 15;

    this.wastePercent = 8;
    this.failedPrintPercent = 0;

    this.overheadPercent = 5;
    this.profitPercent = 25;
    this.quantity = 1;

    // Simulation / Visualizer
    this.simProgress = 0;
    this.isSimulating = false;
    this.simAnimId = null;

    // Scenarios Cache
    this.scenarios = {
      A: { ...PRESETS.pla_prototype, name: 'Standard (Scenario A)' },
      B: {
        ...PRESETS.pla_prototype,
        name: 'Optimized (Scenario B)',
        materialQuantity: 95,
        printHours: 4,
        printMinutes: 45,
        wastePercent: 5,
        prepTimeMinutes: 10,
        postTimeMinutes: 10,
        profitPercent: 20
      },
      C: {
        ...PRESETS.petg_functional,
        name: 'Premium (Scenario C)',
        materialQuantity: 150,
        printHours: 9,
        printMinutes: 15,
        wastePercent: 10,
        profitPercent: 35
      }
    };

    // Estimates History (from localStorage)
    this.history = [];
  }

  // Normalize material used to Grams
  get materialUsedGrams() {
    const raw = Number(this.materialQuantity) || 0;
    return this.massUnit === 'kg' ? raw * 1000 : raw;
  }

  // Normalize material price to Price Per Gram
  get materialPricePerGram() {
    const raw = Number(this.materialPrice) || 0;
    return this.priceUnit === 'kg' ? raw / 1000 : raw;
  }

  // Total Print Time in Decimal Hours
  get printTimeHours() {
    const h = Math.max(0, Number(this.printHours) || 0);
    const m = Math.max(0, Number(this.printMinutes) || 0);
    const s = Math.max(0, Number(this.printSeconds) || 0);
    return h + (m / 60) + (s / 3600);
  }

  // Machine Hourly Rate
  get effectiveMachineHourlyRate() {
    if (this.machineRateMode) {
      const lifespan = Math.max(1, Number(this.machineLifespanHours) || 1);
      const purchase = Math.max(0, Number(this.machinePurchasePrice) || 0);
      return purchase / lifespan;
    }
    return Math.max(0, Number(this.manualMachineHourlyRate) || 0);
  }

  // Power in Watts
  get effectivePowerWatts() {
    const p = Math.max(0, Number(this.powerWatts) || 0);
    return this.powerUnit === 'kW' ? p * 1000 : p;
  }

  // Total Labor Hours
  get totalLaborHours() {
    const prep = Math.max(0, Number(this.prepTimeMinutes) || 0);
    const post = Math.max(0, Number(this.postTimeMinutes) || 0);
    return (prep + post) / 60;
  }
}

// ============================================================================
// 5. CALCULATION ENGINE
// ============================================================================
class CalculationEngine {
  /**
   * Pure calculation function given state-like parameter object
   */
  static calculate(params) {
    // 1. Material
    const materialGrams = Math.max(0, Number(params.materialUsedGrams) || 0);
    const pricePerGram = Math.max(0, Number(params.materialPricePerGram) || 0);
    const materialCost = materialGrams * pricePerGram;

    // 2. Machine
    const printHours = Math.max(0, Number(params.printTimeHours) || 0);
    const machineHourlyCost = Math.max(0, Number(params.effectiveMachineHourlyRate) || 0);
    const machineCost = printHours * machineHourlyCost;

    // 3. Electricity
    const watts = Math.max(0, Number(params.effectivePowerWatts) || 0);
    const electricityPriceKwh = Math.max(0, Number(params.electricityRatePerKwh) || 0);
    const energyKwh = (printHours * watts) / 1000;
    const electricityCost = energyKwh * electricityPriceKwh;

    // 4. Maintenance
    const maintRate = Math.max(0, Number(params.maintenanceRatePerHour) || 0);
    const maintenanceCost = printHours * maintRate;

    // 5. Labor
    const laborEnabled = Boolean(params.laborEnabled);
    const laborHours = Math.max(0, Number(params.totalLaborHours) || 0);
    const laborRate = Math.max(0, Number(params.laborHourlyRate) || 0);
    const laborCost = laborEnabled ? (laborHours * laborRate) : 0;

    // 6. Wastage & Risk
    const wastePct = Math.max(0, Number(params.wastePercent) || 0);
    const wasteCost = materialCost * (wastePct / 100);

    const failRiskPct = Math.max(0, Number(params.failedPrintPercent) || 0);
    // Failure risk buffer applied to (material + machine + energy)
    const failureRiskCost = (materialCost + machineCost + electricityCost) * (failRiskPct / 100);

    // 7. Base Cost
    const totalWasteAndRisk = wasteCost + failureRiskCost;
    const baseCost = materialCost + totalWasteAndRisk + machineCost + electricityCost + maintenanceCost + laborCost;

    // 8. Overhead
    const overheadPct = Math.max(0, Number(params.overheadPercent) || 0);
    const overheadCost = baseCost * (overheadPct / 100);

    // 9. Cost Before Profit
    const costBeforeProfit = baseCost + overheadCost;

    // 10. Commercial Profit
    const profitPct = Math.max(0, Number(params.profitPercent) || 0);
    const profitCost = costBeforeProfit * (profitPct / 100);

    // 11. Final Price (Batch)
    const finalPrice = costBeforeProfit + profitCost;

    // 12. Quantity & Per Part
    const quantity = Math.max(1, parseInt(params.quantity, 10) || 1);
    const costPerPart = finalPrice / quantity;

    // 13. Telemetry / DNA Metrics
    const density = Math.max(0.1, Number(params.density) || 1.24);
    const volumeCm3 = materialGrams / density;

    // Filament Length: V = pi * r^2 * L  =>  L = V / (pi * r^2)
    const filamentDiameterMm = Number(params.filamentDiameter) || 1.75;
    const radiusCm = (filamentDiameterMm / 10) / 2;
    const crossSectionCm2 = Math.PI * Math.pow(radiusCm, 2);
    const filamentLengthCm = crossSectionCm2 > 0 ? (volumeCm3 / crossSectionCm2) : 0;
    const filamentLengthMeters = filamentLengthCm / 100;

    // Estimated Layers: heuristic based on typical aspect ratio and 0.20mm standard layer height
    const estimatedHeightMm = Math.max(5, Math.pow(volumeCm3, 0.45) * 20);
    const estimatedLayers = Math.max(10, Math.round(estimatedHeightMm / 0.20));

    return {
      materialGrams,
      pricePerGram,
      materialCost,
      printHours,
      machineHourlyCost,
      machineCost,
      energyKwh,
      electricityCost,
      maintenanceCost,
      laborHours,
      laborCost,
      wasteCost,
      failureRiskCost,
      totalWasteAndRisk,
      baseCost,
      overheadPct,
      overheadCost,
      costBeforeProfit,
      profitPct,
      profitCost,
      finalPrice,
      quantity,
      costPerPart,
      volumeCm3,
      filamentLengthMeters,
      estimatedLayers
    };
  }
}

// ============================================================================
// 6. UI FORMATTER HELPERS
// ============================================================================
class Formatter {
  static currency(val, currencyKey = 'INR') {
    const num = Number(val) || 0;
    const cfg = CURRENCIES[currencyKey] || CURRENCIES.INR;
    return `${cfg.symbol}${num.toLocaleString(cfg.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  static number(val, decimals = 2) {
    const num = Number(val) || 0;
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  static symbol(currencyKey = 'INR') {
    return (CURRENCIES[currencyKey] || CURRENCIES.INR).symbol;
  }
}

// ============================================================================
// 7. MAIN CONTROLLER & DOM INTEGRATION
// ============================================================================
class PrintForgeApp {
  constructor() {
    this.state = new CalculatorState();
    this.donutHoverCategory = null;
    this.initElements();
    this.loadPersistedData();
    this.bindEvents();
    this.render();
  }

  initElements() {
    // Header & Global Controls
    this.currencySelect = document.getElementById('currencySelect');
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.resetDefaultsBtn = document.getElementById('resetDefaultsBtn');
    this.headerExportBtn = document.getElementById('headerExportBtn');

    // Quick Stats
    this.quickStatMaterial = document.getElementById('quickStatMaterial');
    this.quickStatMaterialHint = document.getElementById('quickStatMaterialHint');
    this.quickStatMachine = document.getElementById('quickStatMachine');
    this.quickStatMachineHint = document.getElementById('quickStatMachineHint');
    this.quickStatTotal = document.getElementById('quickStatTotal');
    this.quickStatUnitCost = document.getElementById('quickStatUnitCost');

    // Presets
    this.presetChips = document.querySelectorAll('.preset-chip');

    // Section A: Material
    this.materialTypeSelect = document.getElementById('materialType');
    this.materialPropertiesTag = document.getElementById('materialPropertiesTag');
    this.materialPriceInput = document.getElementById('materialPriceInput');
    this.priceUnitToggleBtn = document.getElementById('priceUnitToggleBtn');
    this.priceUnitLabel = document.getElementById('priceUnitLabel');
    this.spoolPriceEquivalent = document.getElementById('spoolPriceEquivalent');
    this.materialQuantityInput = document.getElementById('materialQuantityInput');
    this.massUnitSegmentBtns = document.querySelectorAll('#massUnitSegment .segment-btn');
    this.massUnitLabel = document.getElementById('massUnitLabel');
    this.massGramsHelper = document.getElementById('massGramsHelper');

    // Density Expandable
    this.densityToggleHeader = document.getElementById('densityToggleHeader');
    this.densityContent = document.getElementById('densityContent');
    this.materialDensityInput = document.getElementById('materialDensityInput');
    this.filamentDiameterSelect = document.getElementById('filamentDiameterSelect');
    this.calculatedVolumeTag = document.getElementById('calculatedVolumeTag');
    this.currentDensityBadge = document.getElementById('currentDensityBadge');

    // Section B: Time
    this.printHoursInput = document.getElementById('printHoursInput');
    this.printMinutesInput = document.getElementById('printMinutesInput');
    this.printSecondsInput = document.getElementById('printSecondsInput');
    this.totalHoursDecimalTag = document.getElementById('totalHoursDecimalTag');
    this.totalMinutesTag = document.getElementById('totalMinutesTag');
    this.timelineFillBar = document.getElementById('timelineFillBar');
    this.timelineScaleText = document.getElementById('timelineScaleText');

    // Section C: Machine & Power
    this.machineRateModeToggle = document.getElementById('machineRateModeToggle');
    this.machineModeLabel = document.getElementById('machineModeLabel');
    this.autoDepreciationFields = document.getElementById('autoDepreciationFields');
    this.manualRateFields = document.getElementById('manualRateFields');
    this.machinePurchasePrice = document.getElementById('machinePurchasePrice');
    this.machineLifespanHours = document.getElementById('machineLifespanHours');
    this.calculatedDepreciationHelper = document.getElementById('calculatedDepreciationHelper');
    this.manualMachineHourlyRate = document.getElementById('manualMachineHourlyRate');

    this.machinePowerWatts = document.getElementById('machinePowerWatts');
    this.powerUnitSegmentBtns = document.querySelectorAll('#powerUnitSegment .segment-btn');
    this.powerUnitLabel = document.getElementById('powerUnitLabel');
    this.energyConsumedHelper = document.getElementById('energyConsumedHelper');
    this.electricityRatePerKwh = document.getElementById('electricityRatePerKwh');
    this.calculatedElectricityHelper = document.getElementById('calculatedElectricityHelper');
    this.maintenanceRatePerHour = document.getElementById('maintenanceRatePerHour');
    this.calculatedMaintenanceHelper = document.getElementById('calculatedMaintenanceHelper');

    // Section D: Labor
    this.laborEnabledToggle = document.getElementById('laborEnabledToggle');
    this.laborToggleLabel = document.getElementById('laborToggleLabel');
    this.laborFieldsBody = document.getElementById('laborFieldsBody');
    this.laborHourlyRate = document.getElementById('laborHourlyRate');
    this.prepTimeMinutes = document.getElementById('prepTimeMinutes');
    this.postTimeMinutes = document.getElementById('postTimeMinutes');
    this.totalLaborDurationTag = document.getElementById('totalLaborDurationTag');
    this.totalLaborCostTag = document.getElementById('totalLaborCostTag');

    // Section E: Waste & Risk
    this.materialWasteSlider = document.getElementById('materialWasteSlider');
    this.materialWastePercent = document.getElementById('materialWastePercent');
    this.wasteCostHelper = document.getElementById('wasteCostHelper');
    this.failedPrintSlider = document.getElementById('failedPrintSlider');
    this.failedPrintAllowancePercent = document.getElementById('failedPrintAllowancePercent');
    this.failureCostHelper = document.getElementById('failureCostHelper');

    // Section F: Overhead, Margin & Qty
    this.overheadSlider = document.getElementById('overheadSlider');
    this.overheadPercent = document.getElementById('overheadPercent');
    this.overheadCostHelper = document.getElementById('overheadCostHelper');
    this.profitSlider = document.getElementById('profitSlider');
    this.profitPercent = document.getElementById('profitPercent');
    this.profitCostHelper = document.getElementById('profitCostHelper');

    this.partsQuantityInput = document.getElementById('partsQuantityInput');
    this.qtyMinusBtn = document.getElementById('qtyMinusBtn');
    this.qtyPlusBtn = document.getElementById('qtyPlusBtn');
    this.qtyPills = document.querySelectorAll('.pill-chip[data-qty]');

    // Cost Intelligence Panel
    this.grandTotalAmount = document.getElementById('grandTotalAmount');
    this.costPerPartVal = document.getElementById('costPerPartVal');
    this.netMarginTag = document.getElementById('netMarginTag');
    this.quickSaveBtn = document.getElementById('quickSaveBtn');

    // Donut Chart
    this.costDonutSvg = document.getElementById('costDonutSvg');
    this.donutArcsGroup = document.getElementById('donutArcsGroup');
    this.donutHoverTitle = document.getElementById('donutHoverTitle');
    this.donutHoverValue = document.getElementById('donutHoverValue');
    this.donutHoverSub = document.getElementById('donutHoverSub');
    this.donutTooltip = document.getElementById('donutTooltip');
    this.breakdownRows = document.querySelectorAll('.breakdown-row');

    // Subtotals Matrix
    this.subtotalBaseCost = document.getElementById('subtotalBaseCost');
    this.subtotalCostBeforeProfit = document.getElementById('subtotalCostBeforeProfit');
    this.subtotalFinalPrice = document.getElementById('subtotalFinalPrice');
    this.subtotalPerPart = document.getElementById('subtotalPerPart');

    // Print DNA Telemetry
    this.dnaLayerCount = document.getElementById('dnaLayerCount');
    this.dnaFilamentLength = document.getElementById('dnaFilamentLength');
    this.dnaVolume = document.getElementById('dnaVolume');
    this.dnaEnergy = document.getElementById('dnaEnergy');

    // Print Simulation
    this.simPlayBtn = document.getElementById('simPlayBtn');
    this.simPlayBtnText = document.getElementById('simPlayBtnText');
    this.simPlayIcon = document.getElementById('simPlayIcon');
    this.simResetBtn = document.getElementById('simResetBtn');
    this.simStatusText = document.getElementById('simStatusText');
    this.simProgressSlider = document.getElementById('simProgressSlider');
    this.simSliderPercentText = document.getElementById('simSliderPercentText');
    this.simLayerStackGroup = document.getElementById('simLayerStackGroup');
    this.simNozzleGroup = document.getElementById('simNozzleGroup');
    this.simCurrentLayerText = document.getElementById('simCurrentLayerText');
    this.simCurrentMassText = document.getElementById('simCurrentMassText');
    this.simCurrentTimeText = document.getElementById('simCurrentTimeText');

    // Insights Container
    this.insightsContainer = document.getElementById('insightsContainer');

    // Scenarios Table
    this.copyCurrentToScenarioBtn = document.getElementById('copyCurrentToScenarioBtn');
    this.applyScenarioBtns = document.querySelectorAll('.apply-scenario-btn');

    // History
    this.historyListContainer = document.getElementById('historyListContainer');
    this.emptyHistoryNotice = document.getElementById('emptyHistoryNotice');
    this.clearAllHistoryBtn = document.getElementById('clearAllHistoryBtn');

    // Export Modal
    this.exportModalBackdrop = document.getElementById('exportModalBackdrop');
    this.closeExportModalBtn = document.getElementById('closeExportModalBtn');
    this.printInvoiceBtn = document.getElementById('printInvoiceBtn');
    this.downloadJsonBtn = document.getElementById('downloadJsonBtn');
    this.copyClipboardBtn = document.getElementById('copyClipboardBtn');
    this.invEstimateName = document.getElementById('invEstimateName');
    this.invClientName = document.getElementById('invClientName');

    // Save Modal
    this.saveModalBackdrop = document.getElementById('saveModalBackdrop');
    this.closeSaveModalBtn = document.getElementById('closeSaveModalBtn');
    this.cancelSaveBtn = document.getElementById('cancelSaveBtn');
    this.confirmSaveBtn = document.getElementById('confirmSaveBtn');
    this.saveEstimateNameInput = document.getElementById('saveEstimateNameInput');
    this.saveEstimateNotesInput = document.getElementById('saveEstimateNotesInput');

    // Toast Container
    this.toastContainer = document.getElementById('toastContainer');
  }

  // ==========================================================================
  // EVENT BINDINGS
  // ==========================================================================
  bindEvents() {
    // Currency Selector
    this.currencySelect.addEventListener('change', (e) => {
      this.state.currency = e.target.value;
      this.updateCurrencySymbols();
      this.render();
      this.showToast(`Currency switched to ${this.state.currency}`);
    });

    // Theme Toggle
    this.themeToggleBtn.addEventListener('click', () => {
      this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.state.theme);
      try {
        localStorage.setItem('printforge_theme', this.state.theme);
      } catch (e) {}
    });

    // Reset Defaults Button
    this.resetDefaultsBtn.addEventListener('click', () => {
      this.loadPreset('pla_prototype');
      this.showToast('Reset all parameters to default configuration', 'success');
    });

    // Export Modal Open/Close
    this.headerExportBtn.addEventListener('click', () => this.openExportModal());
    this.closeExportModalBtn.addEventListener('click', () => this.closeExportModal());
    this.exportModalBackdrop.addEventListener('click', (e) => {
      if (e.target === this.exportModalBackdrop) this.closeExportModal();
    });

    // Save Modal Open/Close
    this.quickSaveBtn.addEventListener('click', () => this.openSaveModal());
    this.closeSaveModalBtn.addEventListener('click', () => this.closeSaveModal());
    this.cancelSaveBtn.addEventListener('click', () => this.closeSaveModal());
    this.confirmSaveBtn.addEventListener('click', () => this.handleSaveEstimate());

    // Export Actions
    this.printInvoiceBtn.addEventListener('click', () => window.print());
    this.downloadJsonBtn.addEventListener('click', () => this.handleDownloadJson());
    this.copyClipboardBtn.addEventListener('click', () => this.handleCopySummary());

    // Presets Bar
    this.presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const presetKey = chip.getAttribute('data-preset');
        this.loadPreset(presetKey);
        this.presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.showToast(`Loaded preset: ${chip.textContent.trim()}`, 'success');
      });
    });

    // Material Type Selection
    this.materialTypeSelect.addEventListener('change', (e) => {
      const type = e.target.value;
      this.state.materialType = type;
      if (MATERIALS_DB[type]) {
        const mat = MATERIALS_DB[type];
        this.state.density = mat.density;
        this.materialDensityInput.value = mat.density;
        this.materialPropertiesTag.textContent = mat.properties;
        this.currentDensityBadge.textContent = `${mat.density} g/cm³`;
      }
      this.render();
    });

    // Price Unit Toggle (/g <-> /kg)
    this.priceUnitToggleBtn.addEventListener('click', () => {
      if (this.state.priceUnit === 'g') {
        this.state.priceUnit = 'kg';
        this.priceUnitToggleBtn.textContent = '/kg';
        this.priceUnitLabel.textContent = 'kg';
        this.materialPriceInput.value = (Number(this.materialPriceInput.value) * 1000).toFixed(2);
      } else {
        this.state.priceUnit = 'g';
        this.priceUnitToggleBtn.textContent = '/g';
        this.priceUnitLabel.textContent = 'g';
        this.materialPriceInput.value = (Number(this.materialPriceInput.value) / 1000).toFixed(2);
      }
      this.syncInputsToState();
      this.render();
    });

    // Mass Unit Segment (grams <-> kg)
    this.massUnitSegmentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const newUnit = btn.getAttribute('data-unit');
        if (newUnit === this.state.massUnit) return;

        this.massUnitSegmentBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const currentVal = Number(this.materialQuantityInput.value) || 0;
        if (newUnit === 'kg') {
          this.materialQuantityInput.value = (currentVal / 1000).toFixed(3);
          this.massUnitLabel.textContent = 'kg';
        } else {
          this.materialQuantityInput.value = Math.round(currentVal * 1000);
          this.massUnitLabel.textContent = 'g';
        }

        this.state.massUnit = newUnit;
        this.syncInputsToState();
        this.render();
      });
    });

    // Density Expandable Accordion
    this.densityToggleHeader.addEventListener('click', () => {
      this.densityContent.classList.toggle('expanded');
    });

    this.materialDensityInput.addEventListener('input', (e) => {
      this.state.density = Math.max(0.1, Number(e.target.value) || 1.24);
      this.currentDensityBadge.textContent = `${this.state.density} g/cm³`;
      this.render();
    });

    this.filamentDiameterSelect.addEventListener('change', (e) => {
      this.state.filamentDiameter = Number(e.target.value) || 1.75;
      this.render();
    });

    // Time Steppers
    document.querySelectorAll('.step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const dir = btn.getAttribute('data-dir');
        const input = document.getElementById(targetId);
        if (!input) return;

        let val = parseInt(input.value, 10) || 0;
        val = dir === 'up' ? val + 1 : Math.max(0, val - 1);
        if (targetId === 'printMinutesInput' || targetId === 'printSecondsInput') {
          if (val > 59) val = 0;
        }
        input.value = val;
        this.syncInputsToState();
        this.render();
      });
    });

    // Machine Rate Mode Toggle (Auto Depreciation vs Manual)
    this.machineRateModeToggle.addEventListener('change', (e) => {
      this.state.machineRateMode = e.target.checked;
      if (this.state.machineRateMode) {
        this.autoDepreciationFields.classList.remove('hidden');
        this.manualRateFields.classList.add('hidden');
        this.machineModeLabel.textContent = 'Auto Depreciation';
      } else {
        this.autoDepreciationFields.classList.add('hidden');
        this.manualRateFields.classList.remove('hidden');
        this.machineModeLabel.textContent = 'Manual Rate';
      }
      this.render();
    });

    // Power Unit Segment (W vs kW)
    this.powerUnitSegmentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const newUnit = btn.getAttribute('data-unit');
        if (newUnit === this.state.powerUnit) return;

        this.powerUnitSegmentBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const currentVal = Number(this.machinePowerWatts.value) || 0;
        if (newUnit === 'kW') {
          this.machinePowerWatts.value = (currentVal / 1000).toFixed(3);
          this.powerUnitLabel.textContent = 'kW';
        } else {
          this.machinePowerWatts.value = Math.round(currentVal * 1000);
          this.powerUnitLabel.textContent = 'W';
        }

        this.state.powerUnit = newUnit;
        this.syncInputsToState();
        this.render();
      });
    });

    // Labor Toggle
    this.laborEnabledToggle.addEventListener('change', (e) => {
      this.state.laborEnabled = e.target.checked;
      this.laborToggleLabel.textContent = this.state.laborEnabled ? 'Labor Active' : 'Labor Disabled';
      this.laborFieldsBody.style.opacity = this.state.laborEnabled ? '1' : '0.4';
      this.laborFieldsBody.style.pointerEvents = this.state.laborEnabled ? 'auto' : 'none';
      this.render();
    });

    // Range Sliders Synchronized with Number Inputs
    this.bindRangePair(this.materialWasteSlider, this.materialWastePercent, (val) => {
      this.state.wastePercent = val;
    });

    this.bindRangePair(this.failedPrintSlider, this.failedPrintAllowancePercent, (val) => {
      this.state.failedPrintPercent = val;
    });

    this.bindRangePair(this.overheadSlider, this.overheadPercent, (val) => {
      this.state.overheadPercent = val;
    });

    this.bindRangePair(this.profitSlider, this.profitPercent, (val) => {
      this.state.profitPercent = val;
    });

    // Batch Quantity Steppers & Pills
    this.qtyMinusBtn.addEventListener('click', () => {
      let q = parseInt(this.partsQuantityInput.value, 10) || 1;
      this.partsQuantityInput.value = Math.max(1, q - 1);
      this.state.quantity = parseInt(this.partsQuantityInput.value, 10);
      this.updateQtyPillsActive();
      this.render();
    });

    this.qtyPlusBtn.addEventListener('click', () => {
      let q = parseInt(this.partsQuantityInput.value, 10) || 1;
      this.partsQuantityInput.value = q + 1;
      this.state.quantity = parseInt(this.partsQuantityInput.value, 10);
      this.updateQtyPillsActive();
      this.render();
    });

    this.qtyPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const q = parseInt(pill.getAttribute('data-qty'), 10) || 1;
        this.partsQuantityInput.value = q;
        this.state.quantity = q;
        this.updateQtyPillsActive();
        this.render();
      });
    });

    // All numerical inputs live change
    const inputsToWatch = [
      this.materialPriceInput,
      this.materialQuantityInput,
      this.printHoursInput,
      this.printMinutesInput,
      this.printSecondsInput,
      this.machinePurchasePrice,
      this.machineLifespanHours,
      this.manualMachineHourlyRate,
      this.machinePowerWatts,
      this.electricityRatePerKwh,
      this.maintenanceRatePerHour,
      this.laborHourlyRate,
      this.prepTimeMinutes,
      this.postTimeMinutes,
      this.partsQuantityInput
    ];

    inputsToWatch.forEach(input => {
      input.addEventListener('input', () => {
        this.syncInputsToState();
        this.render();
      });
    });

    // Donut breakdown row hover interaction
    this.breakdownRows.forEach(row => {
      const cat = row.getAttribute('data-category');
      row.addEventListener('mouseenter', () => this.highlightDonutCategory(cat));
      row.addEventListener('mouseleave', () => this.highlightDonutCategory(null));
      row.addEventListener('focus', () => this.highlightDonutCategory(cat));
      row.addEventListener('blur', () => this.highlightDonutCategory(null));
    });

    // Print Simulation Controls
    this.simProgressSlider.addEventListener('input', (e) => {
      this.state.simProgress = parseFloat(e.target.value) || 0;
      this.updateSimulationVisuals();
    });

    this.simPlayBtn.addEventListener('click', () => this.toggleSimulation());
    this.simResetBtn.addEventListener('click', () => {
      this.stopSimulation();
      this.state.simProgress = 0;
      this.simProgressSlider.value = 0;
      this.updateSimulationVisuals();
    });

    // Scenarios Table
    this.applyScenarioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const scenKey = btn.getAttribute('data-scenario');
        this.applyScenario(scenKey);
      });
    });

    this.copyCurrentToScenarioBtn.addEventListener('click', () => {
      this.cloneCurrentToScenario();
    });

    // Clear History Button
    this.clearAllHistoryBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all saved estimates?')) {
        this.state.history = [];
        this.persistHistory();
        this.renderHistory();
        this.showToast('Cleared all saved estimates', 'warning');
      }
    });

    // Keyboard navigation: Escape key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeExportModal();
        this.closeSaveModal();
      }
    });
  }

  // ==========================================================================
  // HELPER: SYNC SLIDERS & NUMBERS
  // ==========================================================================
  bindRangePair(slider, numberInput, callback) {
    slider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value) || 0;
      numberInput.value = val;
      callback(val);
      this.render();
    });

    numberInput.addEventListener('input', (e) => {
      const val = Math.max(0, parseFloat(e.target.value) || 0);
      slider.value = Math.min(Number(slider.max), val);
      callback(val);
      this.render();
    });
  }

  updateQtyPillsActive() {
    const cur = parseInt(this.partsQuantityInput.value, 10);
    this.qtyPills.forEach(pill => {
      const q = parseInt(pill.getAttribute('data-qty'), 10);
      pill.classList.toggle('active', q === cur);
    });
  }

  // ==========================================================================
  // SYNC INPUTS TO STATE
  // ==========================================================================
  syncInputsToState() {
    this.state.materialPrice = Math.max(0, Number(this.materialPriceInput.value) || 0);
    this.state.materialQuantity = Math.max(0, Number(this.materialQuantityInput.value) || 0);
    this.state.density = Math.max(0.1, Number(this.materialDensityInput.value) || 1.24);

    this.state.printHours = Math.max(0, Number(this.printHoursInput.value) || 0);
    this.state.printMinutes = Math.max(0, Number(this.printMinutesInput.value) || 0);
    this.state.printSeconds = Math.max(0, Number(this.printSecondsInput.value) || 0);

    this.state.machinePurchasePrice = Math.max(0, Number(this.machinePurchasePrice.value) || 0);
    this.state.machineLifespanHours = Math.max(1, Number(this.machineLifespanHours.value) || 1);
    this.state.manualMachineHourlyRate = Math.max(0, Number(this.manualMachineHourlyRate.value) || 0);

    this.state.powerWatts = Math.max(0, Number(this.machinePowerWatts.value) || 0);
    this.state.electricityRatePerKwh = Math.max(0, Number(this.electricityRatePerKwh.value) || 0);
    this.state.maintenanceRatePerHour = Math.max(0, Number(this.maintenanceRatePerHour.value) || 0);

    this.state.laborHourlyRate = Math.max(0, Number(this.laborHourlyRate.value) || 0);
    this.state.prepTimeMinutes = Math.max(0, Number(this.prepTimeMinutes.value) || 0);
    this.state.postTimeMinutes = Math.max(0, Number(this.postTimeMinutes.value) || 0);

    this.state.wastePercent = Math.max(0, Number(this.materialWastePercent.value) || 0);
    this.state.failedPrintPercent = Math.max(0, Number(this.failedPrintAllowancePercent.value) || 0);
    this.state.overheadPercent = Math.max(0, Number(this.overheadPercent.value) || 0);
    this.state.profitPercent = Math.max(0, Number(this.profitPercent.value) || 0);
    this.state.quantity = Math.max(1, parseInt(this.partsQuantityInput.value, 10) || 1);
  }

  // ==========================================================================
  // PRESET LOADER
  // ==========================================================================
  loadPreset(presetKey) {
    const p = PRESETS[presetKey];
    if (!p) return;

    this.state.materialType = p.materialType || 'PLA';
    this.materialTypeSelect.value = this.state.materialType;

    this.state.materialPrice = p.materialPrice ?? 1.80;
    this.materialPriceInput.value = this.state.materialPrice.toFixed(2);

    this.state.priceUnit = p.priceUnit || 'g';
    this.priceUnitToggleBtn.textContent = `/${this.state.priceUnit}`;
    this.priceUnitLabel.textContent = this.state.priceUnit;

    this.state.materialQuantity = p.materialQuantity ?? 125;
    this.materialQuantityInput.value = this.state.materialQuantity;

    this.state.massUnit = p.massUnit || 'g';
    this.massUnitLabel.textContent = this.state.massUnit;
    this.massUnitSegmentBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-unit') === this.state.massUnit));

    this.state.density = p.density ?? 1.24;
    this.materialDensityInput.value = this.state.density;
    this.currentDensityBadge.textContent = `${this.state.density} g/cm³`;

    if (MATERIALS_DB[this.state.materialType]) {
      this.materialPropertiesTag.textContent = MATERIALS_DB[this.state.materialType].properties;
    }

    this.state.printHours = p.printHours ?? 6;
    this.printHoursInput.value = this.state.printHours;

    this.state.printMinutes = p.printMinutes ?? 30;
    this.printMinutesInput.value = this.state.printMinutes;

    this.state.printSeconds = p.printSeconds ?? 0;
    this.printSecondsInput.value = this.state.printSeconds;

    this.state.machineRateMode = p.machineRateMode !== false;
    this.machineRateModeToggle.checked = this.state.machineRateMode;
    this.machineModeLabel.textContent = this.state.machineRateMode ? 'Auto Depreciation' : 'Manual Rate';
    this.autoDepreciationFields.classList.toggle('hidden', !this.state.machineRateMode);
    this.manualRateFields.classList.toggle('hidden', this.state.machineRateMode);

    this.state.machinePurchasePrice = p.machinePurchasePrice ?? 35000;
    this.machinePurchasePrice.value = this.state.machinePurchasePrice;

    this.state.machineLifespanHours = p.machineLifespanHours ?? 5000;
    this.machineLifespanHours.value = this.state.machineLifespanHours;

    this.state.manualMachineHourlyRate = p.manualMachineHourlyRate ?? 7.00;
    this.manualMachineHourlyRate.value = this.state.manualMachineHourlyRate.toFixed(2);

    this.state.powerWatts = p.powerWatts ?? 120;
    this.machinePowerWatts.value = this.state.powerWatts;
    this.state.powerUnit = p.powerUnit || 'W';
    this.powerUnitLabel.textContent = this.state.powerUnit;
    this.powerUnitSegmentBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-unit') === this.state.powerUnit));

    this.state.electricityRatePerKwh = p.electricityRate ?? 10.00;
    this.electricityRatePerKwh.value = this.state.electricityRatePerKwh.toFixed(2);

    this.state.maintenanceRatePerHour = p.maintenanceRate ?? 8.00;
    this.maintenanceRatePerHour.value = this.state.maintenanceRatePerHour.toFixed(2);

    this.state.laborEnabled = p.laborEnabled !== false;
    this.laborEnabledToggle.checked = this.state.laborEnabled;
    this.laborToggleLabel.textContent = this.state.laborEnabled ? 'Labor Active' : 'Labor Disabled';
    this.laborFieldsBody.style.opacity = this.state.laborEnabled ? '1' : '0.4';

    this.state.laborHourlyRate = p.laborHourlyRate ?? 150.00;
    this.laborHourlyRate.value = this.state.laborHourlyRate.toFixed(2);

    this.state.prepTimeMinutes = p.prepTimeMinutes ?? 15;
    this.prepTimeMinutes.value = this.state.prepTimeMinutes;

    this.state.postTimeMinutes = p.postTimeMinutes ?? 15;
    this.postTimeMinutes.value = this.state.postTimeMinutes;

    this.state.wastePercent = p.wastePercent ?? 8;
    this.materialWasteSlider.value = this.state.wastePercent;
    this.materialWastePercent.value = this.state.wastePercent;

    this.state.failedPrintPercent = p.failedPrintPercent ?? 0;
    this.failedPrintSlider.value = this.state.failedPrintPercent;
    this.failedPrintAllowancePercent.value = this.state.failedPrintPercent;

    this.state.overheadPercent = p.overheadPercent ?? 5;
    this.overheadSlider.value = this.state.overheadPercent;
    this.overheadPercent.value = this.state.overheadPercent;

    this.state.profitPercent = p.profitPercent ?? 25;
    this.profitSlider.value = this.state.profitPercent;
    this.profitPercent.value = this.state.profitPercent;

    this.state.quantity = p.quantity ?? 1;
    this.partsQuantityInput.value = this.state.quantity;
    this.updateQtyPillsActive();

    this.render();
  }

  // ==========================================================================
  // CURRENCY SYMBOLS UPDATE
  // ==========================================================================
  updateCurrencySymbols() {
    const sym = Formatter.symbol(this.state.currency);
    document.querySelectorAll('.currency-symbol').forEach(el => {
      el.textContent = sym;
    });
  }

  // ==========================================================================
  // RENDER MASTER DISPATCHER
  // ==========================================================================
  render() {
    const calc = CalculationEngine.calculate(this.state);
    const curr = this.state.currency;

    // 1. Helpers & In-Card Footers
    const rawGrams = this.state.materialUsedGrams;
    const pricePerKg = this.state.materialPricePerGram * 1000;
    this.spoolPriceEquivalent.textContent = `Equivalent to ${Formatter.currency(pricePerKg, curr)} / 1kg spool`;
    this.massGramsHelper.textContent = `= ${Formatter.number(rawGrams, 2)} grams`;

    this.calculatedVolumeTag.textContent = `${Formatter.number(calc.volumeCm3, 1)} cm³`;

    // Time
    const totalMinutes = Math.round(calc.printHours * 60);
    this.totalHoursDecimalTag.textContent = `${Formatter.number(calc.printHours, 2)} hrs`;
    this.totalMinutesTag.textContent = `(${totalMinutes} mins)`;

    // Timeline Scale bar (up to 24h = 100%)
    const timelinePct = Math.min(100, (calc.printHours / 24) * 100);
    this.timelineFillBar.style.width = `${timelinePct}%`;
    const timeScaleDesc = calc.printHours < 2 ? 'Quick Print' : calc.printHours < 8 ? 'Medium Print' : calc.printHours < 16 ? 'Long Print' : 'Massive Build';
    this.timelineScaleText.textContent = `${timeScaleDesc} (${this.state.printHours}h ${this.state.printMinutes}m)`;

    // Machine Depreciation Helper
    this.calculatedDepreciationHelper.textContent = `= ${Formatter.currency(calc.machineHourlyCost, curr)} / operating hour`;
    this.energyConsumedHelper.textContent = `Total: ${Formatter.number(calc.energyKwh, 2)} kWh`;
    this.calculatedElectricityHelper.textContent = `= ${Formatter.currency(calc.electricityCost, curr)} energy cost`;
    this.calculatedMaintenanceHelper.textContent = `= ${Formatter.currency(calc.maintenanceCost, curr)} maintenance allocation`;

    // Labor
    const laborMins = Math.round(calc.laborHours * 60);
    this.totalLaborDurationTag.textContent = `${Formatter.number(calc.laborHours, 2)} hrs (${laborMins} mins)`;
    this.totalLaborCostTag.textContent = `= ${Formatter.currency(calc.laborCost, curr)}`;

    // Waste, Risk & Overhead Helpers
    this.wasteCostHelper.textContent = `= ${Formatter.currency(calc.wasteCost, curr)} waste`;
    this.failureCostHelper.textContent = `= ${Formatter.currency(calc.failureRiskCost, curr)} risk buffer`;
    this.overheadCostHelper.textContent = `= ${Formatter.currency(calc.overheadCost, curr)} overhead`;
    this.profitCostHelper.textContent = `= +${Formatter.currency(calc.profitCost, curr)} net profit`;

    // 2. Quick Top Statistics Cards
    this.quickStatMaterial.textContent = Formatter.currency(calc.materialCost, curr);
    this.quickStatMaterialHint.textContent = `${Formatter.number(calc.materialGrams, 0)}g @ ${Formatter.currency(calc.pricePerGram, curr)}/g`;

    this.quickStatMachine.textContent = Formatter.currency(calc.machineCost, curr);
    this.quickStatMachineHint.textContent = `${Formatter.number(calc.printHours, 1)}h @ ${Formatter.currency(calc.machineHourlyCost, curr)}/h`;

    this.quickStatTotal.textContent = Formatter.currency(calc.finalPrice, curr);
    this.quickStatUnitCost.textContent = `${Formatter.currency(calc.costPerPart, curr)} / part (Qty: ${calc.quantity})`;

    // 3. Central Grand Total & Margins
    this.grandTotalAmount.textContent = Formatter.number(calc.finalPrice, 2);
    this.costPerPartVal.textContent = Formatter.currency(calc.costPerPart, curr);
    this.netMarginTag.textContent = `+${Formatter.currency(calc.profitCost, curr)} (${calc.profitPct}%)`;

    // 4. Breakdown Bars & Percentages
    const finalTotal = Math.max(0.01, calc.finalPrice);

    const categories = [
      { key: 'material', val: calc.materialCost, fillEl: 'barMaterial', pctEl: 'pctMaterial', valEl: 'valMaterial' },
      { key: 'machine', val: calc.machineCost, fillEl: 'barMachine', pctEl: 'pctMachine', valEl: 'valMachine' },
      { key: 'electricity', val: calc.electricityCost, fillEl: 'barElectricity', pctEl: 'pctElectricity', valEl: 'valElectricity' },
      { key: 'labor', val: calc.laborCost, fillEl: 'barLabor', pctEl: 'pctLabor', valEl: 'valLabor' },
      { key: 'maintenance', val: calc.maintenanceCost, fillEl: 'barMaintenance', pctEl: 'pctMaintenance', valEl: 'valMaintenance' },
      { key: 'waste', val: calc.totalWasteAndRisk, fillEl: 'barWaste', pctEl: 'pctWaste', valEl: 'valWaste' },
      { key: 'overhead', val: calc.overheadCost, fillEl: 'barOverhead', pctEl: 'pctOverhead', valEl: 'valOverhead' },
      { key: 'profit', val: calc.profitCost, fillEl: 'barProfit', pctEl: 'pctProfit', valEl: 'valProfit' }
    ];

    categories.forEach(item => {
      const pct = (item.val / finalTotal) * 100;
      const fill = document.getElementById(item.fillEl);
      const pctTag = document.getElementById(item.pctEl);
      const valTag = document.getElementById(item.valEl);

      if (fill) fill.style.width = `${Math.min(100, Math.max(1, pct))}%`;
      if (pctTag) pctTag.textContent = `${Formatter.number(pct, 1)}%`;
      if (valTag) valTag.textContent = Formatter.currency(item.val, curr);
    });

    // 5. Financial Subtotals Matrix
    this.subtotalBaseCost.textContent = Formatter.currency(calc.baseCost, curr);
    this.subtotalCostBeforeProfit.textContent = Formatter.currency(calc.costBeforeProfit, curr);
    this.subtotalFinalPrice.textContent = Formatter.currency(calc.finalPrice, curr);
    this.subtotalPerPart.textContent = Formatter.currency(calc.costPerPart, curr);

    // 6. Interactive Donut Chart
    this.renderDonutChart(calc, categories);

    // 7. Print DNA Telemetry
    this.dnaLayerCount.textContent = Formatter.number(calc.estimatedLayers, 0);
    this.dnaFilamentLength.textContent = `${Formatter.number(calc.filamentLengthMeters, 1)} m`;
    this.dnaVolume.textContent = `${Formatter.number(calc.volumeCm3, 1)} cm³`;
    this.dnaEnergy.textContent = `${Formatter.number(calc.energyKwh, 2)} kWh`;

    // Update Simulation Text Counters
    this.updateSimulationVisuals(calc);

    // 8. Deterministic Smart Insights
    this.renderInsights(calc);

    // 9. Scenario Comparison Table
    this.renderScenarios();

    // 10. Saved Estimates
    this.renderHistory();

    // 11. Printable Invoice sync
    this.syncInvoiceData(calc);
  }

  // ==========================================================================
  // DONUT CHART RENDERING (SVG ARCS)
  // ==========================================================================
  renderDonutChart(calc, categories) {
    const finalTotal = Math.max(0.01, calc.finalPrice);
    const radius = 78;
    const circumference = 2 * Math.PI * radius; // ~490.088
    let currentOffset = 0;

    const colors = {
      material: '#06b6d4',
      machine: '#f59e0b',
      electricity: '#eab308',
      labor: '#3b82f6',
      maintenance: '#a855f7',
      waste: '#f43f5e',
      overhead: '#14b8a6',
      profit: '#10b981'
    };

    const names = {
      material: 'Material',
      machine: 'Machine Depreciation',
      electricity: 'Electricity',
      labor: 'Labor & Post-Process',
      maintenance: 'Maintenance',
      waste: 'Waste & Risk Buffer',
      overhead: 'Business Overhead',
      profit: 'Commercial Profit'
    };

    // Clear previous arcs
    this.donutArcsGroup.innerHTML = '';

    categories.forEach(item => {
      if (item.val <= 0.001) return;

      const pct = item.val / finalTotal;
      const strokeLength = pct * circumference;
      const strokeGap = circumference - strokeLength;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '100');
      circle.setAttribute('cy', '100');
      circle.setAttribute('r', radius.toString());
      circle.setAttribute('class', 'donut-segment');
      circle.setAttribute('stroke', colors[item.key] || '#94a3b8');
      circle.setAttribute('stroke-dasharray', `${strokeLength} ${strokeGap}`);
      circle.setAttribute('stroke-dashoffset', (-currentOffset).toString());
      circle.setAttribute('data-category', item.key);

      // Mouse Interactions
      circle.addEventListener('mouseenter', () => {
        this.highlightDonutCategory(item.key, {
          name: names[item.key],
          val: item.val,
          pct: pct * 100,
          color: colors[item.key]
        });
      });

      circle.addEventListener('mouseleave', () => {
        this.highlightDonutCategory(null);
      });

      this.donutArcsGroup.appendChild(circle);
      currentOffset += strokeLength;
    });

    // Reset center readout if no active hover
    if (!this.donutHoverCategory) {
      this.donutHoverTitle.textContent = 'TOTAL ESTIMATE';
      this.donutHoverValue.textContent = Formatter.currency(calc.finalPrice, this.state.currency);
      this.donutHoverSub.textContent = `100% • ${calc.quantity} ${calc.quantity === 1 ? 'part' : 'parts'}`;
    }
  }

  highlightDonutCategory(catKey, info = null) {
    this.donutHoverCategory = catKey;
    const segments = this.donutArcsGroup.querySelectorAll('.donut-segment');
    const rows = document.querySelectorAll('.breakdown-row');

    if (!catKey) {
      segments.forEach(s => {
        s.style.opacity = '1';
        s.setAttribute('stroke-width', '26');
      });
      rows.forEach(r => r.classList.remove('active'));

      const calc = CalculationEngine.calculate(this.state);
      this.donutHoverTitle.textContent = 'TOTAL ESTIMATE';
      this.donutHoverValue.textContent = Formatter.currency(calc.finalPrice, this.state.currency);
      this.donutHoverSub.textContent = `100% • ${calc.quantity} ${calc.quantity === 1 ? 'part' : 'parts'}`;
      return;
    }

    segments.forEach(s => {
      const match = s.getAttribute('data-category') === catKey;
      s.style.opacity = match ? '1' : '0.25';
      s.setAttribute('stroke-width', match ? '32' : '26');
    });

    rows.forEach(r => {
      r.classList.toggle('active', r.getAttribute('data-category') === catKey);
    });

    if (info) {
      this.donutHoverTitle.textContent = info.name.toUpperCase();
      this.donutHoverValue.textContent = Formatter.currency(info.val, this.state.currency);
      this.donutHoverSub.textContent = `${Formatter.number(info.pct, 1)}% of total`;
    }
  }

  // ==========================================================================
  // 3D PRINT LAYER SIMULATION ENGINE
  // ==========================================================================
  toggleSimulation() {
    if (this.state.isSimulating) {
      this.stopSimulation();
    } else {
      this.startSimulation();
    }
  }

  startSimulation() {
    this.state.isSimulating = true;
    this.simPlayBtnText.textContent = 'Pause';
    this.simPlayIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
    this.simStatusText.textContent = 'Printing...';

    const step = () => {
      if (!this.state.isSimulating) return;

      this.state.simProgress += 0.4;
      if (this.state.simProgress >= 100) {
        this.state.simProgress = 100;
        this.stopSimulation();
        this.simStatusText.textContent = 'Print Complete!';
      }

      this.simProgressSlider.value = this.state.simProgress;
      this.updateSimulationVisuals();

      if (this.state.isSimulating) {
        this.state.simAnimId = requestAnimationFrame(step);
      }
    };

    this.state.simAnimId = requestAnimationFrame(step);
  }

  stopSimulation() {
    this.state.isSimulating = false;
    if (this.state.simAnimId) cancelAnimationFrame(this.state.simAnimId);
    this.simPlayBtnText.textContent = 'Simulate';
    this.simPlayIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
    if (this.state.simProgress < 100) {
      this.simStatusText.textContent = `Paused (${this.state.simProgress.toFixed(0)}%)`;
    }
  }

  updateSimulationVisuals(calcParam = null) {
    const calc = calcParam || CalculationEngine.calculate(this.state);
    const progress = this.state.simProgress / 100;

    this.simSliderPercentText.textContent = `${this.state.simProgress.toFixed(0)}%`;

    // Dynamic Readouts
    const curLayers = Math.round(calc.estimatedLayers * progress);
    const curGrams = (calc.materialGrams * progress).toFixed(1);
    const totalMins = Math.round(calc.printHours * 60);
    const curMins = Math.round(totalMins * progress);
    const curH = Math.floor(curMins / 60);
    const curM = curMins % 60;

    this.simCurrentLayerText.textContent = `${curLayers} / ${calc.estimatedLayers}`;
    this.simCurrentMassText.textContent = `${curGrams} g / ${calc.materialGrams.toFixed(1)} g`;
    this.simCurrentTimeText.textContent = `${curH}h ${curM}m / ${this.state.printHours}h ${this.state.printMinutes}m`;

    // Build plate coordinates & SVG layer stack
    // Base plate at Y=150. Max height allows Y going from 148 down to 60.
    const maxLines = 18;
    const activeLines = Math.floor(progress * maxLines);
    this.simLayerStackGroup.innerHTML = '';

    const startX = 100;
    const endX = 220;
    const baseY = 148;
    const stepY = 4.5;

    for (let i = 0; i < activeLines; i++) {
      const y = baseY - (i * stepY);
      // Horizontal deposited layer
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', (startX + (i % 2 === 0 ? 0 : 4)).toString());
      line.setAttribute('y1', y.toString());
      line.setAttribute('x2', (endX - (i % 2 === 0 ? 0 : 4)).toString());
      line.setAttribute('y2', y.toString());
      line.setAttribute('stroke', 'url(#layerGrad)');
      line.setAttribute('stroke-width', '3.5');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('opacity', '0.85');
      this.simLayerStackGroup.appendChild(line);
    }

    // Nozzle Position
    // Oscillates X back and forth, and rises in Y
    const currentY = baseY - (activeLines * stepY) - 18;
    const oscillation = Math.sin(progress * 40 * Math.PI) * 50;
    const currentX = 160 + oscillation;

    this.simNozzleGroup.setAttribute('transform', `translate(${currentX}, ${Math.max(30, currentY)})`);

    // Gantry rail matches nozzle Y height
    const gantry = document.getElementById('simGantryRail');
    if (gantry) {
      const railY = Math.max(25, currentY - 5);
      gantry.setAttribute('y1', railY.toString());
      gantry.setAttribute('y2', railY.toString());
    }
  }

  // ==========================================================================
  // DETERMINISTIC COST INSIGHTS ENGINE
  // ==========================================================================
  renderInsights(calc) {
    const finalTotal = Math.max(0.01, calc.finalPrice);
    const insights = [];

    // 1. Material Dominance
    const matPct = (calc.materialCost / finalTotal) * 100;
    if (matPct >= 35) {
      insights.push({
        type: 'warning',
        icon: '🧵',
        title: 'Material is your largest cost driver',
        desc: `Raw spool consumption accounts for ${matPct.toFixed(1)}% of total estimate. Reducing infill density (e.g. 15% gyroid instead of 40% grid) or optimizing support placement will drastically lower print cost.`
      });
    }

    // 2. Machine Depreciation
    const machPct = (calc.machineCost / finalTotal) * 100;
    if (machPct >= 15) {
      insights.push({
        type: 'tip',
        icon: '⚙️',
        title: 'Significant machine wear & depreciation',
        desc: `Machine hardware wear contributes ${machPct.toFixed(1)}% (${Formatter.currency(calc.machineCost, this.state.currency)}). Maximizing machine operating lifespan beyond ${this.state.machineLifespanHours}h reduces your effective hourly equipment cost.`
      });
    }

    // 3. High Wastage Warning
    if (this.state.wastePercent >= 10 || this.state.failedPrintPercent > 0) {
      const totalWaste = calc.totalWasteAndRisk;
      insights.push({
        type: 'warning',
        icon: '⚠️',
        title: 'Elevated waste & failure allowance',
        desc: `Waste and contingency allowance adds ${Formatter.currency(totalWaste, this.state.currency)} to the job. Using organic tree supports and rigorous bed-leveling calibration minimizes discarded filament.`
      });
    }

    // 4. Batch Economy of Scale
    if (calc.quantity === 1 && calc.laborCost > 0) {
      insights.push({
        type: 'tip',
        icon: '📦',
        title: 'Batch production economy opportunity',
        desc: `Printing a single unit incurs full preparation and slicing setup costs (${Formatter.currency(calc.laborCost, this.state.currency)}). Slicing 5–20 parts per build plate will amortize labor across the batch, reducing per-part cost.`
      });
    } else if (calc.quantity > 5) {
      insights.push({
        type: 'success',
        icon: '✅',
        title: 'High batch efficiency active',
        desc: `Batch size of ${calc.quantity} parts efficiently amortizes setup labor and machine startup energy, lowering unit cost to ${Formatter.currency(calc.costPerPart, this.state.currency)}.`
      });
    }

    // 5. Commercial Profitability
    if (this.state.profitPercent < 15) {
      insights.push({
        type: 'warning',
        icon: '📉',
        title: 'Low profit margin buffer',
        desc: `Your current ${this.state.profitPercent}% margin may leave insufficient buffer for unforeseen client revisions or machine re-prints in commercial job fabrication.`
      });
    } else if (this.state.profitPercent >= 25) {
      insights.push({
        type: 'success',
        icon: '💼',
        title: 'Healthy commercial margin',
        desc: `A ${this.state.profitPercent}% margin generates ${Formatter.currency(calc.profitCost, this.state.currency)} in net earnings, suitable for sustainable rapid prototyping services.`
      });
    }

    // 6. Electricity
    const elecPct = (calc.electricityCost / finalTotal) * 100;
    if (elecPct < 4) {
      insights.push({
        type: 'tip',
        icon: '⚡',
        title: 'Energy cost is minor',
        desc: `Electricity represents only ${elecPct.toFixed(1)}% of total cost (${Formatter.currency(calc.electricityCost, this.state.currency)} for ${calc.energyKwh.toFixed(2)} kWh). Machine depreciation and raw material remain your key focus areas.`
      });
    }

    // Render HTML
    this.insightsContainer.innerHTML = '';
    insights.forEach(item => {
      const el = document.createElement('div');
      el.className = `insight-item insight-${item.type}`;
      el.innerHTML = `
        <span class="insight-icon">${item.icon}</span>
        <div class="insight-content">
          <strong class="insight-title">${item.title}</strong>
          <p class="insight-desc">${item.desc}</p>
        </div>
      `;
      this.insightsContainer.appendChild(el);
    });
  }

  // ==========================================================================
  // SCENARIO COMPARISON TABLE
  // ==========================================================================
  renderScenarios() {
    const curr = this.state.currency;

    const resA = CalculationEngine.calculate(this.state.scenarios.A);
    const resB = CalculationEngine.calculate(this.state.scenarios.B);
    const resC = CalculationEngine.calculate(this.state.scenarios.C);

    // Scenario A
    document.getElementById('scenA_material').textContent = `${this.state.scenarios.A.materialType} (${resA.materialGrams}g)`;
    document.getElementById('scenA_time').textContent = `${this.state.scenarios.A.printHours}h ${this.state.scenarios.A.printMinutes}m`;
    document.getElementById('scenA_matCost').textContent = Formatter.currency(resA.materialCost, curr);
    document.getElementById('scenA_machCost').textContent = Formatter.currency(resA.machineCost, curr);
    document.getElementById('scenA_energyMaint').textContent = Formatter.currency(resA.electricityCost + resA.maintenanceCost, curr);
    document.getElementById('scenA_labor').textContent = Formatter.currency(resA.laborCost, curr);
    document.getElementById('scenA_totalBase').textContent = Formatter.currency(resA.baseCost, curr);
    document.getElementById('scenA_profit').textContent = `${Formatter.currency(resA.profitCost, curr)} (${resA.profitPct}%)`;
    document.getElementById('scenA_final').innerHTML = `<span>${Formatter.currency(resA.finalPrice, curr)}</span>`;

    // Scenario B
    document.getElementById('scenB_material').textContent = `${this.state.scenarios.B.materialType} (${resB.materialGrams}g)`;
    document.getElementById('scenB_time').textContent = `${this.state.scenarios.B.printHours}h ${this.state.scenarios.B.printMinutes}m`;
    document.getElementById('scenB_matCost').textContent = Formatter.currency(resB.materialCost, curr);
    document.getElementById('scenB_machCost').textContent = Formatter.currency(resB.machineCost, curr);
    document.getElementById('scenB_energyMaint').textContent = Formatter.currency(resB.electricityCost + resB.maintenanceCost, curr);
    document.getElementById('scenB_labor').textContent = Formatter.currency(resB.laborCost, curr);
    document.getElementById('scenB_totalBase').textContent = Formatter.currency(resB.baseCost, curr);
    document.getElementById('scenB_profit').textContent = `${Formatter.currency(resB.profitCost, curr)} (${resB.profitPct}%)`;
    document.getElementById('scenB_final').innerHTML = `
      <span>${Formatter.currency(resB.finalPrice, curr)}</span>
      <span class="badge-mini-lowest">Lowest Cost</span>
    `;

    // Scenario C
    document.getElementById('scenC_material').textContent = `${this.state.scenarios.C.materialType} (${resC.materialGrams}g)`;
    document.getElementById('scenC_time').textContent = `${this.state.scenarios.C.printHours}h ${this.state.scenarios.C.printMinutes}m`;
    document.getElementById('scenC_matCost').textContent = Formatter.currency(resC.materialCost, curr);
    document.getElementById('scenC_machCost').textContent = Formatter.currency(resC.machineCost, curr);
    document.getElementById('scenC_energyMaint').textContent = Formatter.currency(resC.electricityCost + resC.maintenanceCost, curr);
    document.getElementById('scenC_labor').textContent = Formatter.currency(resC.laborCost, curr);
    document.getElementById('scenC_totalBase').textContent = Formatter.currency(resC.baseCost, curr);
    document.getElementById('scenC_profit').textContent = `${Formatter.currency(resC.profitCost, curr)} (${resC.profitPct}%)`;
    document.getElementById('scenC_final').innerHTML = `
      <span>${Formatter.currency(resC.finalPrice, curr)}</span>
      <span class="badge-mini-highest">Highest Margin</span>
    `;
  }

  applyScenario(key) {
    const scen = this.state.scenarios[key];
    if (!scen) return;

    this.loadPresetObject(scen);
    this.showToast(`Applied ${scen.name} to calculator`, 'success');
  }

  cloneCurrentToScenario() {
    const choice = prompt('Select scenario to overwrite with current parameters:\nEnter A, B, or C:', 'A');
    if (!choice) return;
    const upper = choice.toUpperCase().trim();
    if (['A', 'B', 'C'].includes(upper)) {
      this.state.scenarios[upper] = {
        materialType: this.state.materialType,
        materialPrice: this.state.materialPrice,
        priceUnit: this.state.priceUnit,
        materialQuantity: this.state.materialQuantity,
        massUnit: this.state.massUnit,
        density: this.state.density,
        printHours: this.state.printHours,
        printMinutes: this.state.printMinutes,
        printSeconds: this.state.printSeconds,
        machineRateMode: this.state.machineRateMode,
        machinePurchasePrice: this.state.machinePurchasePrice,
        machineLifespanHours: this.state.machineLifespanHours,
        manualMachineHourlyRate: this.state.manualMachineHourlyRate,
        powerWatts: this.state.powerWatts,
        powerUnit: this.state.powerUnit,
        electricityRate: this.state.electricityRatePerKwh,
        maintenanceRate: this.state.maintenanceRatePerHour,
        laborEnabled: this.state.laborEnabled,
        laborHourlyRate: this.state.laborHourlyRate,
        prepTimeMinutes: this.state.prepTimeMinutes,
        postTimeMinutes: this.state.postTimeMinutes,
        wastePercent: this.state.wastePercent,
        failedPrintPercent: this.state.failedPrintPercent,
        overheadPercent: this.state.overheadPercent,
        profitPercent: this.state.profitPercent,
        quantity: this.state.quantity,
        name: `Custom Scenario ${upper}`
      };
      this.renderScenarios();
      this.showToast(`Saved current settings into Scenario ${upper}!`, 'success');
    }
  }

  loadPresetObject(p) {
    this.state.materialType = p.materialType || 'PLA';
    this.materialTypeSelect.value = this.state.materialType;
    this.state.materialPrice = p.materialPrice ?? 1.80;
    this.materialPriceInput.value = this.state.materialPrice.toFixed(2);
    this.state.materialQuantity = p.materialQuantity ?? 125;
    this.materialQuantityInput.value = this.state.materialQuantity;
    this.state.density = p.density ?? 1.24;
    this.materialDensityInput.value = this.state.density;

    this.state.printHours = p.printHours ?? 6;
    this.printHoursInput.value = this.state.printHours;
    this.state.printMinutes = p.printMinutes ?? 30;
    this.printMinutesInput.value = this.state.printMinutes;

    this.state.wastePercent = p.wastePercent ?? 8;
    this.materialWasteSlider.value = this.state.wastePercent;
    this.materialWastePercent.value = this.state.wastePercent;

    this.state.profitPercent = p.profitPercent ?? 25;
    this.profitSlider.value = this.state.profitPercent;
    this.profitPercent.value = this.state.profitPercent;

    this.state.quantity = p.quantity ?? 1;
    this.partsQuantityInput.value = this.state.quantity;

    this.render();
  }

  // ==========================================================================
  // ESTIMATE HISTORY (LOCAL STORAGE)
  // ==========================================================================
  loadPersistedData() {
    try {
      const savedTheme = localStorage.getItem('printforge_theme');
      if (savedTheme) {
        this.state.theme = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      }

      const savedHistory = localStorage.getItem('printforge_estimates_v2');
      if (savedHistory) {
        this.state.history = JSON.parse(savedHistory);
      }
    } catch (e) {
      console.warn('Local storage not accessible:', e);
    }
  }

  persistHistory() {
    try {
      localStorage.setItem('printforge_estimates_v2', JSON.stringify(this.state.history));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }

  openSaveModal() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    this.saveEstimateNameInput.value = `${this.state.materialType} Part (${dateStr})`;
    this.saveEstimateNotesInput.value = `${this.state.materialQuantity}${this.state.massUnit}, ${this.state.printHours}h ${this.state.printMinutes}m runtime`;
    this.saveModalBackdrop.classList.add('active');
    this.saveEstimateNameInput.focus();
  }

  closeSaveModal() {
    this.saveModalBackdrop.classList.remove('active');
  }

  handleSaveEstimate() {
    const name = this.saveEstimateNameInput.value.trim() || 'Untitled 3D Print Job';
    const notes = this.saveEstimateNotesInput.value.trim();
    const calc = CalculationEngine.calculate(this.state);

    const record = {
      id: 'PF-' + Date.now().toString(36).toUpperCase(),
      name,
      notes,
      timestamp: new Date().toISOString(),
      materialType: this.state.materialType,
      materialQuantity: this.state.materialQuantity,
      massUnit: this.state.massUnit,
      printHours: this.state.printHours,
      printMinutes: this.state.printMinutes,
      finalPrice: calc.finalPrice,
      costPerPart: calc.costPerPart,
      quantity: calc.quantity,
      currency: this.state.currency,
      snapshotState: JSON.parse(JSON.stringify(this.state))
    };

    this.state.history.unshift(record);
    if (this.state.history.length > 50) this.state.history.pop();

    this.persistHistory();
    this.renderHistory();
    this.closeSaveModal();
    this.showToast(`Saved "${name}" to Estimate History!`, 'success');
  }

  renderHistory() {
    if (!this.state.history || this.state.history.length === 0) {
      this.emptyHistoryNotice.style.display = 'flex';
      // Remove other items
      const items = this.historyListContainer.querySelectorAll('.history-item');
      items.forEach(el => el.remove());
      return;
    }

    this.emptyHistoryNotice.style.display = 'none';
    const oldItems = this.historyListContainer.querySelectorAll('.history-item');
    oldItems.forEach(el => el.remove());

    this.state.history.forEach((item, idx) => {
      const date = new Date(item.timestamp);
      const timeStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

      const el = document.createElement('div');
      el.className = 'history-item';
      el.innerHTML = `
        <div class="hist-left">
          <strong class="hist-name">${this.escapeHtml(item.name)}</strong>
          <span class="hist-meta">${item.materialType} • ${item.printHours}h ${item.printMinutes}m • Qty: ${item.quantity} • ${timeStr}</span>
        </div>
        <div class="hist-right">
          <div class="hist-cost-block">
            <div class="hist-total">${Formatter.currency(item.finalPrice, item.currency || this.state.currency)}</div>
            <span class="hist-perpart">${Formatter.currency(item.costPerPart, item.currency || this.state.currency)}/part</span>
          </div>
          <div class="hist-actions">
            <button type="button" class="hist-btn" data-action="load" data-idx="${idx}" title="Load this estimate">🔄</button>
            <button type="button" class="hist-btn" data-action="duplicate" data-idx="${idx}" title="Duplicate">📋</button>
            <button type="button" class="hist-btn hist-btn-del" data-action="delete" data-idx="${idx}" title="Delete">🗑️</button>
          </div>
        </div>
      `;

      el.querySelector('[data-action="load"]').addEventListener('click', () => {
        this.loadHistoryItem(idx);
      });

      el.querySelector('[data-action="duplicate"]').addEventListener('click', () => {
        this.duplicateHistoryItem(idx);
      });

      el.querySelector('[data-action="delete"]').addEventListener('click', () => {
        this.deleteHistoryItem(idx);
      });

      this.historyListContainer.appendChild(el);
    });
  }

  loadHistoryItem(idx) {
    const item = this.state.history[idx];
    if (!item) return;

    if (item.snapshotState) {
      Object.assign(this.state, item.snapshotState);
      this.loadPresetObject(this.state);
      this.showToast(`Restored estimate: ${item.name}`, 'success');
    }
  }

  duplicateHistoryItem(idx) {
    const item = this.state.history[idx];
    if (!item) return;

    const dup = JSON.parse(JSON.stringify(item));
    dup.id = 'PF-' + Date.now().toString(36).toUpperCase();
    dup.name = `${item.name} (Copy)`;
    dup.timestamp = new Date().toISOString();

    this.state.history.unshift(dup);
    this.persistHistory();
    this.renderHistory();
    this.showToast(`Duplicated "${item.name}"`, 'success');
  }

  deleteHistoryItem(idx) {
    const item = this.state.history[idx];
    this.state.history.splice(idx, 1);
    this.persistHistory();
    this.renderHistory();
    this.showToast(`Deleted "${item?.name || 'Estimate'}"`, 'warning');
  }

  // ==========================================================================
  // INVOICE / EXPORT MODAL SYNC
  // ==========================================================================
  openExportModal() {
    this.syncInvoiceData();
    this.exportModalBackdrop.classList.add('active');
  }

  closeExportModal() {
    this.exportModalBackdrop.classList.remove('active');
  }

  syncInvoiceData(calcParam = null) {
    const calc = calcParam || CalculationEngine.calculate(this.state);
    const curr = this.state.currency;

    const now = new Date();
    document.getElementById('invDate').textContent = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    document.getElementById('invMaterial').textContent = `${this.state.materialType} (${calc.materialGrams.toFixed(1)} g)`;
    document.getElementById('invDuration').textContent = `${this.state.printHours}h ${this.state.printMinutes}m`;
    document.getElementById('invQuantity').textContent = `${calc.quantity} ${calc.quantity === 1 ? 'Part' : 'Parts'}`;
    document.getElementById('invEnergy').textContent = `${calc.energyKwh.toFixed(2)} kWh`;

    // Itemized Lines
    document.getElementById('invLineMaterialUnit').textContent = `${(calc.materialGrams * (1 + this.state.wastePercent / 100)).toFixed(1)}g gross`;
    document.getElementById('invLineMaterialCost').textContent = Formatter.currency(calc.materialCost + calc.wasteCost, curr);

    document.getElementById('invLineMachineUnit').textContent = `${calc.printHours.toFixed(2)} hrs`;
    document.getElementById('invLineMachineCost').textContent = Formatter.currency(calc.machineCost, curr);

    document.getElementById('invLineEnergyUnit').textContent = `${calc.energyKwh.toFixed(2)} kWh`;
    document.getElementById('invLineEnergyCost').textContent = Formatter.currency(calc.electricityCost, curr);

    document.getElementById('invLineLaborUnit').textContent = `${calc.laborHours.toFixed(2)} hrs`;
    document.getElementById('invLineLaborCost').textContent = Formatter.currency(calc.laborCost, curr);

    document.getElementById('invLineMaintUnit').textContent = `${calc.printHours.toFixed(2)} hrs`;
    document.getElementById('invLineMaintCost').textContent = Formatter.currency(calc.maintenanceCost, curr);

    document.getElementById('invBaseCost').textContent = Formatter.currency(calc.baseCost, curr);
    document.getElementById('invOverheadPct').textContent = `${calc.overheadPct.toFixed(1)}%`;
    document.getElementById('invOverheadCost').textContent = Formatter.currency(calc.overheadCost, curr);

    document.getElementById('invCostBeforeProfit').textContent = Formatter.currency(calc.costBeforeProfit, curr);
    document.getElementById('invProfitPct').textContent = `${calc.profitPct.toFixed(1)}%`;
    document.getElementById('invProfitCost').textContent = `+${Formatter.currency(calc.profitCost, curr)}`;

    document.getElementById('invFinalTotal').textContent = Formatter.currency(calc.finalPrice, curr);
    document.getElementById('invUnitCost').textContent = `${Formatter.currency(calc.costPerPart, curr)} / part`;
  }

  handleCopySummary() {
    const calc = CalculationEngine.calculate(this.state);
    const curr = this.state.currency;
    const name = this.invEstimateName.value || '3D Print Cost Estimate';

    const summaryText = `================================================
PRINTFORGE — 3D PRINT COST ESTIMATE
================================================
Job: ${name}
Date: ${new Date().toLocaleDateString()}
Material: ${this.state.materialType} (${calc.materialGrams}g)
Print Time: ${this.state.printHours}h ${this.state.printMinutes}m
Batch Quantity: ${calc.quantity} unit(s)

COST BREAKDOWN:
- Material Spool Cost: ${Formatter.currency(calc.materialCost, curr)}
- Machine Depreciation: ${Formatter.currency(calc.machineCost, curr)}
- Electrical Energy: ${Formatter.currency(calc.electricityCost, curr)}
- Labor & Prep: ${Formatter.currency(calc.laborCost, curr)}
- Machine Maintenance: ${Formatter.currency(calc.maintenanceCost, curr)}
- Wastage Allowance: ${Formatter.currency(calc.totalWasteAndRisk, curr)}
- Business Overhead: ${Formatter.currency(calc.overheadCost, curr)}
- Commercial Profit: ${Formatter.currency(calc.profitCost, curr)} (${calc.profitPct}%)
------------------------------------------------
TOTAL FINAL PRICE: ${Formatter.currency(calc.finalPrice, curr)}
PRICE PER PART: ${Formatter.currency(calc.costPerPart, curr)}
================================================`;

    navigator.clipboard.writeText(summaryText).then(() => {
      this.showToast('Summary copied to clipboard!', 'success');
    }).catch(() => {
      this.showToast('Copied text to clipboard');
    });
  }

  handleDownloadJson() {
    const calc = CalculationEngine.calculate(this.state);
    const exportData = {
      app: 'PrintForge 3D Printing Cost Calculator',
      version: '2.4 Pro',
      exportedAt: new Date().toISOString(),
      jobName: this.invEstimateName.value || 'Estimate',
      client: this.invClientName.value || 'Client',
      parameters: this.state,
      calculations: calc
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PrintForge-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast('Downloaded estimate JSON configuration', 'success');
  }

  // ==========================================================================
  // TOAST NOTIFICATION UTILITY
  // ==========================================================================
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'warning' ? '⚠' : 'ℹ';
    toast.innerHTML = `<span>${icon}</span> <span>${this.escapeHtml(message)}</span>`;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s, transform 0.3s';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// ============================================================================
// BOOTSTRAP INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  window.PrintForge = new PrintForgeApp();
});
