function CustomerList({ customers, onEdit, onDelete }) {
  if (customers.length === 0) {
    return <p className="text-muted">Nessun customer presente.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Cognome</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Trainer</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.surname}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.trainer_surname} {customer.trainer_name}</td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => onEdit(customer)}
                  >
                    <i className="bi bi-pencil"></i> Modifica
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(customer.id)}
                  >
                    <i className="bi bi-trash"></i> Elimina
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
