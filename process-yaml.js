const fs = require('fs');
const yaml = require('js-yaml');

try {
  // Read the YAML file
  const yamlContent = fs.readFileSync('/src/build/aliases.yaml');

  // Parse YAML content
  const data = yaml.safeLoad(yamlContent);

  // Do something with the parsed data
  console.log(data);
} catch (error) {
  console.error('Error processing YAML file:', error);
}
