import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  LayoutDashboard,
  FolderKanban,
  Factory,
  Package,
  ClipboardCheck,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  Hexagon
} from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FolderKanban, label: 'Proyectos', path: '/projects' },
  { icon: Factory, label: 'Producción', path: '/production' },
  { icon: Package, label: 'Inventario', path: '/inventory' },
  { icon: ClipboardCheck, label: 'Calidad', path: '/quality' },
  { icon: Bot, label: 'Asistente IA', path: '/ai-assistant' },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()

  return (
    <div
      className={cn(
        "flex flex-col bg-steel-950 border-r border-steel-800 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-steel-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
            <Hexagon className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-white">SteelGo</h1>
              <p className="text-xs text-steel-400">MES Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path))

            const linkContent = (
              <NavLink
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                  "hover:bg-steel-800/50",
                  isActive 
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" 
                    : "text-steel-300"
                )}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-orange-400")} />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </NavLink>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.path} delayDuration={0}>
                  <TooltipTrigger asChild>
                    {linkContent}
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return <div key={item.path}>{linkContent}</div>
          })}
        </nav>
      </ScrollArea>

      {/* Bottom Section */}
      <div className="border-t border-steel-800 p-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <NavLink
              to="/settings"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                "hover:bg-steel-800/50 text-steel-300",
                location.pathname === '/settings' && "bg-orange-500/10 text-orange-400"
              )}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">Configuración</span>}
            </NavLink>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right">
              Configuración
            </TooltipContent>
          )}
        </Tooltip>

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 text-steel-400 hover:text-white hover:bg-steel-800/50"
          onClick={onToggle}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span>Colapsar</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
