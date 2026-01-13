import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { Production } from './pages/Production'
import { Inventory } from './pages/Inventory'
import { Quality } from './pages/Quality'
import { AIAssistant } from './pages/AIAssistant'
import { Settings } from './pages/Settings'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/production" element={<Production />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
      <Toaster />
    </Router>
  )
}

export default App
