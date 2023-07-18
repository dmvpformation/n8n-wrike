import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request-promise-native';
import metadata from './metadata';
import operations from './operations';
import resources from './resources';
import taskOption from './taskOption';
const baseURL = 'https://www.wrike.com/api/v4';
export class Wrike implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wrike',
		name: 'wrike',
		icon: 'file:wrike.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Wrike API',
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
		properties: [
			resources,
			// ----------------------------------
			//         operations
			// ----------------------------------
			operations,
			// ----------------------------------
			//         get task options
			// ----------------------------------
			taskOption,
			metadata,
			{
				displayName: 'ID(s)',
				name: 'ids',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['get', 'put', 'idConverter'],
						resource: ['tasks'],
					},
					hide: {
						taskOption: ['space', 'history', 'folder', 'all'],
					},
				},
				default: '',
				placeholder: 'FF545646,GGF56464',
				description: 'IDs separed by commas',
			},
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['get'],
						resource: ['tasks'],
						taskOption: ['folder'],
					},
					hide: {
						spaceId: undefined,
					},
				},
				default: '',
				placeholder: 'FF545646',
			},
			{
				displayName: 'Space ID',
				name: 'spaceId',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['get'],
						resource: ['tasks'],
						taskOption: ['space'],
					},
					hide: {
						folderId: undefined,
					},
				},
				default: '',
				placeholder: 'FF545646',
			},
		],
	};
	// The execute method will go here
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Handle data coming from previous nodes
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0, null) as string;

		// For each item, make an API call to create a contact
		for (let i = 0; i < items.length; i++) {
			if (resource === 'tasks') {
				const ids = this.getNodeParameter('ids', i) as string;
				const options: OptionsWithUri = {
					headers: {
						Accept: 'application/json',
					},
					uri: '',
					json: true,
				};
				let path = ''
				if (operation === 'idConverter') {
					options.method = 'GET';
					path = `/ids?ids=[${ids}]&type=ApiV2Task`;
				} else {
					options.method = operation.toUpperCase();

					if (operation === 'get') {
						const taskOption = this.getNodeParameter('taskOption', i) as string;
						const spaceId = this.getNodeParameter('spaceId', i, null) as string;
						const folderId = this.getNodeParameter('folderId', i, null) as string;
						switch (taskOption) {
							case 'ids':
								path = `/tasks/${ids}`;
								break;
							case 'folder':
								path = `/folders/${folderId}/tasks`;
								break;
							case 'space':
								path = `/spaces/${spaceId}/tasks`;
								break;
							case 'history':
								path = `/tasks/${ids}/tasks_history`;
								break;
							default:
								path = `/tasks`;
								break;
						}
					} else if (operation === 'put') {
						const metadata = this.getNodeParameter('metadataEdit', i) as {metadataValues:Array<{name:string, value:any}>};
						path = `/tasks/${ids}`;
						options.body =  metadata.metadataValues?.reduce(
							(obj, item) => Object.assign(obj, { [item.name]: item.value }), {})
						console.log(metadata, options);
					}
				}
        options.uri = `${baseURL}${path}`
        responseData = await this.helpers.requestWithAuthentication.call(
          this,
          'wrikeApi',
          options,
        );
        returnData.push(responseData);
			}
		}
		// Map data to n8n data structure
		return [this.helpers.returnJsonArray(returnData)];
	}
}
