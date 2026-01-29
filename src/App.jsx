import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />
      case 'Tasks':
        return <Tasks />
      case 'manage-task':
        return <ManageTask />
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