import { motion } from 'framer-motion'
import { 
  ClipboardCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Clock,
  Eye,
  FileText
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { mockQualityInspections, mockPieces } from '@/data/mockData'
import { cn, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils'

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

export function Quality() {
  const passedInspections = mockQualityInspections.filter(i => i.status === 'passed').length
  const failedInspections = mockQualityInspections.filter(i => i.status === 'failed').length
  const pendingInspections = mockQualityInspections.filter(i => i.status === 'pending').length
  const conditionalInspections = mockQualityInspections.filter(i => i.status === 'conditional').length

  const qualityRate = mockQualityInspections.length > 0 
    ? ((passedInspections / mockQualityInspections.length) * 100)
    : 0

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white">Control de Calidad</h1>
        <p className="text-steel-400 mt-1">Gestión de inspecciones y certificaciones</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={itemVariants}
      >
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-green-300">Aprobadas</p>
                <p className="text-2xl font-bold text-green-400">{passedInspections}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-sm text-red-300">Rechazadas</p>
                <p className="text-2xl font-bold text-red-400">{failedInspections}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-sm text-yellow-300">Condicionales</p>
                <p className="text-2xl font-bold text-yellow-400">{conditionalInspections}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-sm text-blue-300">Pendientes</p>
                <p className="text-2xl font-bold text-blue-400">{pendingInspections}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quality Rate */}
      <motion.div variants={itemVariants}>
        <Card className="bg-steel-900/50 border-steel-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Tasa de Aprobación</h3>
                <p className="text-sm text-steel-400">Porcentaje de inspecciones aprobadas</p>
              </div>
              <div className="text-4xl font-bold text-green-400">
                {qualityRate.toFixed(1)}%
              </div>
            </div>
            <Progress 
              value={qualityRate}
              className="h-3 bg-steel-800"
              indicatorClassName="bg-green-500"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Inspections List */}
      <motion.div variants={itemVariants}>
        <Card className="bg-steel-900/50 border-steel-800">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center justify-between">
              <span>Inspecciones Recientes</span>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                Nueva Inspección
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {mockQualityInspections.map((inspection) => {
                  const piece = mockPieces.find(p => p.id === inspection.pieceId)

                  return (
                    <div
                      key={inspection.id}
                      className={cn(
                        "p-4 rounded-lg border transition-colors",
                        "bg-steel-800/30 hover:bg-steel-800/50",
                        inspection.status === 'passed' && "border-green-500/20",
                        inspection.status === 'failed' && "border-red-500/20",
                        inspection.status === 'conditional' && "border-yellow-500/20",
                        inspection.status === 'pending' && "border-steel-700"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={cn(
                              inspection.status === 'passed' && "bg-green-500/20 text-green-400 border-green-500/30",
                              inspection.status === 'failed' && "bg-red-500/20 text-red-400 border-red-500/30",
                              inspection.status === 'conditional' && "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                              inspection.status === 'pending' && "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            )}>
                              {inspection.status === 'passed' && 'Aprobado'}
                              {inspection.status === 'failed' && 'Rechazado'}
                              {inspection.status === 'conditional' && 'Condicional'}
                              {inspection.status === 'pending' && 'Pendiente'}
                            </Badge>
                            <span className="text-sm text-steel-500">
                              {inspection.type === 'dimensional' && 'Dimensional'}
                              {inspection.type === 'visual' && 'Visual'}
                              {inspection.type === 'structural' && 'Estructural'}
                              {inspection.type === 'coating' && 'Recubrimiento'}
                              {inspection.type === 'final' && 'Final'}
                            </span>
                          </div>
                          <h4 className="font-medium text-white mb-1">
                            {piece?.name || 'Pieza desconocida'}
                          </h4>
                          <p className="text-sm text-steel-400">
                            Inspector: {inspection.inspector} • {formatDate(inspection.inspectionDate)}
                          </p>
                          
                          {/* Checkpoints Preview */}
                          {inspection.checkpoints.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {inspection.checkpoints.slice(0, 2).map((cp) => (
                                <div 
                                  key={cp.id}
                                  className="flex items-center justify-between text-sm p-2 rounded bg-steel-800/50"
                                >
                                  <span className="text-steel-300">{cp.name}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-steel-400">
                                      {cp.actualValue || cp.expectedValue}
                                    </span>
                                    {cp.passed !== undefined && (
                                      cp.passed 
                                        ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                                        : <XCircle className="w-4 h-4 text-red-400" />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {inspection.notes && (
                            <p className="text-sm text-steel-500 mt-2 italic">
                              "{inspection.notes}"
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {inspection.overallScore !== undefined && (
                            <div className={cn(
                              "text-2xl font-bold",
                              inspection.overallScore >= 90 && "text-green-400",
                              inspection.overallScore >= 70 && inspection.overallScore < 90 && "text-yellow-400",
                              inspection.overallScore < 70 && "text-red-400"
                            )}>
                              {inspection.overallScore}%
                            </div>
                          )}
                          <Button variant="outline" size="sm" className="border-steel-600">
                            <Eye className="w-4 h-4 mr-1" />
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
