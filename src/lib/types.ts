export const enum SelectionMode {
	Add = 'add',
	Edit = 'edit',
	Move = 'move',
}

export interface NamedVector {
	name: string,
	headNodeId: string,
	tailNodeId: string,
}
