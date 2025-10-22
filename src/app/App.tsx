import Grid from '../grid/Grid'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskList from '../route/Route';
import { RouteProvider } from '../providers/RouteProvider';
import { GridProvider } from '../providers/GridProvider';
import Buffs from '../buffs/Buffs';
import NavBar from '../nav/NavBar';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GridProvider>
        <RouteProvider>
          
          <div className="app-container">
            <NavBar />
            <div className="app-body">
              <div className="grid-parent">
                <Grid />
                <hr />
                <Buffs />
              </div>

              <div className="list-parent">
                <TaskList />
              </div>
            </div>

          </div>
        </RouteProvider>
      </GridProvider>
    </DndProvider>
  )
}


export default App
