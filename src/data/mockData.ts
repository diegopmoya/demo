import { 
  Project, 
  Piece, 
  Machine, 
  InventoryItem, 
  QualityInspection,
  Alert,
  Operator,
  DailyProduction,
  ProductionMetrics,
  ScheduleEvent
} from '@/types'

// ============================================
// PROYECTOS
// ============================================
export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    code: 'PMC-2024-001',
    name: 'Puente Metálico Concepción',
    client: 'MOP - Dirección de Vialidad',
    description: 'Estructura metálica para puente vehicular de 120m de longitud',
    status: 'in_progress',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    progress: 67,
    totalPieces: 245,
    completedPieces: 164,
    budget: 850000000,
    actualCost: 520000000,
    manager: 'Carlos Mendoza',
    priority: 'high',
    createdAt: '2024-01-10',
    updatedAt: '2024-02-15'
  },
  {
    id: 'proj-002',
    code: 'NAV-2024-002',
    name: 'Nave Industrial Quilicura',
    client: 'Logistics Corp Chile',
    description: 'Estructura para bodega de 5000m² con puente grúa',
    status: 'in_progress',
    startDate: '2024-02-01',
    endDate: '2024-05-15',
    progress: 45,
    totalPieces: 180,
    completedPieces: 81,
    budget: 420000000,
    actualCost: 180000000,
    manager: 'María Torres',
    priority: 'medium',
    createdAt: '2024-01-25',
    updatedAt: '2024-02-14'
  },
  {
    id: 'proj-003',
    code: 'EST-2024-003',
    name: 'Estadio Regional Talca',
    client: 'Municipalidad de Talca',
    description: 'Estructura metálica para graderías y techumbre',
    status: 'planning',
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    progress: 12,
    totalPieces: 520,
    completedPieces: 62,
    budget: 1200000000,
    actualCost: 95000000,
    manager: 'Roberto Sánchez',
    priority: 'high',
    createdAt: '2024-02-01',
    updatedAt: '2024-02-15'
  },
  {
    id: 'proj-004',
    code: 'TOR-2024-004',
    name: 'Torre Telecomunicaciones Antofagasta',
    client: 'TelcoNorte S.A.',
    description: 'Torre autosoportada de 60m para antenas',
    status: 'in_progress',
    startDate: '2024-01-20',
    endDate: '2024-03-30',
    progress: 89,
    totalPieces: 85,
    completedPieces: 76,
    budget: 180000000,
    actualCost: 155000000,
    manager: 'Ana Gutiérrez',
    priority: 'critical',
    createdAt: '2024-01-15',
    updatedAt: '2024-02-15'
  },
  {
    id: 'proj-005',
    code: 'PAS-2024-005',
    name: 'Pasarela Peatonal Metro',
    client: 'Metro de Santiago',
    description: 'Pasarela de conexión entre estaciones',
    status: 'completed',
    startDate: '2023-10-01',
    endDate: '2024-01-31',
    progress: 100,
    totalPieces: 95,
    completedPieces: 95,
    budget: 150000000,
    actualCost: 142000000,
    manager: 'Pedro Vargas',
    priority: 'medium',
    createdAt: '2023-09-15',
    updatedAt: '2024-01-31'
  }
]

