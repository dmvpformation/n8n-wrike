import { INodeProperties } from "n8n-workflow";

export default {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Folder',
			value: 'folders',
		},
		{
			name: 'Task',
			value: 'tasks',
		},
		{
			name: 'Contact',
			value: 'contacts',
		},
	],
	default: 'tasks',
	required: true,
} as INodeProperties
