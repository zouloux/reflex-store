import { IStore } from "./store";
import { mounted, state } from "@zouloux/reflex";
import { IState } from "@zouloux/reflex";


export function storeState <GType extends object> ( store:IStore<GType> ) : IState<GType> {
	const data = state<GType>( store.getState() )
	mounted( () =>
		store.onAfter.add( () => data.set( store.getState() ) )
	)
	return data;
}
