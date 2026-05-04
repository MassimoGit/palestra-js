export class Trainer {
  #id;
  #name;
  #surname;
  #speciality;

  constructor(id, name, surname, speciality) {
    if (typeof name !== 'string' || name.trim() === '')
      throw new Error('name deve essere una stringa non vuota');
    if (typeof surname !== 'string' || surname.trim() === '')
      throw new Error('surname deve essere una stringa non vuota');
    if (typeof speciality !== 'string' || speciality.trim() === '')
      throw new Error('speciality deve essere una stringa non vuota');

    this.#id = id;
    this.#name = name.trim();
    this.#surname = surname.trim();
    this.#speciality = speciality.trim();
  }

  get id()        { return this.#id; }
  get name()      { return this.#name; }
  get surname()   { return this.#surname; }
  get speciality(){ return this.#speciality; }

  get fullName() {
    return `${this.#surname} ${this.#name}`;
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      surname: this.#surname,
      speciality: this.#speciality,
    };
  }

  static fromJSON(obj) {
    return new Trainer(obj.id, obj.name, obj.surname, obj.speciality);
  }
}
