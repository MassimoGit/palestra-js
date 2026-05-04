import { useEffect, useState } from 'react';

const emptyForm = {
  name: '',
  surname: '',
  email: '',
  trainer_id: '',
};

function CustomerForm({ trainers, initialCustomer, onSave, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialCustomer) {
      setFormData({
        name: initialCustomer.name,
        surname: initialCustomer.surname,
        email: initialCustomer.email,
        trainer_id: String(initialCustomer.trainer_id),
      });
      return;
    }
    setFormData(emptyForm);
  }, [initialCustomer]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValid =
    formData.name.trim() !== '' &&
    formData.surname.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.trainer_id !== '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    try {
      await onSave({
        name: formData.name.trim(),
        surname: formData.surname.trim(),
        email: formData.email.trim(),
        trainer_id: Number(formData.trainer_id),
      });
      setFormData(emptyForm);
    } catch (err) {
      alert('Errore: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">{initialCustomer ? 'Modifica customer' : 'Nuovo customer'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Cognome</label>
              <input
                className="form-control"
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Nome</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Trainer</label>
              <select
                className="form-select"
                name="trainer_id"
                value={formData.trainer_id}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Seleziona trainer</option>
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.surname} {trainer.name} — {trainer.speciality}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <button type="submit" className="btn  btn-primary" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Salvataggio...' : (!initialCustomer) ? 'Salva' : 'Modifica'}
            </button>
            {initialCustomer && (
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                <i class="bi bi-backspace-fill me-2"></i> Torna alla creazione nuovo cliente
              </button>
            )}

          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerForm;
