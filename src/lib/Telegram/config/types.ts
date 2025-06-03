export interface TelegramUpdate {
  update_id: number;
  message?: {
    chat: {
      id: number;
    };
    text?: string;
    contact?: {
      phone_number: string;
      first_name: string;
      last_name?: string;
      user_id?: number;
    };
  };
}
