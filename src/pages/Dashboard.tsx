import { motion } from 'framer-motion'
import { 
  Activity, 
  TrendingUp, 
  Package, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Factory,
  Gauge
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import { 
  mockProjects, 
  mockMachines, 
  mockProductionMetrics,
  mockDailyProduction,
  mockAlerts 
} from '@/data/mockData'
import { 
  cn, 
  formatNumber, 
  formatPercentage, 
  getStatusColor, 
  getStatusLabel,
  getSeverityColor
} from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function Dashboard() {
  const activeProjects = mockProjects.filter(p => p.status === 'in_progress')
  const operationalMachines = mockMachines.filter(m => m.status === 'operational')
  const criticalAlerts = mockAlerts.filter(a => a.severity === 'critical' && !a.resolved)

  const kpis = [
    {
      title: 'OEE General',
      value: formatPercentage(mockProductionMetrics.oee),
      change: '+2.3%',
      trend: 'up',
      icon: Gauge,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: 'Proyectos Activos',
      value: activeProjects.length,
      subtitle: `de ${mockProjects.length} totales`,
      icon: Factory,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'Máquinas Operativas',
      value: `${operationalMachines.length}/${mockMachines.length}`,
      subtitle: 'en funcionamiento',
      icon: Activity,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      title: 'Alertas Críticas',
      value: criticalAlerts.length,
      subtitle: 'requieren atención',
      icon: AlertTriangle,
      color: criticalAlerts.length > 0 ? 'text-red-400' : 'text-green-400',
      bgColor: criticalAlerts.length > 0 ? 'bg-red-500/10' : 'bg-green-500/10',
      borderColor: criticalAlerts.length > 0 ? 'border-red-500/20' : 'border-green-500/20'
    }
  ]

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Title */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-steel-400 mt-1">Vista general del estado de producción</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={itemVariants}
      >
        {kpis.map((kpi) => (
          <Card 
            key={kpi.title}
            className={cn("bg-steel-900/50 border", kpi.borderColor)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-steel-400">{kpi.title}</p>
                  <p className={cn("text-3xl font-bold mt-1", kpi.color)}>
                    {kpi.value}
                  </p>
                  {kpi.subtitle && (
                    <p className="text-sm text-steel-500 mt-1">{kpi.subtitle}</p>
                  )}
                  {kpi.change && (
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">{kpi.change}</span>
                      <span className="text-sm text-steel-500">vs mes anterior</span>
                    </div>
                  )}
                </div>
                <div className={cn("p-3 rounded-lg", kpi.bgColor)}>
                  <kpi.icon className={cn("w-6 h-6", kpi.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Chart */}
        <motion.div variants={itemVariants}>
          <Card className="bg-steel-900/50 border-steel-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Producción Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockDailyProduction}>
                    <defs>
                      <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6b7280"
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('es-CL', { weekday: 'short' })}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#9ca3af' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="planned" 
                      stroke="#3b82f6" 
                      fillOpacity={1}
                      fill="url(#colorPlanned)"
                      name="Planificado"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#f97316" 
                      fillOpacity={1}
                      fill="url(#colorActual)"
                      name="Real"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* OEE Breakdown */}
        <motion.div variants={itemVariants}>
          <Card className="bg-steel-900/50 border-steel-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Desglose OEE</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: 'Disponibilidad', value: mockProductionMetrics.availability, color: 'bg-blue-500' },
                { label: 'Rendimiento', value: mockProductionMetrics.performance, color: 'bg-orange-500' },
                { label: 'Calidad', value: mockProductionMetrics.quality, color: 'bg-green-500' }
              ].map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-steel-300">{metric.label}</span>
                    <span className="text-white font-medium">{formatPercentage(metric.value)}</span>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className="h-2 bg-steel-800"
                    indicatorClassName={metric.color}
                  />
                </div>
              ))}
              
              <div className="pt-4 border-t border-steel-700">
                <div className="flex justify-between items-center">
                  <span className="text-steel-300">OEE Total</span>
                  <span className="text-2xl font-bold text-orange-400">
                    {formatPercentage(mockProductionMetrics.oee)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="bg-steel-900/50 border-steel-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Proyectos en Progreso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeProjects.slice(0, 4).map((project) => (
                  <div 
                    key={project.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-steel-800/30 hover:bg-steel-800/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white truncate">{project.name}</h4>
                        <Badge className={getStatusColor(project.status)}>
                          {getStatusLabel(project.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-steel-400">{project.client}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Package className="w-4 h-4 text-steel-500" />
                          <span className="text-steel-300">
                            {project.completedPieces}/{project.totalPieces} piezas
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-4 h-4 text-steel-500" />
                          <span className="text-steel-300">
                            Vence: {new Date(project.endDate).toLocaleDateString('es-CL')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-24 text-right">
                      <div className="text-2xl font-bold text-orange-400">
                        {project.progress}%
                      </div>
                      <Progress 
                        value={project.progress} 
                        className="h-1.5 mt-2 bg-steel-700"
                        indicatorClassName="bg-orange-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Machine Status */}
        <motion.div variants={itemVariants}>
          <Card className="bg-steel-900/50 border-steel-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Estado Máquinas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockMachines.slice(0, 5).map((machine) => (
                  <div 
                    key={machine.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-steel-800/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        machine.status === 'operational' && "bg-green-500 status-active",
                        machine.status === 'maintenance' && "bg-yellow-500 status-warning",
                        machine.status === 'error' && "bg-red-500 status-error",
                        machine.status === 'idle' && "bg-gray-500"
                      )} />
                      <div>
                        <p className="text-sm font-medium text-white">{machine.code}</p>
                        <p className="text-xs text-steel-400">{machine.name}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(machine.status)}>
                      {getStatusLabel(machine.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
