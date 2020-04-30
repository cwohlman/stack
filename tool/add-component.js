const fs = require('fs');

module.exports = function addComponent(
  componentType,
  featureName,
  componentName,
  route = null
) {
  if (! componentName) {
    componentName = featureName;
  }
  const shortName = componentName;
  const suffix = getSuffix(componentType);
  const name = `${shortName}${suffix}`;
  const longName = (componentName === featureName ? featureName : (featureName + componentName)) + suffix;
  const template = getTemplate(name, shortName, componentType);
  const dir = `features/${featureName}`;
  const path = `${dir}/${name}.${getExtension(componentType)}`;


  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, template);

    exportComponent(componentType, name, path.replace('features', '.').replace(/\.[^.]+$/, ''));
  }
  assignRoute(componentType, name, longName, route);
  assignRoute(componentType, name, longName, getDefaultRoute(componentType, featureName, componentName));
}

function getTemplate(componentName, shortName, componentType) {
  if (componentType === 'view') {
    return (`import React from "react";
import { ClientPorts } from "../ports";

export default function ${componentName}({ ports }: { ports: ClientPorts }) {
  return <div>TODO</div>;
};
`);
  }
  if (componentType === 'endpoint') {
    return `import { ServerPort } from "../../infrastructure/serverPort";
import { DatabasePorts } from "../databasePorts";

export default class ${componentName} implements ServerPort<any, any> {
  constructor(
    private ports: DatabasePorts
  ) {}
  async execute(params: any) {
    throw new Error('Not implemented')
  }
}
`
  }
  if (componentType === 'collection') {
    return `import { Collection, ISaveableRecord } from "../../infrastructure/collection";
export class ${shortName} {
  constructor(
    public _id: string,
    fields: any
  ) {
    Object.assign(this, fields);
  }
}
export default class ${componentName} extends Collection<${shortName}> {
  createEmpty(id: string) {
    return new ${shortName}(id, {});
  }
  parseFromRecord(record: ISaveableRecord) {
    return new ${shortName}(record._id, record);
  }
}
`
  }
  return `export default class ${componentName} {}`
}
function exportComponent(type, name, path) {
  let exportFile;
  const exportLine = `export { default as ${name} } from '${path}'`
  if (type === 'view') {
    exportFile = 'features/views.ts'
  }
  if (type === 'endpoint') {
    exportFile = 'features/endpoints.ts'
  }
  if (type === 'collection') {
    exportFile = 'features/collections.ts'
  }
  fs.writeFileSync(
    exportFile,
    fs.readFileSync(exportFile, 'utf-8') + exportLine + ';\n'
  );
}
function getDefaultRoute(componentType, featureName, componentName) {
  if (componentType === 'view') {
    const componentPath = featureName === componentName ? featureName : `${featureName}/${componentName}`
    return `views/${componentPath}`.toLowerCase();
  }
  if (componentType === 'endpoint') {
    const componentPath = featureName === componentName ? featureName : `${featureName}/${componentName}`
    return `api/${componentPath}`.toLowerCase();
  }
  if (componentType === 'collection') {
    const collectionName = featureName === componentName ? featureName : `${featureName}${componentName}`
    return collectionName.toLowerCase();
  }
}
function assignRoute(type, name, longName, route) {
  if (!route) {
    return;
  }
  if (type === 'view') {
    const importLine = `import { ${name} as ${longName} } from '../features/views'`;
    let result = fs.readFileSync('client/routes.ts', 'utf-8');
    result = addComponentToRoutes(result, importLine, route, longName);
    fs.writeFileSync('client/routes.ts', result);
  }
  if (type === 'endpoint') {
    const importLine = `import { ${name} as ${longName} } from '../features/endpoints'`;
    let result = fs.readFileSync('server/routes.ts', 'utf-8');
    result = addComponentToRoutes(result, importLine, route, longName);
    fs.writeFileSync('server/routes.ts', result);
  }
  if (type === 'collection') {
    const importLine = `import { ${name} as ${longName} } from '../features/collections'`;
    let result = fs.readFileSync('server/collections.ts', 'utf-8');
    result = addComponentToRoutes(result, importLine, route, longName);
    fs.writeFileSync('server/collections.ts', result);
  }

  // Other components don't use routes
}
function addComponentToRoutes(result, importLine, route, longName) {
  if (result.indexOf(importLine) === -1) {
    const indexOfLastImport = getLastIndexOf(result, /^.+import.+$/);
    let front = result.slice(0, indexOfLastImport);
    let back = result.slice(indexOfLastImport);
    if (front.length && front[front.length - 1] !== '\n') {
      front += '\n';
    }
    result = front + importLine + '\n' + back;
  }
  const exportLine = `  [${JSON.stringify(route)}]: ${longName},`;
  if (result.indexOf(exportLine) === -1) {
    const indexOfLastExport = getLastIndexOf(result, /.+\[.+\].+/);
    if (indexOfLastExport === 0) {
      result = result + `\nconst routes = {\n${exportLine}\n};\nexport default routes;\n`;
    }
    else {
      let front = result.slice(0, indexOfLastExport);
      let back = result.slice(indexOfLastExport);
      if (front[front.length - 1] !== '\n') {
        front += '\n';
      }
      if (back[0] !== '\n') {
        back = '\n' + back;
      }
      result = front + exportLine + back;
    }
  }
  return result;
}

function getLastIndexOf(text, regex) {
  let remaining = text;
  let index = 0;
  let match;
  while (match = remaining.match(regex)) {
    index += match.index + match[0].length;
    remaining = text.slice(index);
  }
  return index;
}
function getSuffix(componentType) {
  return componentType[0].toUpperCase() + componentType.slice(1);
}
function getExtension(componentType) {
  if (componentType === 'view') {
    return 'tsx';
  }
  return 'ts';
}
