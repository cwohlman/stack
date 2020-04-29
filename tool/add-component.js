const fs = require('fs');

module.exports = function addComponent(
  componentType,
  featureName,
  componentName = featureName,
  route = null
) {
  const name = `${componentName || featureName}${getSuffix(componentType)}`;
  const template = getTemplate(name, componentType);
  const dir = `features/${featureName}`;
  const path = `${dir}/${name}.${getExtension(componentType)}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(path, template);

  exportComponent(componentType, name, path.replace('features', '.').replace(/\.[^.]+$/, ''));

  assignRoute(componentType, name, route);
  // TODO replace every usage of controller with endpoint
  // mkdir -p featureName
  // write featureName / featureName + componentType + .ts(x)?
  // append `export { default as featureName } from  featureName / featureName + componentType + .ts(x)? to (features/views | controllers | data)
  // update the route table if a route is specified
  // Note: route is required for server database collections (route is used as the collection name when connecting to a real db), we may support client only collections?
}

function getTemplate(componentName, componentType) {
  if (componentType === 'view') {
    return (`import React from "react";
import { ClientPorts } from "../ports";

export default function ${componentName}({ ports }: { ports: ClientPorts }) {
  return <div>TODO</div>;
};
`);
  }
  throw new Error('NI')
}
function exportComponent(type, name, path) {
  let exportFile;
  const exportLine = `export { default as ${name} } from '${path}'`
  if (type === 'view') {
    exportFile = 'features/views.ts'
  }
  fs.writeFileSync(
    exportFile,
    fs.readFileSync(exportFile, 'utf-8') + exportLine + ';\n'
  );
}
function assignRoute(type, name) {
  // TODO
}
function getSuffix(componentType) {
  if (componentType === 'view') {
    return 'View';
  }
  throw new Error('NI')
}
function getExtension(componentType) {
  if (componentType === 'view') {
    return 'tsx';
  }
  throw new Error('NI')
}
