import { motion } from 'framer-motion'
import { 
  User, 
  Building2, 
  Bell, 
  Shield,
  Palette,
  Database,
  Wifi,
  HelpCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

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

const settingsSections = [
  {
    title: 'Perfil',
    description: 'Gestiona tu información personal y preferencias',
    icon: User,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'Empresa',
    description: 'Configuración de la organización y sedes',
    icon: Building2,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10'
  },
  {
    title: 'Notificaciones',
    description: 'Preferencias de alertas y comunicaciones',
    icon: Bell,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10'
  },
  {
    title: 'Seguridad',
    description: 'Contraseña, 2FA y sesiones activas',
    icon: Shield,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10'
  },
  {
    title: 'Apariencia',
    description: 'Tema, idioma y personalización visual',
    icon: Palette,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  },
  {
    title: 'Datos',
    description: 'Exportación, respaldos e integraciones',
    icon: Database,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10'
  },
  {
    title: 'Conexiones',
    description: 'APIs, webhooks y sistemas externos',
    icon: Wifi,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10'
  },
  {
    title: 'Ayuda',
    description: 'Documentación y soporte técnico',
    icon: HelpCircle,
    color: 'text-steel-400',
    bgColor: 'bg-steel-500/10'
  }
]

export function Settings() {
  return (
    <motion.div
      className="space-y-6 max-w-4xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-steel-400 mt-1">Gestiona las preferencias del sistema</p>
      </motion.div>

      {/* Settings Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={containerVariants}
      >
        {settingsSections.map((section) => (
          <motion.div key={section.title} variants={itemVariants}>
            <Card className="bg-steel-900/50 border-steel-800 hover:border-steel-700 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${section.bgColor}`}>
                    <section.icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{section.title}</h3>
                    <p className="text-sm text-steel-400 mt-1">{section.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* System Info */}
      <motion.div variants={itemVariants}>
        <Card className="bg-steel-900/50 border-steel-800">
          <CardHeader>
            <CardTitle className="text-lg text-white">Información del Sistema</CardTitle>
            <CardDescription>Versión y estado de la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-steel-400">Versión</span>
                <span className="text-white font-mono">v2.0.0</span>
              </div>
              <Separator className="bg-steel-800" />
              <div className="flex justify-between items-center">
                <span className="text-steel-400">Última actualización</span>
                <span className="text-white">15 Feb 2024</span>
              </div>
              <Separator className="bg-steel-800" />
              <div className="flex justify-between items-center">
                <span className="text-steel-400">Estado del servidor</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400">Operativo</span>
                </div>
              </div>
              <Separator className="bg-steel-800" />
              <div className="flex justify-between items-center">
                <span className="text-steel-400">Licencia</span>
                <span className="text-white">Enterprise</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
