export default function ContactCard({ contact, onDelete, onEdit }) {
  return (
    <div className="contact-card">
      <strong>{contact.name}</strong>
      <span><b>Telefone:</b> {contact.phone}</span>
      {contact.email && <span><b>E-mail:</b> {contact.email}</span>}
      {contact.address && <span><b>Endereço:</b> {contact.address}</span>}
      {contact.notes && <span><b>Anotação:</b> {contact.notes}</span>}
      <div className="actions">
        <button onClick={() => onEdit(contact)}>Editar</button>
        <button onClick={() => onDelete(contact._id)}>Excluir</button>
      </div>
    </div>
  );
}