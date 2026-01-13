import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(value)
}

export function formatPercentage(value: number): string {
  return `${formatNumber(value, 1)}%`
}

export function formatWeight(kg: number): string {
  if (kg >= 1000) {
    return `${formatNumber(kg / 1000, 2)} ton`
  }
  return `${formatNumber(kg, 1)} kg`
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // Project status
    planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    in_progress: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    on_hold: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    // Piece status
    pending: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    quality_check: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    approved: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
    // Machine status
    operational: 'bg-green-500/20 text-green-400 border-green-500/30',
    maintenance: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
    idle: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    // Quality status
    passed: 'bg-green-500/20 text-green-400 border-green-500/30',
    failed: 'bg-red-500/20 text-red-400 border-red-500/30',
    conditional: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  }
  return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    // Project status
    planning: 'Planificación',
    in_progress: 'En Progreso',
    on_hold: 'En Espera',
    completed: 'Completado',
    cancelled: 'Cancelado',
    // Piece status
    pending: 'Pendiente',
    quality_check: 'Control Calidad',
    approved: 'Aprobado',
    rejected: 'Rechazado',
    // Machine status
    operational: 'Operativo',
    maintenance: 'Mantenimiento',
    error: 'Error',
    idle: 'Inactivo',
    // Quality status
    passed: 'Aprobado',
    failed: 'Fallido',
    conditional: 'Condicional',
    // Process status
    paused: 'Pausado',
  }
  return labels[status] || status
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    low: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    medium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  }
  return colors[priority] || colors.medium
}

export function getPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
    critical: 'Crítica',
  }
  return labels[priority] || priority
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    error: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  }
  return colors[severity] || colors.info
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function calculateOEE(availability: number, performance: number, quality: number): number {
  return (availability * performance * quality) / 10000
}

export function daysUntil(date: string): number {
  const target = new Date(date)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function isOverdue(date: string): boolean {
  return daysUntil(date) < 0
}
