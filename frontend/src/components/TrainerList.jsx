function TrainerList({ trainers }) {
  if (trainers.length === 0) {
    return <p className="text-muted">Nessun trainer presente.</p>;
  }

  return (
    <>
      <h2 className="mb-3">Trainer</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-primary">
            <tr>
              <th>Cognome</th>
              <th>Nome</th>
              <th>Specialità</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer.id}>
                <td>{trainer.surname}</td>
                <td>{trainer.name}</td>
                <td>{trainer.speciality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TrainerList;
