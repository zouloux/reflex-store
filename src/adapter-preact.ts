import { IStore } from "./store";
import { useEffect, useState } from "preact/hooks";

export function useStoreState <G extends object> ( store:IStore<G, any, any, any>, dependencies = [] ) : G {
	const [ state, setState ] = useState( () => store.getState() );
	useEffect( () => {
		// Update state here because state may have been updated
		// by a child component of the one hooked with useStore.
		// If state did not change, no useless render happens
		setState( store.getState() );
		// Register and unregister on component mount / unmount
		return store.onAfter.add( setState );
	}, dependencies);
	return state;
}

export function useStoreHandler <G extends object> ( store:IStore<G, any, any, any>, handler:(state:G, oldState?:G, ...rest) => any, callAtInit = true, dependencies = [] ) {
	useEffect( () => {
		// Update state here because state may have been updated
		// by a child component of the one hooked with useStore.
		// If state did not change, no useless render happens
		// OldState is explicitly null
		callAtInit && handler( store.getState(), null );
		// Register and unregister on component mount / unmount
		return store.onAfter.add( handler );
	}, dependencies);
}
