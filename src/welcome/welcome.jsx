import React, { useState } from "react";
import "./styles.css";

export default function Welcome() { 
  const [activeSection, setActiveSection] = useState("dashboard");
  const [openedModal, setOpenedModal] = useState(null); // null ou 'reportModal' / 'publicationModal' / 'userModal'

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  function openModal(modalId) {
    setOpenedModal(modalId);
  }

  function closeModal(modalId) {
    // tu peux vérifier modalId si tu veux
    setOpenedModal(null);
  }

  return (
    <> 
      {/* Modals */}
      <div id="reportModal" className={`modal ${openedModal === "reportModal" ? "active" : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h3>Créer un Nouveau Rapport</h3>
            <button className="modal-close" onClick={() => closeModal("reportModal")}>
              &times;
            </button>
          </div>
          <form className="modal-form">
            {/* champs du formulaire */}
            <div className="form-group">
              <label htmlFor="reportTitle">Titre du rapport</label>
              <input type="text" id="reportTitle" placeholder="Entrez le titre..." />
            </div>
            <div className="form-group">
              <label htmlFor="reportDescription">Description</label>
              <textarea id="reportDescription" rows={3} placeholder="Entrez la description..."></textarea>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => closeModal("reportModal")}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                Créer
              </button>
            </div>
          </form>
        </div>
      </div>

      <div id="publicationModal" className={`modal ${openedModal === "publicationModal" ? "active" : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h3>Créer une Nouvelle Publication</h3>
            <button className="modal-close" onClick={() => closeModal("publicationModal")}>
              &times;
            </button>
          </div>
          <form className="modal-form">
                {/* Titre */}
                <div className="form-group">
                  <label htmlFor="reportTitle">Titre du publication</label>
                  <input type="text" id="reportTitle" placeholder="Entrez le titre..." />
                </div>

                {/* URL du fichier */}
                <div className="form-group">
                  <label htmlFor="fileUrl">Fichier</label>
                  <input type="url" id="fileUrl" placeholder="Entrez le url..." />
                </div>

                {/* Radios sur une ligne */}
                <div className="form-group">
                  <label htmlFor="type">Type de fichier :</label>
                 <div style={{ display: "flex", gap: "20px", marginTop: "5px" }}>
                    <label>
                      <input type="radio" name="fileType" value="image" />{' '}
                      Image
                    </label>
                    <label>
                      <input type="radio" name="fileType" value="video" />{' '}
                      Vidéo
                    </label>
                    <label>
                      <input type="radio" name="fileType" value="doc" />{' '}
                      Document
                    </label>
                  </div> 
                </div>

                {/* Description */}
                <div className="form-group">
                  <label htmlFor="reportDescription">Description</label>
                  <textarea id="reportDescription" rows={3} placeholder="Entrez la description..."></textarea>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => closeModal("reportModal")}>
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Créer
                  </button>
                </div>
              </form>

        </div>
      </div>

      <div id="userModal" className={`modal ${openedModal === "userModal" ? "active" : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h3>Créer une Nouvelle Utilisateur</h3>
            <button className="modal-close" onClick={() => closeModal("publicationModal")}>
              &times;
            </button>
          </div>
        <form className="modal-form">
                {/* Nom */}
                <div className="form-group">
                  <label htmlFor="userName">Nom</label>
                  <input type="text" id="userName" placeholder="Entrez le nom..." />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="userEmail">Email</label>
                  <input type="email" id="userEmail" placeholder="Entrez l'email..." />
                </div>

                {/* Role */}
                <div className="form-group">
                  <label htmlFor="userRole">Rôle</label>
                  <select id="userRole" defaultValue="">
                    <option value="" disabled>
                      Sélectionnez un rôle
                    </option>
                    <option value="admin">Admin</option>
                    <option value="simpleUser">Simple User</option>
                  </select>
                </div>

                {/* Status */}
                <div className="form-group">
                  <label htmlFor="status user">Statut</label>
                  <div style={{ display: "flex", gap: "20px", marginTop: "5px" }}>
                    <label>
                      <input type="radio" name="status" value="actif" defaultChecked />
                      {' '}Actif
                    </label>
                    <label>
                      <input type="radio" name="status" value="desactive" />
                      {' '}Désactivé
                    </label>
                  </div>
                </div> 
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => closeModal("reportModal")}>
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Créer
                  </button>
                </div>
              </form>

        </div>
      </div> 

<div
  id="donationReportModal"
  className={`modal ${openedModal === "donationReportModal" ? "active" : ""}`}
>
  <div className="modal-content">
    <div className="modal-header">
      <h3>Générer un Rapport de Donation</h3>
      <button
        className="modal-close"
        onClick={() => closeModal("donationReportModal")}
      >
        &times;
      </button>
    </div>
    <form className="modal-form" onSubmit={(e) => {
      e.preventDefault();
      // ici ta logique pour générer le rapport
      closeModal("donationReportModal");
    }}>
      <div className="form-group">
        <label htmlFor="donateur">Donateur</label>
        <input
          type="text"
          id="donateur"
          name="donateur"
          placeholder="Nom du donateur"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="montant">Montant (€)</label>
        <input
          type="number"
          id="montant"
          name="montant"
          placeholder="Montant du don"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" required />
      </div>

      <div className="form-group">
        <label htmlFor="status">Statut</label>
        <div style={{ display: "flex", gap: "20px", marginTop: "5px" }}>
          <label>
            <input type="radio" name="statut" value="confirmé" defaultChecked /> Confirmé
          </label>
          <label>
            <input type="radio" name="statut" value="en attente" /> En attente
          </label>
        </div>
      </div>

      <div className="modal-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => closeModal("donationReportModal")}
        >
          Annuler
        </button>
        <button type="submit" className="btn btn-primary">
          Générer
        </button>
      </div>
    </form>
  </div>
</div>

 {/* FIN MODAL  */}


      <aside className="sidebar" id="sidebar">
        <div className="sidebar-header">
          <h1>Admin Dashboard</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a
                href="#dashboard"
                className={`nav-link ${activeSection === "dashboard" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("dashboard");
                }}
                data-section="dashboard"
              >
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#reports"
                className={`nav-link ${activeSection === "reports" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("reports");
                }}
                data-section="reports"
              >
                <i className="fas fa-file-alt"></i>
                <span>Rapports</span>
              </a>
            </li>
            <li>
              <a
                href="#publications"
                className={`nav-link ${activeSection === "publications" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("publications");
                }}
                data-section="publications"
              >
                <i className="fas fa-newspaper"></i>
                <span>Publications</span>
              </a>
            </li>
            <li>
              <a
                href="#users"
                className={`nav-link ${activeSection === "users" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("users");
                }}
                data-section="users"
              >
                <i className="fas fa-users"></i>
                <span>Utilisateurs</span>
              </a>
            </li>
            <li>
              <a
                href="#donations"
                className={`nav-link ${activeSection === "donations" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("donations");
                }}
                data-section="donations"
              >
                <i className="fas fa-heart"></i>
                <span>Donations</span>
              </a>
            </li>
          </ul>
         <div className="sidebar-footer">
              <button className="nav-link" onClick={null}>
                <i className="fas fa-cog"></i>
                <span>Paramètres</span>
              </button>

              <button className="nav-link logout" onClick={null}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Déconnexion</span>
              </button>
            </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button className="mobile-menu-btn" id="mobileMenuBtn">
              <i className="fas fa-bars"></i>
            </button>
            <h2 id="pageTitle">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
            </button>
            <div className="user-profile">
              <div className="avatar">A</div>
              <span>Admin User</span>
            </div>
          </div>
        </header>

        {/* Sections */}

        {/* Dashboard Section */}
        <section
          id="dashboard-section"
          className={`content-section ${activeSection === "dashboard" ? "active" : "hidden"}`}
        >
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon primary">
                <i className="fas fa-file-alt"></i>
              </div>
              <div className="stat-content">
                <h3 id="totalReports">1</h3>
                <p>Total Rapports</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon success">
                <i className="fas fa-newspaper"></i>
              </div>
              <div className="stat-content">
                <h3 id="totalPublications">1</h3>
                <p>Publications</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon purple">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <h3 id="totalUsers">1</h3>
                <p>Utilisateurs</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon danger">
                <i className="fas fa-heart"></i>
              </div>
              <div className="stat-content">
                <h3 id="totalDonations">€50</h3>
                <p>Donations</p>
              </div>
            </div>
          </div>

          <div className="activity-card">
            <h3>Activité Récente</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-dot primary"></div>
                <div className="activity-content">
                  <p>Nouveau rapport publié: "Rapport Mensuel Janvier 2024"</p>
                  <span className="activity-time">Il y a 2 heures</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot success"></div>
                <div className="activity-content">
                  <p>Nouvel utilisateur créé: Marie Dubois</p>
                  <span className="activity-time">Il y a 4 heures</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot warning"></div>
                <div className="activity-content">
                  <p>Nouvelle donation reçue: €50</p>
                  <span className="activity-time">Il y a 6 heures</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reports Section */}
        <section
          id="reports-section"
          className={`content-section ${activeSection === "reports" ? "active" : "hidden"}`}
        >
          <div className="section-header">
            <h3>Gestion des Rapports</h3>
            <button className="btn btn-primary" onClick={() => openModal("reportModal")}>
              <i className="fas fa-plus"></i> Nouveau Rapport
            </button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Statut</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="reportsTable">
                <tr>
                  <td>
                    <div className="table-cell-title">Rapport Financier Q1 2024</div>
                    <div className="table-cell-subtitle">Rapport trimestriel des finances</div>
                  </td>
                  <td>
                    <span className="badge success">Publié</span>
                  </td>
                  <td className="table-cell-date">7 jan. 2025</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn-icon">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-icon danger">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Publications Section */}
        <section
          id="publications-section"
          className={`content-section ${activeSection === "publications" ? "active" : "hidden"}`}
        >
          <div className="section-header">
            <h3>Gestion des Publications</h3>
            <button className="btn btn-primary" onClick={() => openModal("publicationModal")}>
              <i className="fas fa-plus"></i> Nouvelle Publication
            </button>
          </div>
          <div className="publications-grid">
            <div className="publication-card">
              <div className="publication-image">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200"
                  alt="Publication"
                />
              </div>
              <div className="publication-content">
                <h4>Guide des Bonnes Pratiques</h4>
                <p>Un guide complet pour améliorer les processus organisationnels...</p>
                <div className="publication-footer">
                  <span className="badge success">Publié</span>
                  <div className="action-buttons">
                    <button className="btn-icon">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn-icon danger">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Users Section */}
        <section
          id="users-section"
          className={`content-section ${activeSection === "users" ? "active" : "hidden"}`}
        >
          <div className="section-header">
            <h3>Gestion des Utilisateurs</h3>
            <button className="btn btn-primary" onClick={() => openModal("userModal")}>
              <i className="fas fa-plus"></i> Nouvel Utilisateur
            </button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Utilisateur</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="usersTable">
                <tr>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">AU</div>
                      <div className="user-info">
                        <div className="user-name">Admin User</div>
                        <div className="user-date">Rejoint le 7 jan. 2025</div>
                      </div>
                    </div>
                  </td>
                  <td>admin@example.com</td>
                  <td>
                    <span className="badge primary">Administrateur</span>
                  </td>
                  <td>
                    <span className="badge success">Actif</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn-icon">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-icon danger">
                        <i className="fas fa-user-times"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Donations Section */}
        <section
          id="donations-section"
          className={`content-section ${activeSection === "donations" ? "active" : "hidden"}`}
        >
          <div className="section-header">
            <h3>Suivi des Donations</h3> 
            <button className="btn btn-primary" onClick={() => openModal("donationReportModal")}>Générer Rapport</button>
          </div>

          <div className="donation-stats">
            <div className="stat-card">
              <div className="stat-content">
                <h3>€50</h3>
                <p>Total ce mois</p>
                <span className="trend success">+12% vs mois dernier</span>
              </div>
              <div className="stat-icon success">
                <i className="fas fa-trending-up"></i>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-content">
                <h3>1</h3>
                <p>Nombre de donateurs</p>
                <span className="trend primary">+3 nouveaux</span>
              </div>
              <div className="stat-icon primary">
                <i className="fas fa-users"></i>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-content">
                <h3>€50</h3>
                <p>Don moyen</p>
                <span className="trend neutral">Stable</span>
              </div>
              <div className="stat-icon purple">
                <i className="fas fa-heart"></i>
              </div>
            </div>
          </div>

          <div className="donations-card">
            <h3>Donations Récentes</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Donateur</th>
                    <th>Montant</th>
                    <th>Date</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="table-cell-title">Sophie Leroux</div>
                      <div className="table-cell-subtitle">sophie.leroux@email.com</div>
                    </td>
                    <td className="font-semibold">€50.00</td>
                    <td className="table-cell-date">7 jan. 2025</td>
                    <td>
                      <span className="badge success">Confirmé</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

 
    </>
  );
}
