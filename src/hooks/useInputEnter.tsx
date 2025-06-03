export function useInputAlfanumerico(
  /*se traen desde el componente "Entrada" los valores de input y setInput */
  enhancedFetch: (valor: string) => void,
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
) {
  {
    /*SOLO PERMITE VALORES ALFANUMERICOS Y EN MAYUSCULAS DENTRO DEL INPUT*/
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const alfanumeric = raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    setInputValue(alfanumeric);
  };
  {
    /*AL PRESIONAR ENTER ACTIVA LA FUNCION HANLDEQUERY PASANDO 
    COMO PARAMETRO LO QUE SE HAYA ESCRITO EN EL INPUT*/
  }
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      enhancedFetch(inputValue);
    }
  };

  return { inputValue, handleChange, handleEnter };
}
