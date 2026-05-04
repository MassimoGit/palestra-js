    export class Customer {
  #id;
  #name;
  #surname;
  #email;
  #trainer_id;
  #trainer_name;
  #trainer_surname;

  constructor(id, name, surname, email, trainer_id, trainer_name, trainer_surname) {
    if (typeof name !== 'string' || name.trim() === '')
      throw new Error('name deve essere una stringa non vuota');
    if (typeof surname !== 'string' || surname.trim() === '')
      throw new Error('surname deve essere una stringa non vuota');
    if (typeof email !== 'string' || email.trim() === '')
      throw new Error('email deve essere una stringa non vuota');
    if (typeof trainer_id !== 'number' || trainer_id <= 0)
      throw new Error('trainer_id deve essere un numero positivo');

    this.#id = id;
    this.#name = name.trim();
    this.#surname = surname.trim();
    this.#email = email.trim();
    this.#trainer_id = trainer_id;
    this.#trainer_name = trainer_name;
    this.#trainer_surname = trainer_surname;
  }

  get id()              { return this.#id; }
  get name()            { return this.#name; }
  get surname()         { return this.#surname; }
  get email()           { return this.#email; }
  get trainer_id()      { return this.#trainer_id; }
  get trainer_name()    { return this.#trainer_name; }
  get trainer_surname() { return this.#trainer_surname; }

  get trainerFullName() {
    return `${this.#trainer_surname} ${this.#trainer_name}`;
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      surname: this.#surname,
      email: this.#email,
      trainer_id: this.#trainer_id,
      trainer_name: this.#trainer_name,
      trainer_surname: this.#trainer_surname,
    };
  }

  static fromJSON(obj) {
    return new Customer(
      obj.id,
      obj.name,
      obj.surname,
      obj.email,
      obj.trainer_id,
      obj.trainer_name,
      obj.trainer_surname
    );
  }
}