// ============================================
// PIEZAS
// ============================================
export const mockPieces: Piece[] = [
  {
    id: 'piece-001',
    projectId: 'proj-001',
    code: 'VG-001',
    name: 'Viga Principal HEB-600',
    description: 'Viga principal de tablero',
    material: 'Acero A572 Gr.50',
    weight: 2450,
    quantity: 8,
    completedQuantity: 6,
    status: 'in_progress',
    currentProcess: 'welding',
    processes: [],
    specifications: {
      length: 15000,
      width: 300,
      height: 600,
      thickness: 25,
      grade: 'A572 Gr.50',
      finish: 'Pintura anticorrosiva',
      coating: 'Galvanizado en caliente'
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-02-15'
  },
  {
    id: 'piece-002',
    projectId: 'proj-001',
    code: 'TR-001',
    name: 'Travesaño IPE-400',
    description: 'Travesaño de arriostramiento',
    material: 'Acero A36',
    weight: 850,
    quantity: 24,
    completedQuantity: 18,
    status: 'in_progress',
    currentProcess: 'drilling',
    processes: [],
    specifications: {
      length: 8000,
      height: 400,
      thickness: 15,
      grade: 'A36'
    },
    createdAt: '2024-01-16',
    updatedAt: '2024-02-14'
  },
  {
    id: 'piece-003',
    projectId: 'proj-001',
    code: 'PL-001',
    name: 'Placa Base 800x800',
    description: 'Placa de anclaje para columna',
    material: 'Acero A572 Gr.50',
    weight: 320,
    quantity: 16,
    completedQuantity: 16,
    status: 'completed',
    processes: [],
    specifications: {
      length: 800,
      width: 800,
      thickness: 50,
      grade: 'A572 Gr.50'
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-02-10'
  },
  {
    id: 'piece-004',
    projectId: 'proj-002',
    code: 'COL-001',
    name: 'Columna W14x120',
    description: 'Columna principal nave',
    material: 'Acero A992',
    weight: 1780,
    quantity: 12,
    completedQuantity: 8,
    status: 'in_progress',
    currentProcess: 'painting',
    processes: [],
    specifications: {
      length: 12000,
      grade: 'A992',
      finish: 'Pintura intumescente'
    },
    createdAt: '2024-02-01',
    updatedAt: '2024-02-15'
  },
  {
    id: 'piece-005',
    projectId: 'proj-004',
    code: 'SEC-001',
    name: 'Sección Torre L150x150',
    description: 'Sección angular para torre',
    material: 'Acero A36 Galvanizado',
    weight: 450,
    quantity: 32,
    completedQuantity: 30,
    status: 'quality_check',
    processes: [],
    specifications: {
      length: 6000,
      thickness: 12,
      grade: 'A36',
      coating: 'Galvanizado en caliente'
    },
    createdAt: '2024-01-20',
    updatedAt: '2024-02-15'
  }
]

// ============================================
// MÁQUINAS
// ============================================
export const mockMachines: Machine[] = [
  {
    id: 'mach-001',
    code: 'CNC-PL-01',
    name: 'Messer EdgeMax 3015',
    type: 'cnc_plasma',
    status: 'operational',
    location: 'Nave Principal - Zona A',
    capacity: 85,
    currentJob: 'piece-001',
    efficiency: 92,
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-03-01',
    operationalHours: 12450,
    specifications: {
      maxCapacity: 50,
      workArea: '3000x15000mm',
      powerRequirements: '480V 3F',
      manufacturer: 'Messer Cutting Systems',
      model: 'EdgeMax 3015',
      year: 2021
    }
  },
  {
    id: 'mach-002',
    code: 'CNC-DR-01',
    name: 'Ficep Endeavour 1003D',
    type: 'cnc_drill',
    status: 'operational',
    location: 'Nave Principal - Zona B',
    capacity: 72,
    currentJob: 'piece-002',
    efficiency: 88,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-28',
    operationalHours: 8920,
    specifications: {
      maxCapacity: 40,
      workArea: '1200x1200mm',
      manufacturer: 'Ficep',
      model: 'Endeavour 1003D',
      year: 2020
    }
  },
  {
    id: 'mach-003',
    code: 'PRS-BR-01',
    name: 'Trumpf TruBend 5130',
    type: 'press_brake',
    status: 'maintenance',
    location: 'Nave Principal - Zona C',
    capacity: 0,
    efficiency: 95,
    lastMaintenance: '2024-02-14',
    nextMaintenance: '2024-02-16',
    operationalHours: 15680,
    specifications: {
      maxCapacity: 130,
      workArea: '3000mm',
      manufacturer: 'Trumpf',
      model: 'TruBend 5130',
      year: 2019
    }
  },
  {
    id: 'mach-004',
    code: 'WLD-ST-01',
    name: 'Lincoln PowerWave S500',
    type: 'welding_station',
    status: 'operational',
    location: 'Nave Principal - Zona D',
    capacity: 65,
    currentJob: 'piece-001',
    efficiency: 91,
    lastMaintenance: '2024-02-05',
    nextMaintenance: '2024-03-05',
    operationalHours: 6780,
    specifications: {
      manufacturer: 'Lincoln Electric',
      model: 'PowerWave S500',
      year: 2022
    }
  },
  {
    id: 'mach-005',
    code: 'PNT-BT-01',
    name: 'Cabina Pintura Industrial',
    type: 'paint_booth',
    status: 'operational',
    location: 'Nave Secundaria - Zona A',
    capacity: 50,
    currentJob: 'piece-004',
    efficiency: 87,
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-02-20',
    operationalHours: 4520,
    specifications: {
      workArea: '15000x4000x5000mm',
      manufacturer: 'GFS',
      model: 'Ultra XL',
      year: 2021
    }
  },
  {
    id: 'mach-006',
    code: 'CNC-LS-01',
    name: 'Trumpf TruLaser 3030',
    type: 'cnc_laser',
    status: 'error',
    location: 'Nave Principal - Zona A',
    capacity: 0,
    efficiency: 94,
    lastMaintenance: '2024-02-10',
    nextMaintenance: '2024-03-10',
    operationalHours: 3250,
    specifications: {
      maxCapacity: 30,
      workArea: '3000x1500mm',
      manufacturer: 'Trumpf',
      model: 'TruLaser 3030',
      year: 2023
    }
  }
]

// ============================================
// INVENTARIO
// ============================================
export const mockInventory: InventoryItem[] = [
  {
    id: 'inv-001',
    code: 'ACE-A572-25',
    name: 'Plancha Acero A572 Gr.50 - 25mm',
    category: 'raw_material',
    type: 'Plancha',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: 'unidades',
    location: 'Bodega Principal - Rack A1',
    supplier: 'CAP Acero',
    unitCost: 850000,
    lastRestocked: '2024-02-10',
    specifications: {
      grade: 'A572 Gr.50',
      thickness: 25,
      width: 1500,
      length: 6000,
      weight: 1766
    }
  },
  {
    id: 'inv-002',
    code: 'ACE-A36-12',
    name: 'Plancha Acero A36 - 12mm',
    category: 'raw_material',
    type: 'Plancha',
    currentStock: 12,
    minStock: 25,
    maxStock: 80,
    unit: 'unidades',
    location: 'Bodega Principal - Rack A2',
    supplier: 'CAP Acero',
    unitCost: 420000,
    lastRestocked: '2024-01-25',
    specifications: {
      grade: 'A36',
      thickness: 12,
      width: 1500,
      length: 6000,
      weight: 848
    }
  },
  {
    id: 'inv-003',
    code: 'HEB-600',
    name: 'Perfil HEB 600',
    category: 'raw_material',
    type: 'Perfil',
    currentStock: 28,
    minStock: 15,
    maxStock: 50,
    unit: 'barras 12m',
    location: 'Patio - Zona Perfiles',
    supplier: 'ArcelorMittal',
    unitCost: 2850000,
    lastRestocked: '2024-02-05',
    specifications: {
      grade: 'S355JR',
      length: 12000,
      weight: 2120
    }
  },
  {
    id: 'inv-004',
    code: 'SOL-E7018-4',
    name: 'Electrodo E7018 - 4mm',
    category: 'consumable',
    type: 'Soldadura',
    currentStock: 150,
    minStock: 100,
    maxStock: 500,
    unit: 'kg',
    location: 'Bodega Consumibles - Estante B1',
    supplier: 'Lincoln Electric',
    unitCost: 8500,
    lastRestocked: '2024-02-12'
  },
  {
    id: 'inv-005',
    code: 'PIN-ANT-GR',
    name: 'Pintura Anticorrosiva Gris',
    category: 'consumable',
    type: 'Pintura',
    currentStock: 85,
    minStock: 50,
    maxStock: 200,
    unit: 'galones',
    location: 'Bodega Pintura - Estante A1',
    supplier: 'Sherwin Williams',
    unitCost: 45000,
    lastRestocked: '2024-02-08'
  },
  {
    id: 'inv-006',
    code: 'BRO-TCT-200',
    name: 'Broca TCT Ø200mm',
    category: 'tool',
    type: 'Herramienta',
    currentStock: 3,
    minStock: 5,
    maxStock: 15,
    unit: 'unidades',
    location: 'Pañol - Gabinete H1',
    supplier: 'Dormer Pramet',
    unitCost: 285000,
    lastRestocked: '2024-01-20'
  },
  {
    id: 'inv-007',
    code: 'GAS-ARG-C10',
    name: 'Gas Argón - Cilindro 10m³',
    category: 'consumable',
    type: 'Gas',
    currentStock: 8,
    minStock: 10,
    maxStock: 30,
    unit: 'cilindros',
    location: 'Patio Gases',
    supplier: 'Indura',
    unitCost: 125000,
    lastRestocked: '2024-02-01'
  }
]

// ============================================
// INSPECCIONES DE CALIDAD
// ============================================
export const mockQualityInspections: QualityInspection[] = [
  {
    id: 'qi-001',
    pieceId: 'piece-001',
    type: 'dimensional',
    status: 'passed',
    inspector: 'Juan Pérez',
    inspectionDate: '2024-02-14',
    overallScore: 96,
    checkpoints: [
      {
        id: 'cp-001',
        name: 'Longitud Total',
        parameter: 'Longitud',
        expectedValue: '15000mm',
        actualValue: '15002mm',
        tolerance: '±5mm',
        passed: true
      },
      {
        id: 'cp-002',
        name: 'Altura Viga',
        parameter: 'Altura',
        expectedValue: '600mm',
        actualValue: '599mm',
        tolerance: '±2mm',
        passed: true
      },
      {
        id: 'cp-003',
        name: 'Perpendicularidad',
        parameter: 'Ángulo',
        expectedValue: '90°',
        actualValue: '89.8°',
        tolerance: '±0.5°',
        passed: true
      }
    ],
    notes: 'Pieza dentro de tolerancias'
  },
  {
    id: 'qi-002',
    pieceId: 'piece-005',
    type: 'visual',
    status: 'pending',
    inspector: 'María González',
    inspectionDate: '2024-02-15',
    checkpoints: [
      {
        id: 'cp-004',
        name: 'Acabado Superficial',
        parameter: 'Visual',
        expectedValue: 'Sin defectos',
        passed: undefined
      },
      {
        id: 'cp-005',
        name: 'Soldaduras',
        parameter: 'Visual',
        expectedValue: 'Cordón uniforme',
        passed: undefined
      }
    ]
  },
  {
    id: 'qi-003',
    pieceId: 'piece-002',
    type: 'structural',
    status: 'conditional',
    inspector: 'Carlos Ruiz',
    inspectionDate: '2024-02-13',
    overallScore: 78,
    checkpoints: [
      {
        id: 'cp-006',
        name: 'Ensayo Ultrasonido',
        parameter: 'UT',
        expectedValue: 'Sin discontinuidades',
        actualValue: 'Porosidad menor detectada',
        passed: false,
        notes: 'Requiere reparación menor'
      }
    ],
    notes: 'Aprobado con condición de reparación'
  }
]

// ============================================
// ALERTAS
// ============================================
export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'machine_error',
    severity: 'critical',
    title: 'Error en CNC Láser',
    message: 'Falla en sistema de refrigeración. Máquina detenida automáticamente.',
    source: 'CNC-LS-01',
    sourceId: 'mach-006',
    timestamp: '2024-02-15T08:45:00',
    acknowledged: false,
    resolved: false
  },
  {
    id: 'alert-002',
    type: 'inventory_low',
    severity: 'warning',
    title: 'Stock Bajo - Plancha A36 12mm',
    message: 'Nivel de inventario por debajo del mínimo. Stock actual: 12 unidades (Mín: 25)',
    source: 'Inventario',
    sourceId: 'inv-002',
    timestamp: '2024-02-15T07:00:00',
    acknowledged: true,
    acknowledgedBy: 'Sistema',
    acknowledgedAt: '2024-02-15T07:00:00',
    resolved: false
  },
  {
    id: 'alert-003',
    type: 'deadline_approaching',
    severity: 'warning',
    title: 'Fecha límite próxima - Torre Antofagasta',
    message: 'Proyecto TOR-2024-004 vence en 43 días. Progreso actual: 89%',
    source: 'Proyectos',
    sourceId: 'proj-004',
    timestamp: '2024-02-15T06:00:00',
    acknowledged: true,
    acknowledgedBy: 'Ana Gutiérrez',
    acknowledgedAt: '2024-02-15T09:30:00',
    resolved: false
  },
  {
    id: 'alert-004',
    type: 'maintenance_due',
    severity: 'info',
    title: 'Mantenimiento Programado - Plegadora',
    message: 'Mantenimiento preventivo en progreso. Tiempo estimado: 2 días.',
    source: 'PRS-BR-01',
    sourceId: 'mach-003',
    timestamp: '2024-02-14T16:00:00',
    acknowledged: true,
    acknowledgedBy: 'Mantención',
    acknowledgedAt: '2024-02-14T16:05:00',
    resolved: false
  },
  {
    id: 'alert-005',
    type: 'quality_issue',
    severity: 'warning',
    title: 'Defecto Detectado - Travesaño TR-001',
    message: 'Porosidad detectada en soldadura. Requiere reparación antes de continuar.',
    source: 'Control Calidad',
    sourceId: 'piece-002',
    timestamp: '2024-02-13T14:30:00',
    acknowledged: true,
    acknowledgedBy: 'Carlos Ruiz',
    acknowledgedAt: '2024-02-13T14:35:00',
    resolved: false
  },
  {
    id: 'alert-006',
    type: 'inventory_low',
    severity: 'error',
    title: 'Stock Crítico - Broca TCT Ø200mm',
    message: 'Stock por debajo del crítico. Solo 3 unidades disponibles.',
    source: 'Inventario',
    sourceId: 'inv-006',
    timestamp: '2024-02-15T09:00:00',
    acknowledged: false,
    resolved: false
  }
]

