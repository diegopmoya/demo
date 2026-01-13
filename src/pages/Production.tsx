import { motion } from 'framer-motion'
import { 
  Activity, 
  AlertTriangle,
  CheckCircle2,
  Pause,
  Wrench
} from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockMachines, mockPieces, mockProjects } from '@/data/mockData'
import { 
  cn, 
  getStatusColor, 
  getStatusLabel
} from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function Production() {
  const [, setSelectedMachine] = useState<string | null>(null)

  const machineStats = {
    operational: mockMachines.filter(m => m.status === 'operational').length,
    maintenance: mockMachines.filter(m => m.status === 'maintenance').length,
    error: mockMachines.filter(m => m.status === 'error').length,
    idle: mockMachines.filter(m => m.status === 'idle').length,
  }

  const getMachineIcon = (status: string) => {
    switch (status) {
      case 'operational': return <Activity className="w-5 h-5 text-green-400" />
      case 'maintenance': return <Wrench className="w-5 h-5 text-yellow-400" />
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-400" />
      default: return <Pause className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white">Producción</h1>
        <p className="text-steel-400 mt-1">Monitoreo en tiempo real de máquinas y procesos</p>
      </motion.div>

      {/* Machine Summary */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={itemVariants}
      >
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-green-300">Operativas</p>
              <p className="text-2xl font-bold text-green-400">{machineStats.operational}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Wrench className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-yellow-300">Mantenimiento</p>
              <p className="text-2xl font-bold text-yellow-400">{machineStats.maintenance}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-red-300">Error</p>
              <p className="text-2xl font-bold text-red-400">{machineStats.error}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-steel-500/10 border-steel-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-steel-500/20">
              <Pause className="w-6 h-6 text-steel-400" />
            </div>
            <div>
              <p className="text-sm text-steel-300">Inactivas</p>
              <p className="text-2xl font-bold text-steel-400">{machineStats.idle}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Machines Grid */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-steel-900 border border-steel-700">
              <TabsTrigger value="all" className="data-[state=active]:bg-steel-700">
                Todas
              </TabsTrigger>
              <TabsTrigger value="operational" className="data-[state=active]:bg-steel-700">
                Operativas
              </TabsTrigger>
              <TabsTrigger value="issues" className="data-[state=active]:bg-steel-700">
                Con Problemas
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockMachines.map((machine) => {
                const currentPiece = machine.currentJob 
                  ? mockPieces.find(p => p.id === machine.currentJob)
                  : null
                const currentProject = currentPiece
                  ? mockProjects.find(p => p.id === currentPiece.projectId)
                  : null

                return (
                  <Card 
                    key={machine.id}
                    className={cn(
                      "bg-steel-900/50 border transition-all cursor-pointer",
                      machine.status === 'operational' && "border-green-500/30 hover:border-green-500/50",
                      machine.status === 'maintenance' && "border-yellow-500/30 hover:border-yellow-500/50",
                      machine.status === 'error' && "border-red-500/30 hover:border-red-500/50",
                      machine.status === 'idle' && "border-steel-700 hover:border-steel-600"
                    )}
                    onClick={() => setSelectedMachine(machine.id)}
                  >
                    <CardContent className="p-5">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            machine.status === 'operational' && "bg-green-500/10",
                            machine.status === 'maintenance' && "bg-yellow-500/10",
                            machine.status === 'error' && "bg-red-500/10",
                            machine.status === 'idle' && "bg-steel-700/50"
                          )}>
                            {getMachineIcon(machine.status)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{machine.code}</h3>
                            <p className="text-sm text-steel-400">{machine.name}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(machine.status)}>
                          {getStatusLabel(machine.status)}
                        </Badge>
                      </div>

                      {/* Capacity/Efficiency */}
                      <div className="space-y-3 mb-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-steel-400">Capacidad</span>
                            <span className="text-white">{machine.capacity || 0}%</span>
                          </div>
                          <Progress 
                            value={machine.capacity || 0}
                            className="h-2 bg-steel-800"
                            indicatorClassName={cn(
                              machine.status === 'operational' && "bg-green-500",
                              machine.status === 'maintenance' && "bg-yellow-500",
                              machine.status === 'error' && "bg-red-500",
                              machine.status === 'idle' && "bg-steel-500"
                            )}
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-steel-400">Eficiencia</span>
                            <span className="text-white">{machine.efficiency}%</span>
                          </div>
                          <Progress 
                            value={machine.efficiency}
                            className="h-2 bg-steel-800"
                            indicatorClassName="bg-orange-500"
                          />
                        </div>
                      </div>

                      {/* Current Job */}
                      {currentPiece && (
                        <div className="p-3 rounded-lg bg-steel-800/50 border border-steel-700/50">
                          <p className="text-xs text-steel-500 mb-1">Trabajo Actual</p>
                          <p className="text-sm font-medium text-white">{currentPiece.name}</p>
                          <p className="text-xs text-steel-400">{currentProject?.code}</p>
                        </div>
                      )}

                      {/* Location */}
                      <div className="mt-4 pt-3 border-t border-steel-800">
                        <p className="text-xs text-steel-500">{machine.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="operational">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockMachines
                .filter(m => m.status === 'operational')
                .map((machine) => (
                  <Card 
                    key={machine.id}
                    className="bg-steel-900/50 border-green-500/30"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <Activity className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{machine.code}</h3>
                          <p className="text-sm text-steel-400">{machine.name}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-steel-400">Eficiencia</span>
                        <span className="text-xl font-bold text-green-400">
                          {machine.efficiency}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="issues">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockMachines
                .filter(m => m.status === 'maintenance' || m.status === 'error')
                .map((machine) => (
                  <Card 
                    key={machine.id}
                    className={cn(
                      "bg-steel-900/50",
                      machine.status === 'maintenance' && "border-yellow-500/30",
                      machine.status === 'error' && "border-red-500/30"
                    )}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            machine.status === 'maintenance' && "bg-yellow-500/10",
                            machine.status === 'error' && "bg-red-500/10"
                          )}>
                            {getMachineIcon(machine.status)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{machine.code}</h3>
                            <p className="text-sm text-steel-400">{machine.name}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(machine.status)}>
                          {getStatusLabel(machine.status)}
                        </Badge>
                      </div>
                      <Button 
                        className="w-full"
                        variant={machine.status === 'error' ? 'destructive' : 'outline'}
                      >
                        {machine.status === 'error' ? 'Ver Diagnóstico' : 'Ver Detalles'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
