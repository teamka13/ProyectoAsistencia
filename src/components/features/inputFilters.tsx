export const soloLetras = (e: React.FormEvent<HTMLInputElement>) => {
  const value = e.currentTarget.value;
  const soloLetras = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
  e.currentTarget.value = soloLetras;
};
export const soloNumeros = (e: React.FormEvent<HTMLInputElement>) => {
  const value = e.currentTarget.value;
  const soloNumeros = value.replace(/[^0-9]/g, "");
  e.currentTarget.value = soloNumeros;
};
export const soloCURP = (e: React.FormEvent<HTMLInputElement>) => {
  const value = e.currentTarget.value;
  const limpio = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  e.currentTarget.value = limpio;
};
export const hanldeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.currentTarget.value;
  const alfanumeric = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  e.currentTarget.value = alfanumeric;
};

export const validarNSS = (nss: string): true | string => {
  if (!/^\d{11}$/.test(nss)) {
    return "Debe contener exactamente 11 dígitos";
  }

  const afiliacion = parseInt(nss.slice(0, 2)); // AA
  const nacimiento = parseInt(nss.slice(2, 4)); // BB
  const delegacion = parseInt(nss.slice(4, 6)); // CC

  if (nacimiento > afiliacion) {
    return "El año de nacimiento no puede ser mayor al de afiliación";
  }

  if (delegacion < 1 || delegacion > 99) {
    return "Delegación inválida (debe estar entre 01 y 99)";
  }

  return true;
};
