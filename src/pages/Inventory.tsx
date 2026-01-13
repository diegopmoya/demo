import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Search, 
  AlertTriangle,
  TrendingDown,
  MoreVertical,
  Plus
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { mockInventory } from '@/data/mockData'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'
import type { InventoryCategory } from '@/types'

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

const categoryLabels: Record<InventoryCategory, string> = {
  raw_material: 'Materia Prima',
  consumable: 'Consumibles',
  tool: 'Herramientas',
  spare_part: 'Repuestos',
  finished_good: 'Producto Terminado'
}

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<InventoryCategory | 'all'>('all')

  const lowStockItems = mockInventory.filter(item => item.currentStock <= item.minStock)
  const totalValue = mockInventory.reduce((acc, item) => acc + (item.currentStock * item.unitCost), 0)

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const getStockStatus = (item: typeof mockInventory[0]) => {
    const ratio = item.currentStock / item.minStock
    if (ratio <= 0.5) return { color: 'text-red-400', bg: 'bg-red-500', label: 'Crítico' }
    if (ratio <= 1) return { color: 'text-yellow-400', bg: 'bg-yellow-500', label: 'Bajo' }
    return { color: 'text-green-400', bg: 'bg-green-500', label: 'Normal' }
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
          <h1 className="text-2xl font-bold text-white">Inventario</h1>
          <p className="text-steel-400 mt-1">Gestión de materiales y stock</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Ítem
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={itemVariants}
      >
        <Card className="bg-steel-900/50 border-steel-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-steel-400">Total Items</p>
                <p className="text-3xl font-bold text-white mt-1">{mockInventory.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-steel-900/50 border-steel-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-steel-400">Stock Bajo</p>
                <p className="text-3xl font-bold text-yellow-400 mt-1">{lowStockItems.length}</p>
                <p className="text-sm text-steel-500 mt-1">requieren reposición</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-steel-900/50 border-steel-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-steel-400">Valor Total</p>
                <p className="text-3xl font-bold text-green-400 mt-1">
                  {formatCurrency(totalValue)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <TrendingDown className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-400" />
          <Input
            placeholder="Buscar en inventario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-steel-900 border-steel-700"
          />
        </div>
        <Tabs value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as InventoryCategory | 'all')}>
          <TabsList className="bg-steel-900 border border-steel-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-steel-700">
              Todos
            </TabsTrigger>
            <TabsTrigger value="raw_material" className="data-[state=active]:bg-steel-700">
              Materia Prima
            </TabsTrigger>
            <TabsTrigger value="consumable" className="data-[state=active]:bg-steel-700">
              Consumibles
            </TabsTrigger>
            <TabsTrigger value="tool" className="data-[state=active]:bg-steel-700">
              Herramientas
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <div className="flex-1">
                  <p className="font-medium text-yellow-400">
                    {lowStockItems.length} items con stock bajo
                  </p>
                  <p className="text-sm text-yellow-300/70">
                    {lowStockItems.map(i => i.code).join(', ')}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Inventory Table */}
      <motion.div variants={itemVariants}>
        <Card className="bg-steel-900/50 border-steel-800">
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-steel-900">
                  <tr className="border-b border-steel-800">
                    <th className="text-left p-4 text-sm font-medium text-steel-400">Código</th>
                    <th className="text-left p-4 text-sm font-medium text-steel-400">Nombre</th>
                    <th className="text-left p-4 text-sm font-medium text-steel-400">Categoría</th>
                    <th className="text-left p-4 text-sm font-medium text-steel-400">Stock</th>
                    <th className="text-left p-4 text-sm font-medium text-steel-400">Estado</th>
                    <th className="text-left p-4 text-sm font-medium text-steel-400">Ubicación</th>
                    <th className="text-right p-4 text-sm font-medium text-steel-400">Valor</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => {
                    const stockStatus = getStockStatus(item)
                    const stockPercentage = Math.min((item.currentStock / item.maxStock) * 100, 100)

                    return (
                      <tr 
                        key={item.id}
                        className="border-b border-steel-800/50 hover:bg-steel-800/30 transition-colors"
                      >
                        <td className="p-4">
                          <span className="font-mono text-sm text-orange-400">{item.code}</span>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-white">{item.name}</p>
                            <p className="text-sm text-steel-500">{item.type}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="border-steel-600 text-steel-300">
                            {categoryLabels[item.category]}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="w-32">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white font-medium">
                                {formatNumber(item.currentStock)}
                              </span>
                              <span className="text-steel-500">
                                / {formatNumber(item.maxStock)} {item.unit}
                              </span>
                            </div>
                            <Progress 
                              value={stockPercentage}
                              className="h-1.5 bg-steel-800"
                              indicatorClassName={stockStatus.bg}
                            />
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={cn(
                            "border",
                            stockStatus.label === 'Normal' && "bg-green-500/20 text-green-400 border-green-500/30",
                            stockStatus.label === 'Bajo' && "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                            stockStatus.label === 'Crítico' && "bg-red-500/20 text-red-400 border-red-500/30"
                          )}>
                            {stockStatus.label}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-steel-400">{item.location}</span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-medium text-white">
                            {formatCurrency(item.currentStock * item.unitCost)}
                          </span>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
