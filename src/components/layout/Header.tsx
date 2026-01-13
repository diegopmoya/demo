import { useState } from 'react'
import { Bell, Search, User, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { mockAlerts } from '@/data/mockData'
import { cn, formatDateTime, getSeverityColor } from '@/lib/utils'

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  
  const unreadAlerts = mockAlerts.filter(a => !a.acknowledged)

  return (
    <>
      <header className="flex items-center justify-between h-16 px-6 border-b border-steel-800 bg-steel-950/50 backdrop-blur-sm">
        {/* Search */}
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="outline"
            className="w-72 justify-start text-steel-400 border-steel-700 hover:bg-steel-800/50"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-4 h-4 mr-2" />
            <span>Buscar proyectos, piezas...</span>
            <kbd className="ml-auto text-xs bg-steel-800 px-2 py-0.5 rounded">⌘K</kbd>
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-steel-300 hover:text-white hover:bg-steel-800/50"
            onClick={() => setNotificationsOpen(true)}
          >
            <Bell className="w-5 h-5" />
            {unreadAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                  {unreadAlerts.length}
                </span>
              </span>
            )}
          </Button>

          {/* User Menu */}
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-steel-300 hover:text-white hover:bg-steel-800/50"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-orange-500/20 text-orange-400">
                JM
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">Juan Martínez</p>
              <p className="text-xs text-steel-400">Jefe Producción</p>
            </div>
            <ChevronDown className="w-4 h-4 text-steel-400" />
          </Button>
        </div>
      </header>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-xl bg-steel-900 border-steel-700">
          <DialogHeader>
            <DialogTitle>Búsqueda Global</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Buscar proyectos, piezas, máquinas..."
              className="bg-steel-800 border-steel-700"
              autoFocus
            />
            <div className="text-sm text-steel-400">
              <p>Sugerencias:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {['PMC-2024-001', 'HEB-600', 'CNC-PL-01'].map((term) => (
                  <Badge
                    key={term}
                    variant="outline"
                    className="cursor-pointer hover:bg-steel-700 border-steel-600"
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent className="sm:max-w-lg bg-steel-900 border-steel-700">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Notificaciones</span>
              {unreadAlerts.length > 0 && (
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  {unreadAlerts.length} sin leer
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px] -mx-6 px-6">
            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "p-4 rounded-lg border transition-colors",
                    alert.acknowledged 
                      ? "bg-steel-800/30 border-steel-700/50" 
                      : "bg-steel-800/50 border-steel-700"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-steel-400">
                          {formatDateTime(alert.timestamp)}
                        </span>
                      </div>
                      <h4 className="font-medium text-white truncate">{alert.title}</h4>
                      <p className="text-sm text-steel-400 mt-1">{alert.message}</p>
                    </div>
                    {!alert.acknowledged && (
                      <Button variant="ghost" size="icon" className="text-steel-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