// ============================================
// OPERADORES
// ============================================
export const mockOperators: Operator[] = [
  {
    id: 'op-001',
    employeeId: 'EMP-2018-045',
    name: 'Roberto Muñoz',
    role: 'operator',
    department: 'Corte CNC',
    shift: 'morning',
    skills: ['Corte Plasma', 'Corte Láser', 'CAD/CAM'],
    certifications: ['AWS D1.1', 'Operador CNC Nivel 3'],
    status: 'active',
    assignedMachine: 'mach-001',
    performanceRating: 94
  },
  {
    id: 'op-002',
    employeeId: 'EMP-2019-078',
    name: 'Carmen Silva',
    role: 'operator',
    department: 'Soldadura',
    shift: 'morning',
    skills: ['Soldadura MIG', 'Soldadura TIG', 'Soldadura Arco'],
    certifications: ['AWS D1.1', 'AWS D1.5', '3G/4G'],
    status: 'active',
    assignedMachine: 'mach-004',
    performanceRating: 97
  },
  {
    id: 'op-003',
    employeeId: 'EMP-2020-112',
    name: 'Miguel Soto',
    role: 'quality_inspector',
    department: 'Control de Calidad',
    shift: 'morning',
    skills: ['Inspección Visual', 'Ultrasonido', 'Tintes Penetrantes'],
    certifications: ['ASNT Level II UT', 'ASNT Level II PT', 'AWS CWI'],
    status: 'active',
    performanceRating: 92
  },
  {
    id: 'op-004',
    employeeId: 'EMP-2017-023',
    name: 'Patricia Vega',
    role: 'supervisor',
    department: 'Producción',
    shift: 'morning',
    skills: ['Gestión Producción', 'Lean Manufacturing', 'Six Sigma'],
    certifications: ['Six Sigma Green Belt', 'PMP'],
    status: 'active',
    performanceRating: 96
  },
  {
    id: 'op-005',
    employeeId: 'EMP-2021-156',
    name: 'Andrés Figueroa',
    role: 'maintenance',
    department: 'Mantención',
    shift: 'afternoon',
    skills: ['Mantención CNC', 'Hidráulica', 'Neumática', 'PLC'],
    certifications: ['Técnico Electromecánico'],
    status: 'active',
    performanceRating: 89
  }
]

