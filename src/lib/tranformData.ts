export const transformarDatos = (data: any) => {
  const datosTransformados: any = {};
  Object.keys(data).forEach((key) => {
    const valor = data[key];
    datosTransformados[key] = valor === "" ? null : valor;
  });
  return datosTransformados;
};
