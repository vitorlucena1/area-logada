export default function ContactCard({ contact, onDelete, onEdit }) {
  return (
    <div className="contact-card">
      <strong>{contact.name}</strong>
      <span>{contact.phone}</span>
      {contact.email && <span>{contact.email}</span>}
      {contact.address && <span>{contact.address}</span>}
      {contact.notes && <span>{contact.notes}</span>}
      <div className="actions">
        <button onClick={() => onEdit(contact)}>Editar</button>
        <button onClick={() => onDelete(contact._id)}>Excluir</button>
      </div>
    </div>
  );
}