export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<id>[a-z0-9\-_]+)')

  const pathRegex = newRegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex;
}