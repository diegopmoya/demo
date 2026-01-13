import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Send, 
  Sparkles,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { AIMessage, AISuggestion } from '@/types'

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

const mockSuggestions: AISuggestion[] = [
  {
    id: 'sug-001',
    type: 'optimization',
    title: 'Optimización de Secuencia de Corte',
    description: 'Reordenando las piezas del proyecto PMC-2024-001 se podría reducir el tiempo de setup en un 15%',
    impact: 'Ahorro estimado: 8 horas/semana',
    confidence: 0.92,
  },
  {
    id: 'sug-002',
    type: 'warning',
    title: 'Riesgo de Desabastecimiento',
    description: 'El stock de planchas A36-12mm alcanzará el mínimo en 5 días al ritmo actual de consumo',
    impact: 'Afectaría 3 proyectos activos',
    confidence: 0.87,
  },
  {
    id: 'sug-003',
    type: 'insight',
    title: 'Patrón de Eficiencia Detectado',
    description: 'La máquina CNC-PL-01 muestra mejor rendimiento en el turno mañana (12% más eficiente)',
    confidence: 0.85,
  }
]

const quickQuestions = [
  '¿Cuál es el estado actual de producción?',
  '¿Qué proyectos tienen mayor prioridad?',
  '¿Hay alertas críticas pendientes?',
  '¿Cuál es la eficiencia promedio hoy?'
]

export function AIAssistant() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy el asistente de IA de SteelGo. Puedo ayudarte a analizar datos de producción, identificar tendencias, y responder preguntas sobre el estado de tus proyectos. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date().toISOString()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'estado': 'Actualmente tienes 3 proyectos en progreso con un avance promedio del 67%. El proyecto "Torre Antofagasta" está en fase crítica con 89% de avance y fecha límite próxima. La eficiencia general de planta es del 78.5% OEE.',
        'prioridad': 'Los proyectos con mayor prioridad son:\n\n1. **Torre Telecomunicaciones Antofagasta** (Crítica) - 89% completado\n2. **Puente Metálico Concepción** (Alta) - 67% completado\n3. **Estadio Regional Talca** (Alta) - 12% completado\n\nTe recomiendo enfocar recursos en completar la torre antes de la fecha límite.',
        'alerta': 'Hay 2 alertas críticas pendientes:\n\n1. **Error en CNC Láser** - Falla en sistema de refrigeración\n2. **Stock Crítico** - Broca TCT Ø200mm (solo 3 unidades)\n\n¿Deseas que genere órdenes de trabajo para atender estas alertas?',
        'eficiencia': 'La eficiencia promedio de hoy es del 95.2%. Desglose:\n\n- CNC Plasma: 92%\n- CNC Taladro: 88%\n- Estación Soldadura: 91%\n- Cabina Pintura: 87%\n\nLa plegadora está en mantenimiento programado.'
      }

      let response = 'Entiendo tu consulta. Basándome en los datos actuales del sistema, puedo ver que la producción está operando dentro de los parámetros normales. ¿Hay algo específico que te gustaría profundizar?'

      const inputLower = input.toLowerCase()
      if (inputLower.includes('estado') || inputLower.includes('producción')) {
        response = responses.estado
      } else if (inputLower.includes('prioridad') || inputLower.includes('proyecto')) {
        response = responses.prioridad
      } else if (inputLower.includes('alerta') || inputLower.includes('crítica')) {
        response = responses.alerta
      } else if (inputLower.includes('eficiencia') || inputLower.includes('rendimiento')) {
        response = responses.eficiencia
      }

      const assistantMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <motion.div
      className="h-[calc(100vh-8rem)] flex gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Chat Section */}
      <motion.div variants={itemVariants} className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col bg-steel-900/50 border-steel-800">
          <CardHeader className="border-b border-steel-800">
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Bot className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <span>Asistente IA SteelGo</span>
                <p className="text-sm font-normal text-steel-400 mt-0.5">
                  Análisis inteligente de producción
                </p>
              </div>
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' && "flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.role === 'assistant' 
                      ? "bg-orange-500/20" 
                      : "bg-blue-500/20"
                  )}>
                    {message.role === 'assistant' 
                      ? <Bot className="w-4 h-4 text-orange-400" />
                      : <MessageSquare className="w-4 h-4 text-blue-400" />
                    }
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-xl",
                    message.role === 'assistant' 
                      ? "bg-steel-800/50 text-steel-100" 
                      : "bg-blue-500/20 text-blue-100"
                  )}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="bg-steel-800/50 p-4 rounded-xl">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-steel-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-steel-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-steel-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          <div className="px-4 py-2 border-t border-steel-800">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0 border-steel-600 text-steel-300 hover:bg-steel-700 text-xs"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-steel-800">
            <div className="flex gap-3">
              <Textarea
                placeholder="Escribe tu pregunta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                className="resize-none bg-steel-800 border-steel-700 min-h-[44px] max-h-[120px]"
                rows={1}
              />
              <Button 
                className="bg-orange-500 hover:bg-orange-600 px-4"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Suggestions Sidebar */}
      <motion.div variants={itemVariants} className="w-80 space-y-4">
        <Card className="bg-steel-900/50 border-steel-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              Sugerencias Inteligentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-colors",
                  "hover:bg-steel-800/50",
                  suggestion.type === 'optimization' && "bg-blue-500/5 border-blue-500/20",
                  suggestion.type === 'warning' && "bg-yellow-500/5 border-yellow-500/20",
                  suggestion.type === 'insight' && "bg-purple-500/5 border-purple-500/20"
                )}
              >
                <div className="flex items-start gap-2 mb-2">
                  {suggestion.type === 'optimization' && <TrendingUp className="w-4 h-4 text-blue-400 mt-0.5" />}
                  {suggestion.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />}
                  {suggestion.type === 'insight' && <Lightbulb className="w-4 h-4 text-purple-400 mt-0.5" />}
                  <div>
                    <h4 className="text-sm font-medium text-white">{suggestion.title}</h4>
                    <p className="text-xs text-steel-400 mt-1">{suggestion.description}</p>
                  </div>
                </div>
                {suggestion.impact && (
                  <div className="flex items-center gap-1 mt-2">
                    <Zap className="w-3 h-3 text-orange-400" />
                    <span className="text-xs text-orange-400">{suggestion.impact}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline" className="text-xs border-steel-600">
                    {Math.round(suggestion.confidence * 100)}% confianza
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
