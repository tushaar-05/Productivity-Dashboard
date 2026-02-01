import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Task from './pages/Tasks'
import CreateTask from './pages/CreateTask'
import ManageTasks from './pages/ManageTasks'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />
      case 'Tasks':
        return <Task />
      case 'create-task': 
        return <CreateTask />
      case 'manage-task': 
        return <ManageTasks />
      default:
        return <Dashboard />
    }
  }

  return (
    <>
      <div className='flex'>
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        {renderPage()}
      </div>
    </>
  )
}

export default App