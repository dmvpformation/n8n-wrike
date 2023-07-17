import {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';



export class Wrike implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wrike',
		name: 'wrike',
		icon: 'file:wrike.svg',
		group: ['transform'],
		version: 1,
		description: 'Wrike API Node',
		defaults: {
			name: 'Wrike',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'wrikeApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: `https://www.wrike.com/api/v4`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Folder',
						value: 'folders',
						routing: {
							request: {
								url: '/folders',
							},
						},
					},
					{
						name: 'Task',
						value: 'task',
						routing: {
							request: {
								url: '/tasks',
							},
						},
					},
					{
						name: 'Contact',
						value: 'contact',
						routing: {
							request: {
								url: '/contacts',
							},
						},
					},
					{
						name: 'IDs Converter',
						value: 'idConverter',
						routing: {
							request: {
								url: '/ids?ids=[1112509413]&type=ApiV2Task',
							},
						},
					},
				],
				default: 'task',
			},
			// ----------------------------------
			//         operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['task'],
					},
				},
				options: [

					{
						name: 'Get',
						value: 'get',
						description: 'Get tasks data',
						action: 'Get tasks',
						routing: {
							request: {
								method: 'GET',
							},
						},
					},
					{
						name: 'Edit',
						value: 'edit',
						description: 'Edit a task',
						action: 'Edit a task',
						routing: {
							request: {
								method: 'POST',
							},
						},
					},
					/*{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a task',
						action: 'Delete a task',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new task',
						action: 'Create an task',
					},
					{
						name: 'Edit',
						value: 'edit',
						description: 'Edit a task',
						action: 'Edit a task',
					},*/
				],
				default: 'get',
			},
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Tasks IDs',
				name: 'taskIds',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['task'],
					},
				},
				routing: {
					request: {
						// You've already set up the URL. qs appends the value of the field as a query string
						qs: {
							date: '/{{ $value }}',
						},
					},
				},
				placeholder: 'Placeholder value',
				description: 'Tasks IDs separeted by comma',
			},
		],
	};
}
