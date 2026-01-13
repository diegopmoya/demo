// ============================================
// TIPOS PRINCIPALES DEL SISTEMA MES STEELGO
// ============================================

// --- Tipos de Estado ---
export type ProjectStatus = 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled'
export type PieceStatus = 'pending' | 'in_progress' | 'completed' | 'quality_check' | 'approved' | 'rejected'
export type ProcessStatus = 'pending' | 'in_progress' | 'completed' | 'paused'
export type MachineStatus = 'operational' | 'maintenance' | 'error' | 'idle'
export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical'
export type QualityStatus = 'pending' | 'passed' | 'failed' | 'conditional'

// --- Entidades Principales ---
export interface Project {
  id: string
  code: string
  name: string
  client: string
  description?: string
  status: ProjectStatus
  startDate: string
  endDate: string
  progress: number
  totalPieces: number
  completedPieces: number
  budget?: number
  actualCost?: number
  manager?: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  createdAt: string
  updatedAt: string
}

export interface Piece {
  id: string
  projectId: string
  code: string
  name: string
  description?: string
  material: string
  weight: number
  quantity: number
  completedQuantity: number
  status: PieceStatus
  processes: Process[]
  currentProcess?: string
  specifications?: PieceSpecifications
  createdAt: string
  updatedAt: string
}

export interface PieceSpecifications {
  length?: number
  width?: number
  height?: number
  thickness?: number
  grade?: string
  finish?: string
  coating?: string
  tolerances?: string
  drawings?: string[]
}

export interface Process {
  id: string
  pieceId: string
  name: string
  type: ProcessType
  sequence: number
  status: ProcessStatus
  machineId?: string
  operatorId?: string
  plannedDuration: number
  actualDuration?: number
  startTime?: string
  endTime?: string
  parameters?: ProcessParameters
  notes?: string
}

export type ProcessType = 
  | 'cutting'
  | 'drilling'
  | 'welding'
  | 'bending'
  | 'painting'
  | 'assembly'
  | 'quality_control'
  | 'packaging'
  | 'shipping'

export interface ProcessParameters {
  temperature?: number
  pressure?: number
  speed?: number
  current?: number
  voltage?: number
  feedRate?: number
  toolId?: string
  [key: string]: unknown
}

// --- Máquinas y Equipos ---
export interface Machine {
  id: string
  code: string
  name: string
  type: MachineType
  status: MachineStatus
  location: string
  capacity?: number
  currentJob?: string
  efficiency: number
  lastMaintenance?: string
  nextMaintenance?: string
  operationalHours: number
  specifications?: MachineSpecifications
}

export type MachineType = 
  | 'cnc_plasma'
  | 'cnc_laser'
  | 'cnc_drill'
  | 'press_brake'
  | 'welding_station'
  | 'paint_booth'
  | 'crane'
  | 'conveyor'

export interface MachineSpecifications {
  maxCapacity?: number
  workArea?: string
  powerRequirements?: string
  manufacturer?: string
  model?: string
  year?: number
}

// --- Inventario ---
export interface InventoryItem {
  id: string
  code: string
  name: string
  category: InventoryCategory
  type: string
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  location: string
  supplier?: string
  unitCost: number
  lastRestocked?: string
  specifications?: MaterialSpecifications
}

export type InventoryCategory = 'raw_material' | 'consumable' | 'tool' | 'spare_part' | 'finished_good'

export interface MaterialSpecifications {
  grade?: string
  thickness?: number
  width?: number
  length?: number
  weight?: number
  certification?: string
}

// --- Calidad ---
export interface QualityInspection {
  id: string
  pieceId: string
  processId?: string
  type: InspectionType
  status: QualityStatus
  inspector: string
  inspectionDate: string
  checkpoints: QualityCheckpoint[]
  overallScore?: number
  notes?: string
  photos?: string[]
  certifications?: string[]
}

export type InspectionType = 'dimensional' | 'visual' | 'structural' | 'coating' | 'final'

export interface QualityCheckpoint {
  id: string
  name: string
  parameter: string
  expectedValue: string
  actualValue?: string
  tolerance?: string
  passed?: boolean
  notes?: string
}

// --- Operadores y Personal ---
export interface Operator {
  id: string
  employeeId: string
  name: string
  role: OperatorRole
  department: string
  shift: Shift
  skills: string[]
  certifications: string[]
  status: 'active' | 'inactive' | 'on_leave'
  assignedMachine?: string
  performanceRating?: number
}

export type OperatorRole = 'operator' | 'technician' | 'supervisor' | 'quality_inspector' | 'maintenance'
export type Shift = 'morning' | 'afternoon' | 'night'

// --- Alertas y Notificaciones ---
export interface Alert {
  id: string
  type: AlertType
  severity: AlertSeverity
  title: string
  message: string
  source: string
  sourceId?: string
  timestamp: string
  acknowledged: boolean
  acknowledgedBy?: string
  acknowledgedAt?: string
  resolved: boolean
  resolvedAt?: string
}

export type AlertType = 
  | 'machine_error'
  | 'quality_issue'
  | 'inventory_low'
  | 'deadline_approaching'
  | 'maintenance_due'
  | 'safety'
  | 'production_delay'

// --- Métricas y KPIs ---
export interface ProductionMetrics {
  oee: number
  availability: number
  performance: number
  quality: number
  throughput: number
  cycleTime: number
  defectRate: number
  onTimeDelivery: number
}

export interface DailyProduction {
  date: string
  planned: number
  actual: number
  efficiency: number
  defects: number
}

// --- Programación ---
export interface ScheduleEvent {
  id: string
  type: 'production' | 'maintenance' | 'setup' | 'break'
  title: string
  machineId: string
  start: string
  end: string
  pieceId?: string
  projectId?: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  priority: number
}

// --- AI Assistant ---
export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  context?: AIContext
}

export interface AIContext {
  relatedProjects?: string[]
  relatedPieces?: string[]
  relatedMachines?: string[]
  dataSnapshot?: Record<string, unknown>
}

export interface AISuggestion {
  id: string
  type: 'optimization' | 'warning' | 'insight' | 'action'
  title: string
  description: string
  impact?: string
  confidence: number
  relatedEntities?: string[]
  actions?: AIAction[]
}

export interface AIAction {
  id: string
  label: string
  type: 'navigate' | 'execute' | 'show_details'
  target?: string
  payload?: Record<string, unknown>
}
