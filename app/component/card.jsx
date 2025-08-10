import React from 'react';

// Utilitaires
function formatDate(dateString) {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function getRoleBadgeClass(role) {
  switch(role) {
    case 'admin': return 'primary';
    case 'editor': return 'warning';
    case 'user': return 'success';
    default: return 'secondary';
  }
}

function getRoleLabel(role) {
  switch(role) {
    case 'admin': return 'Administrateur';
    case 'editor': return 'Éditeur';
    case 'user': return 'Utilisateur';
    default: return role;
  }
}

function getStatusBadgeClass(status) {
  switch(status) {
    case 'confirmed': return 'success';
    case 'pending': return 'warning';
    case 'failed': return 'danger';
    default: return 'secondary';
  }
}

function getStatusLabel(status) {
  switch(status) {
    case 'confirmed': return 'Confirmé';
    case 'pending': return 'En attente';
    case 'failed': return 'Échoué';
    default: return status;
  }
}

// Composant Publication
function PublicationCard({ publication, onDelete }) {
  return (
    <div className="publication-card">
      <div className="publication-image">
        {publication.imageUrl ? (
          <img src={publication.imageUrl} alt={publication.title} />
        ) : (
          <div style={{
            width: '100%',
            height: '12rem',
            backgroundColor: 'var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: 'var(--gray-400)' }}>Aucune image</span>
          </div>
        )}
      </div>
      <div className="publication-content">
        <h4>{publication.title}</h4>
        <p>{publication.content}</p>
        <div className="publication-footer">
          <span className={`badge ${publication.status === 'published' ? 'success' : 'warning'}`}>
            {publication.status === 'published' ? 'Publié' : 'Brouillon'}
          </span>
          <div className="action-buttons">
            <button className="btn-icon">
              <i className="fas fa-edit"></i>
            </button>
            <button className="btn-icon danger" onClick={() => onDelete(publication.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant Ligne Utilisateur
function UserRow({ user, onDelete }) {
  return (
    <tr>
      <td>
        <div className="user-cell">
          <div className="user-avatar">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</div>
          <div className="user-info">
            <div className="user-name">{user.firstName} {user.lastName}</div>
            <div className="user-date">Rejoint le {formatDate(user.joinDate)}</div>
          </div>
        </div>
      </td>
      <td>{user.email}</td>
      <td><span className={`badge ${getRoleBadgeClass(user.role)}`}>{getRoleLabel(user.role)}</span></td>
      <td><span className={`badge ${user.isActive ? 'success' : 'danger'}`}>{user.isActive ? 'Actif' : 'Inactif'}</span></td>
      <td>
        <div className="action-buttons">
          <button className="btn-icon"><i className="fas fa-eye"></i></button>
          <button className="btn-icon"><i className="fas fa-edit"></i></button>
          <button className="btn-icon danger" onClick={() => onDelete(user.id)}>
            <i className="fas fa-user-times"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

// Composant Ligne Donation
function DonationRow({ donation }) {
  return (
    <tr>
      <td>
        <div className="table-cell-title">{donation.donorName}</div>
        <div className="table-cell-subtitle">{donation.donorEmail}</div>
      </td>
      <td className="font-semibold">€{donation.amount.toFixed(2)}</td>
      <td className="table-cell-date">{formatDate(donation.date)}</td>
      <td>
        <span className={`badge ${getStatusBadgeClass(donation.status)}`}>
          {getStatusLabel(donation.status)}
        </span>
      </td>
    </tr>
  );
}

export { PublicationCard, UserRow, DonationRow };