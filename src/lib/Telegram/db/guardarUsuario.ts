import { UpdateData } from "./UpdateData";

export async function guardarUsuario({
  telegram_id,
  phone_number,
  first_name,
  last_name,
}: {
  telegram_id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
}) {
  return await UpdateData({ telegram_id, phone_number, first_name, last_name });
}
