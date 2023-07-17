import { INodeProperties } from "n8n-workflow";

export default {
	displayName: 'Metadata',
	name: 'metadataEdit',
	placeholder: 'Add Metadata',
	type: 'fixedCollection',
	default: {},
	typeOptions: {
		multipleValues: true,
	},
	options: [
		{
			name: 'metadataValues',
			displayName: 'Metadata',
			values: [
				{
					displayName: 'Name',
					name: 'name',
					type: 'string',
					default: 'Name of the metadata key to add.',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					description: 'Value to set for the metadata key',
				},
			],
		},
	],
	displayOptions: { // the resources and operations to display this element with
		show: {
			resource: [
				'tasks'
			],
			operation: [
				'put'
			]
		}
	},
} as INodeProperties
