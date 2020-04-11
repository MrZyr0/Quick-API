# Quick API

## Usage

### Postman collection to ordered data

1. Create your collection and organize your requests by entities (database tables for example)
2. Right clic on a collection > Get public link
3. Open the link in your browser and save it in a json file
4. Start the script `node postman_collection_parser_from_public_link_file.js > API.json` after edit the path to your json file
5. Use bash commands to save the output into a file

### Ordered data to markdown

To create the markdown from the ordered data, you just need to run the script with the data name `API.json` or change the path in the script.
`node data_to_markdown.js > API.md`