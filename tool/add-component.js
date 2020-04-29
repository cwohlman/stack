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
  const template = getTemplate(name, componentType);
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
function getDefaultRoute(componentType, featureName, componentName) {
  if (componentType === 'view') {
    const componentPath = featureName === componentName ? featureName : `${featureName}/${componentName}`
    return `Views/${componentPath}`;
  }
}
function assignRoute(type, name, longName, route) {
  if (!route) {
    return;
  }
  if (type === 'view') {
    const importLine = `import { ${name} as ${longName} } from '../features/views'`;
    let result = fs.readFileSync('client/routes.ts', 'utf-8');
    if (result.indexOf(importLine) === -1) {
      const indexOfLastImport = getLastIndexOf(result, /^.+import.+$/)
      let front = result.slice(0, indexOfLastImport);
      let back = result.slice(indexOfLastImport);

      if (front.length && front[front.length - 1] !== '\n') {
        front += '\n'
      }

      result = front + importLine + '\n' + back;
    }
    const exportLine = `  [${JSON.stringify(route)}]: ${longName},`;
    if (result.indexOf(exportLine) === -1) {
      const indexOfLastExport = getLastIndexOf(result, /.+\[.+\].+/);
      if (indexOfLastExport === 0) {
        result = result + `\nconst routes = {\n${exportLine}\n};\nexport default routes;\n`;
      } else {
        let front = result.slice(0, indexOfLastExport);
        let back = result.slice(indexOfLastExport);

        if (front[front.length - 1] !== '\n') {
          front += '\n'
        }
        if (back[0] !== '\n') {
          back = '\n' + back;
        }

        result = front + exportLine + back;
      }
    }
    fs.writeFileSync('client/routes.ts', result);
  }
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
