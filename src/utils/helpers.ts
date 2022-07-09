export const transformObjectRecursive = (property: any) => {
  const isObject = property instanceof Object && !Array.isArray(property);
  const isArray = Array.isArray(property);

  if (isObject) {
    const entries = Object.entries(property);
    const result = entries.reduce((acc, [key, value]) => {
      acc[key] = transformObjectRecursive(value);
      return acc;
    }, {});
    return result;
  }

  if (property?.length === 1 && property[0]?.codigo_objeto_cliente) {
    return property[0] instanceof Object ? [transformObjectRecursive(property[0])] : property[0];
  }

  if (property?.length === 1) {
    return property[0] instanceof Object ? transformObjectRecursive(property[0]) : property[0];
  }

  if (isArray) return property.map(transformObjectRecursive);

  return property;
};
