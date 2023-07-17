import { INodeProperties } from "n8n-workflow";

export default {
	displayName: 'Task Option',
	name: 'taskOption',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			operation: ['get'],
			resource: ['tasks'],
		}
	},
	options: [
		{
			name: 'All Tasks',
			value: 'all',
			description: 'Get all tasks',
			action: 'Get all tasks',
		},
		{
			name: 'Folder',
			value: 'folder',
			description: 'Get tasks in a folder',
			action: 'Get tasks in a folder',
		},
		{
			name: 'History',
			value: 'history',
			description: 'Get tasks history',
			action: 'Get tasks history',
		},
		{
			name: 'IDs',
			value: 'ids',
			description: 'Get tasks by IDs',
			action: 'Get tasks by IDs',
		},
		{
			name: 'Space',
			value: 'space',
			description: 'Get tasks in a space',
			action: 'Get tasks in a space',
		},
	],
	default: 'ids',
} as INodeProperties
