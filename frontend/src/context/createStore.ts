interface Action<T = any> {
  type: T;
}

interface AnyAction extends Action {
  [extraProps: string]: any;
}

type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T;
}

interface Unsubscribe {
  (): void;
}

interface Store<S = any, A extends Action = AnyAction> {
  subscribe(listener: () => void): Unsubscribe;
  dispatch: Dispatch<A>;
  getState(): S;
}

class Store {}

export function createStore<S, A extends Action = AnyAction>(
  reducer: Reducer<S, A>,
  initialState: S
): Store<S, A> {
  let state = initialState;
  let callbacks: Array<A>[] = [];

  const getState = () => state;

  const dispatch = (action: any) => {
    state = reducer(state, action);
    return action;
  };

  const subscribe = (listener: any) => {
    callbacks.push(listener);
    return () => callbacks.filter((cb) => cb !== listener);
  };

  return { getState, dispatch, subscribe };
}

interface State {
  todos: string[];
}

interface ActionType {
  type: string;
  payload: string;
}

const store = createStore(
  (state: State = { todos: [] }, action: ActionType) => {
    if (action.type === "ADD") {
      return { ...state, todos: [...state.todos, action.payload] };
    }
    return state;
  },
  { todos: ["new", "todo"] }
);
