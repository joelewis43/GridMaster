import Grid from '../grid/Grid'
import GetGridMasterTiles from '../grid/GetTiles'

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
            <Grid tileMap={GetGridMasterTiles()} />
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
