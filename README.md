![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)
![Wrike logo](https://upload.wikimedia.org/wikipedia/commons/2/24/Wrike_logo.png)


# n8n-nodes-wrike

# Wrike N8N Node

This node is designed to interface with the [Wrike API](https://developers.wrike.com/api/v4/) from within the [n8n](https://n8n.io) workflow automation tool. It currently supports tasks related operations such as 'Get', 'Edit' and 'IDs Converter'. This node is a transform group node and will act as an intermediary between Wrike API and your n8n workflow.

## Features

The Wrike node includes the following operations:

- **Get**: Retrieves tasks from Wrike. This operation supports getting all tasks, tasks in a folder, tasks by IDs, tasks history, and tasks in a space.
- **Edit**: Modifies a task in Wrike. This operation supports editing metadata.
- **IDs Converter**: Converts a task ID in Wrike.

## Usage

To use this node, you need to have Wrike API credentials. You can get them by creating an app on the Wrike Developers portal. Once you have your API credentials, enter them in the credentials section of the Wrike node in n8n.

You can then select the desired resource ('Task' by default) and operation, and fill in the additional fields as necessary. If you're using the 'Get' operation, you also have to choose the task option. For the 'Edit' operation, you have to provide the metadata to edit in the form of key-value pairs.

## Contributing

Feel free to contribute to the development of this node by submitting issues or pull requests. For more information about contributing to n8n nodes, refer to the [n8n documentation](https://docs.n8n.io/nodes/creating-nodes/create-node.html).

## License

The Wrike node for n8n is licensed under the [MIT License](https://opensource.org/licenses/MIT).
