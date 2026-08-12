import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { BrandStrategySession, StrategyWorkspaceData, KnowledgeEntry, StrategyVersion } from '../types/brandStrategist';

type State = {
  session: BrandStrategySession;
  versions: StrategyVersion[];
  researchCache: Record<string, any>; // key = query, value = result
};

type Action =
  | { type: 'SET_SESSION'; payload: BrandStrategySession }
  | { type: 'ADD_VERSION'; payload: StrategyVersion }
  | { type: 'SET_ACTIVE_VERSION'; payload: number }
  | { type: 'CACHE_RESEARCH'; payload: { query: string; result: any } };

const initialState: State = {
  session: {
    step: 'CREATE',
    brief: null,
    questions: [],
    answers: [],
    currentQuestionIndex: -1,
    analysis: null,
    positioningOptions: [],
    recommendedPositioningId: null,
    workspace: null,
  },
  versions: [],
  researchCache: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SESSION':
      return { ...state, session: action.payload };
    case 'ADD_VERSION':
      return { ...state, versions: [...state.versions, action.payload] };
    case 'SET_ACTIVE_VERSION':
      const version = state.versions[action.payload];
      return version ? { ...state, session: { ...state.session, workspace: version.workspace } } : state;
    case 'CACHE_RESEARCH':
      return {
        ...state,
        researchCache: { ...state.researchCache, [action.payload.query]: action.payload.result },
      };
    default:
      return state;
  }
}

interface ContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

export const BrandStrategistContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const BrandStrategistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BrandStrategistContext.Provider value={{ state, dispatch }}>
      {children}
    </BrandStrategistContext.Provider>
  );
};
