import React, { createContext, useContext, useState } from 'react';
import { StepType, type GridTile, type Step } from '../types';
import { useGridContext } from './GridProvider';

interface RouteContextType {
  route: Step[]; // The route the user builds for Grid Master
  setRoute: React.Dispatch<React.SetStateAction<Step[]>>;
  appendRoute: (step: Step) => void;
  addTileToRoute: (tile: GridTile) => void;
  editRouteStep: (step: Step) => void;
  deleteStepFromRoute: (id: string) => void;
  importRoute: (route: Step[]) => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setGridPlanned } = useGridContext();

  const [route, setRoute] = useState<Step[]>([]);

  const appendRoute = (newStep: Step) => {
    if (route.filter((s) => s.id === newStep.id).length > 0) return;
    setRoute(prev => [...prev, newStep]);
  };

  const addTileToRoute = (tile: GridTile) => {
    if (route.filter((s) => s.id === tile.id).length > 0) return;
    const newStep: Step = {
      id: tile.id,
      task: tile.task.name,
      input: '',
      outputName: tile.reward.name,
      outputValue: tile.reward.description,
      type: StepType.Tile,
    }
    setRoute(prev => [...prev, newStep]);
    setGridPlanned(tile.id, true);
  }

  const editRouteStep = (updatedStep: Step) => {
    setRoute((prev) =>
      prev.map((s) => (s.id === updatedStep.id ? updatedStep : s))
    );
  };

  const deleteStepFromRoute = (id: string) => {
    setRoute((prev) => prev.filter(s => s.id !== id));
    setGridPlanned(id, false);
  };

  const importRoute = (importedRoute: Step[]) => {
    setRoute(importedRoute);
    for (const step of importedRoute) {
      setGridPlanned(step.id, true);
    }
  }

  return (
    <RouteContext.Provider value={{ route, setRoute, appendRoute, addTileToRoute, editRouteStep, deleteStepFromRoute, importRoute}}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRouteContext = () => {
  const context = useContext(RouteContext);
  if (!context) throw new Error('useRouteContext must be used within a RouteProvider');
  return context;
};