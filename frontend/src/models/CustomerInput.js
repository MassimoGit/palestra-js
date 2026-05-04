export class CustomerInput {
  #name;
  #surname;
  #email;
  #trainer_id;

  constructor(name, surname, email, trainer_id) {
    if (typeof name !== 'string' || name.trim() === '')
      throw new Error('name deve essere una stringa non vuota');
    if (typeof surname !== 'string' || surname.trim() === '')
      throw new Error('surname deve essere una stringa non vuota');
    if (typeof email !== 'string' || email.trim() === '')
      throw new Error('email deve essere una stringa non vuota');
    if (typeof trainer_id !== 'number' || trainer_id <= 0)
      throw new Error('trainer_id deve essere un numero positivo');

    this.#name = name.trim();
    this.#surname = surname.trim();
    this.#email = email.trim();
    this.#trainer_id = trainer_id;
  }

  get name()       { return this.#name; }
  get surname()    { return this.#surname; }
  get email()      { return this.#email; }
  get trainer_id() { return this.#trainer_id; }

  toJSON() {
    return {
      name: this.#name,
      surname: this.#surname,
      email: this.#email,
      trainer_id: this.#trainer_id,
    };
  }
}
