import Grid from '../grid/Grid'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskList from '../list/TaskList';
import { TaskProvider } from '../TaskProvider';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TaskProvider>
        <div className="app-container">
          <div className="grid-parent">
            <Grid />
            <hr/>
            <div>
              <h5>Random Notes</h5>
              <textarea className='task-notes' />
            </div>
          </div>
          <div className="list-parent">
            <TaskList />
          </div>
        </div>
      </TaskProvider>
    </DndProvider>
  )
}


export default App
