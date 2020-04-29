export default function addComponent(
  featureName,
  componentName = featureName,
  componentType = "view",
  route = null
) {
  // TODO replace every usage of controller with endpoint
  // mkdir -p featureName
  // write featureName / featureName + componentType + .ts(x)?
  // append `export { default as featureName } from  featureName / featureName + componentType + .ts(x)? to (features/views | controllers | data)
  // update the route table if a route is specified
  // Note: route is required for server database collections (route is used as the collection name when connecting to a real db), we may support client only collections?
}
