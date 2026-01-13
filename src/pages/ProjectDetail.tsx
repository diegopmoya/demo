import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Package,
  DollarSign,
  MoreVertical,
  Edit
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { mockProjects, mockPieces } from '@/data/mockData'
import { 
  formatDate, 
  formatCurrency, 
  formatWeight,
  getStatusColor, 
  getStatusLabel,
  getPriorityColor,
  getPriorityLabel
} from '@/lib/utils'

export function ProjectDetail() {
  const { id } = useParams()
  const project = mockProjects.find(p => p.id === id)
  const projectPieces = mockPieces.filter(p => p.projectId === id)

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-xl font-semibold text-white mb-2">Proyecto no encontrado</h2>
        <Link to="/projects">
          <Button variant="outline">Volver a Proyectos</Button>
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/projects" className="text-steel-400 hover:text-white flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Proyectos
        </Link>
        <span className="text-steel-600">/</span>
        <span className="text-white">{project.code}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">{project.name}</h1>
            <Badge className={getStatusColor(project.status)}>
              {getStatusLabel(project.status)}
            </Badge>
            <Badge className={getPriorityColor(project.priority)}>
              {getPriorityLabel(project.priority)}
            </Badge>
          </div>
          <p className="text-steel-400">{project.client}</p>
          {project.description && (
            <p className="text-steel-500 mt-2 max-w-2xl">{project.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-steel-700">
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            Ver Programa
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-steel-900/50 border-steel-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Package className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-steel-400">Piezas</p>
                <p className="text-xl font-bold text-white">
                  {project.completedPieces}/{project.totalPieces}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-steel-900/50 border-steel-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-steel-400">Fecha Límite</p>
                <p className="text-xl font-bold text-white">
                  {formatDate(project.endDate)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-steel-900/50 border-steel-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-steel-400">Presupuesto</p>
                <p className="text-xl font-bold text-white">
                  {project.budget ? formatCurrency(project.budget) : '-'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-steel-900/50 border-steel-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-steel-400">Responsable</p>
                <p className="text-xl font-bold text-white truncate">
                  {project.manager || '-'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="bg-steel-900/50 border-steel-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Progreso General</h3>
            <span className="text-3xl font-bold text-orange-400">{project.progress}%</span>
          </div>
          <Progress 
            value={project.progress}
            className="h-3 bg-steel-800"
            indicatorClassName="bg-orange-500"
          />
          <div className="flex justify-between mt-2 text-sm text-steel-400">
            <span>Inicio: {formatDate(project.startDate)}</span>
            <span>Fin: {formatDate(project.endDate)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs defaultValue="pieces" className="w-full">
        <TabsList className="bg-steel-900 border border-steel-700">
          <TabsTrigger value="pieces" className="data-[state=active]:bg-steel-700">
            Piezas ({projectPieces.length})
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-steel-700">
            Cronograma
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-steel-700">
            Documentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pieces" className="mt-4">
          <Card className="bg-steel-900/50 border-steel-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center justify-between">
                <span>Lista de Piezas</span>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  Agregar Pieza
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {projectPieces.map((piece) => (
                    <div
                      key={piece.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-steel-800/30 hover:bg-steel-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-steel-700 flex items-center justify-center">
                          <Package className="w-6 h-6 text-steel-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white">{piece.name}</h4>
                            <Badge className={getStatusColor(piece.status)}>
                              {getStatusLabel(piece.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-steel-400">
                            {piece.code} • {piece.material} • {formatWeight(piece.weight)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-steel-400">Cantidad</p>
                          <p className="font-medium text-white">
                            {piece.completedQuantity}/{piece.quantity}
                          </p>
                        </div>
                        <Progress 
                          value={(piece.completedQuantity / piece.quantity) * 100}
                          className="w-20 h-2 bg-steel-700"
                          indicatorClassName="bg-orange-500"
                        />
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <Card className="bg-steel-900/50 border-steel-800">
            <CardContent className="p-6">
              <p className="text-steel-400 text-center py-12">
                Cronograma del proyecto (En desarrollo)
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card className="bg-steel-900/50 border-steel-800">
            <CardContent className="p-6">
              <p className="text-steel-400 text-center py-12">
                Documentos del proyecto (En desarrollo)
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
