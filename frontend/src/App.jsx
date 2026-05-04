import { useEffect, useState } from 'react';
import { getTrainers } from './api/trainers.js';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from './api/customers.js';
import TrainerList from './components/TrainerList.jsx';
import CustomerList from './components/CustomerList.jsx';
import CustomerForm from './components/CustomerForm.jsx';

function App() {
  const [view, setView] = useState('customers');
  const [trainers, setTrainers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [trainersData, customersData] = await Promise.all([
          getTrainers(),
          getCustomers(),
        ]);
        setTrainers(trainersData);
        setCustomers(customersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSaveCustomer = async (customerData) => {
    if (editingCustomer) {
      const updated = await updateCustomer(editingCustomer.id, customerData);
      setCustomers(customers.map((c) => (c.id === updated.id ? updated : c)));
      setEditingCustomer(null);
      return;
    }
    const created = await createCustomer(customerData);
    setCustomers([created, ...customers]);
  };

  const handleDeleteCustomer = async (id) => {
    await deleteCustomer(id);
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold">
            <i className="bi bi-person-lines-fill me-2"></i>Gestione Palestra
          </span>
          <div className="btn-group">
            <button
              className={'btn btn-outline-light' + (view === 'trainers' ? ' active' : '')}
              onClick={() => setView('trainers')}
            >
              Trainer
            </button>
            <button
              className={'btn btn-outline-light' + (view === 'customers' ? ' active' : '')}
              onClick={() => setView('customers')}
            >
              Customer
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        {error && <div className="alert alert-danger">{error}</div>}
        {isLoading && <p className="text-muted">Caricamento...</p>}

        {!isLoading && view === 'trainers' && (
          <TrainerList trainers={trainers} />
        )}

        {!isLoading && view === 'customers' && (
          <>
            <CustomerForm
              trainers={trainers}
              initialCustomer={editingCustomer}
              onSave={handleSaveCustomer}
              onCancel={() => setEditingCustomer(null)}
            />
            <CustomerList
              customers={customers}
              onEdit={setEditingCustomer}
              onDelete={handleDeleteCustomer}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
