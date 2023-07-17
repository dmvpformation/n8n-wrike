import { INodeProperties } from "n8n-workflow";

export default {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['tasks'],
		},
	},
	options: [
		{
			name: 'Get',
			value: 'get',
			description: 'Get tasks data',
			action: 'Get tasks',
		},
		{
			name: 'Edit',
			value: 'put',
			description: 'Edit a task',
			action: 'Edit a task',
		},
		{
			name: 'IDs Converter',
			value: 'idConverter',
			description: 'Convert a task ID',
			action: 'Convert a task ID',
		},
	],
	default: 'get',
}as INodeProperties