// ============================================
// MÉTRICAS DE PRODUCCIÓN
// ============================================
export const mockProductionMetrics: ProductionMetrics = {
  oee: 78.5,
  availability: 89.2,
  performance: 92.1,
  quality: 95.5,
  throughput: 145,
  cycleTime: 42,
  defectRate: 2.3,
  onTimeDelivery: 94.5
}

// ============================================
// PRODUCCIÓN DIARIA
// ============================================
export const mockDailyProduction: DailyProduction[] = [
  { date: '2024-02-09', planned: 150, actual: 142, efficiency: 94.7, defects: 3 },
  { date: '2024-02-10', planned: 150, actual: 156, efficiency: 104.0, defects: 2 },
  { date: '2024-02-11', planned: 150, actual: 148, efficiency: 98.7, defects: 4 },
  { date: '2024-02-12', planned: 160, actual: 155, efficiency: 96.9, defects: 3 },
  { date: '2024-02-13', planned: 160, actual: 162, efficiency: 101.3, defects: 1 },
  { date: '2024-02-14', planned: 155, actual: 149, efficiency: 96.1, defects: 5 },
  { date: '2024-02-15', planned: 155, actual: 145, efficiency: 93.5, defects: 2 }
]

// ============================================
// EVENTOS DE PROGRAMACIÓN
// ============================================
export const mockScheduleEvents: ScheduleEvent[] = [
  {
    id: 'sch-001',
    type: 'production',
    title: 'Corte Vigas HEB-600',
    machineId: 'mach-001',
    start: '2024-02-15T08:00:00',
    end: '2024-02-15T14:00:00',
    pieceId: 'piece-001',
    projectId: 'proj-001',
    status: 'in_progress',
    priority: 1
  },
  {
    id: 'sch-002',
    type: 'production',
    title: 'Perforación Travesaños',
    machineId: 'mach-002',
    start: '2024-02-15T08:00:00',
    end: '2024-02-15T12:00:00',
    pieceId: 'piece-002',
    projectId: 'proj-001',
    status: 'in_progress',
    priority: 2
  },
  {
    id: 'sch-003',
    type: 'maintenance',
    title: 'Mantenimiento Preventivo',
    machineId: 'mach-003',
    start: '2024-02-14T16:00:00',
    end: '2024-02-16T16:00:00',
    status: 'in_progress',
    priority: 1
  },
  {
    id: 'sch-004',
    type: 'production',
    title: 'Soldadura Vigas',
    machineId: 'mach-004',
    start: '2024-02-15T14:00:00',
    end: '2024-02-15T20:00:00',
    pieceId: 'piece-001',
    projectId: 'proj-001',
    status: 'scheduled',
    priority: 1
  },
  {
    id: 'sch-005',
    type: 'production',
    title: 'Pintura Columnas',
    machineId: 'mach-005',
    start: '2024-02-15T09:00:00',
    end: '2024-02-15T17:00:00',
    pieceId: 'piece-004',
    projectId: 'proj-002',
    status: 'in_progress',
    priority: 2
  }
]
