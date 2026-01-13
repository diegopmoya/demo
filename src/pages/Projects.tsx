import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  Users,
  Package,
  ArrowUpRight
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockProjects } from '@/data/mockData'
import { 
  cn, 
  formatDate, 
  formatCurrency, 
  getStatusColor, 
  getStatusLabel,
  getPriorityColor,
  getPriorityLabel,
  daysUntil,
  isOverdue
} from '@/lib/utils'
import type { ProjectStatus } from '@/types'

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

export function Projects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all')

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: mockProjects.length,
    planning: mockProjects.filter(p => p.status === 'planning').length,
    in_progress: mockProjects.filter(p => p.status === 'in_progress').length,
    completed: mockProjects.filter(p => p.status === 'completed').length,
    on_hold: mockProjects.filter(p => p.status === 'on_hold').length,
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Proyectos</h1>
          <p className="text-steel-400 mt-1">Gestión de proyectos de manufactura</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400" />
          <Input
            placeholder="Buscar proyectos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-steel-900 border-steel-700"
          />
        </div>
        <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as ProjectStatus | 'all')}>
          <TabsList className="bg-steel-900 border border-steel-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-steel-700">
              Todos ({statusCounts.all})
            </TabsTrigger>
            <TabsTrigger value="in_progress" className="data-[state=active]:bg-steel-700">
              En Progreso ({statusCounts.in_progress})
            </TabsTrigger>
            <TabsTrigger value="planning" className="data-[state=active]:bg-steel-700">
              Planificación ({statusCounts.planning})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-steel-700">
              Completados ({statusCounts.completed})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        variants={containerVariants}
      >
        {filteredProjects.map((project) => {
          const days = daysUntil(project.endDate)
          const overdue = isOverdue(project.endDate)

          return (
            <motion.div key={project.id} variants={itemVariants}>
              <Link to={`/projects/${project.id}`}>
                <Card className="bg-steel-900/50 border-steel-800 hover:border-steel-600 transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getStatusColor(project.status)}>
                            {getStatusLabel(project.status)}
                          </Badge>
                          <Badge className={getPriorityColor(project.priority)}>
                            {getPriorityLabel(project.priority)}
                          </Badge>
                        </div>
                        <p className="text-xs text-steel-500 font-mono">{project.code}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-steel-400 mb-4">{project.client}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-steel-400">Progreso</span>
                        <span className="text-white font-medium">{project.progress}%</span>
                      </div>
                      <Progress 
                        value={project.progress}
                        className="h-2 bg-steel-800"
                        indicatorClassName={cn(
                          project.progress >= 80 ? "bg-green-500" :
                          project.progress >= 50 ? "bg-orange-500" :
                          "bg-blue-500"
                        )}
                      />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-steel-500" />
                        <span className="text-steel-300">
                          {project.completedPieces}/{project.totalPieces}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-steel-500" />
                        <span className={cn(
                          "text-steel-300",
                          overdue && "text-red-400"
                        )}>
                          {overdue ? `+${Math.abs(days)}d` : `${days}d`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-steel-500" />
                        <span className="text-steel-300">{project.manager?.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    {project.budget && (
                      <div className="mt-4 pt-4 border-t border-steel-800 flex justify-between items-center">
                        <span className="text-sm text-steel-400">Presupuesto</span>
                        <span className="text-sm text-white font-medium">
                          {formatCurrency(project.budget)}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div 
          variants={itemVariants}
          className="text-center py-12"
        >
          <p className="text-steel-400">No se encontraron proyectos</p>
        </motion.div>
      )}
    </motion.div>
  )
}
