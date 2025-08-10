import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Welcome() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [openedModal, setOpenedModal] = useState(null);
  const handleNavClick = (section) => {
    setActiveSection(section);
  };
  function openModal(modalId) {
    setOpenedModal(modalId);
  }
  function closeModal(modalId) {
    setOpenedModal(null);
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { id: "reportModal", className: `modal ${openedModal === "reportModal" ? "active" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsx("h3", { children: "Créer un Nouveau Rapport" }),
        /* @__PURE__ */ jsx("button", { className: "modal-close", onClick: () => closeModal(), children: "×" })
      ] }),
      /* @__PURE__ */ jsxs("form", { className: "modal-form", children: [
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "reportTitle", children: "Titre du rapport" }),
          /* @__PURE__ */ jsx("input", { type: "text", id: "reportTitle", placeholder: "Entrez le titre..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "reportDescription", children: "Description" }),
          /* @__PURE__ */ jsx("textarea", { id: "reportDescription", rows: 3, placeholder: "Entrez la description..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "modal-actions", children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-secondary", onClick: () => closeModal(), children: "Annuler" }),
          /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary", children: "Créer" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { id: "publicationModal", className: `modal ${openedModal === "publicationModal" ? "active" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsx("h3", { children: "Créer une Nouvelle Publication" }),
        /* @__PURE__ */ jsx("button", { className: "modal-close", onClick: () => closeModal(), children: "×" })
      ] }),
      /* @__PURE__ */ jsxs("form", { className: "modal-form", children: [
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "reportTitle", children: "Titre du publication" }),
          /* @__PURE__ */ jsx("input", { type: "text", id: "reportTitle", placeholder: "Entrez le titre..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "fileUrl", children: "Fichier" }),
          /* @__PURE__ */ jsx("input", { type: "url", id: "fileUrl", placeholder: "Entrez le url..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "type", children: "Type de fichier :" }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "20px", marginTop: "5px" }, children: [
            /* @__PURE__ */ jsxs("label", { children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "fileType", value: "image" }),
              " ",
              "Image"
            ] }),
            /* @__PURE__ */ jsxs("label", { children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "fileType", value: "video" }),
              " ",
              "Vidéo"
            ] }),
            /* @__PURE__ */ jsxs("label", { children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "fileType", value: "doc" }),
              " ",
              "Document"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "reportDescription", children: "Description" }),
          /* @__PURE__ */ jsx("textarea", { id: "reportDescription", rows: 3, placeholder: "Entrez la description..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "modal-actions", children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-secondary", onClick: () => closeModal(), children: "Annuler" }),
          /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary", children: "Créer" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { id: "userModal", className: `modal ${openedModal === "userModal" ? "active" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsx("h3", { children: "Créer une Nouvelle Utilisateur" }),
        /* @__PURE__ */ jsx("button", { className: "modal-close", onClick: () => closeModal(), children: "×" })
      ] }),
      /* @__PURE__ */ jsxs("form", { className: "modal-form", children: [
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "userName", children: "Nom" }),
          /* @__PURE__ */ jsx("input", { type: "text", id: "userName", placeholder: "Entrez le nom..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "userEmail", children: "Email" }),
          /* @__PURE__ */ jsx("input", { type: "email", id: "userEmail", placeholder: "Entrez l'email..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "userRole", children: "Rôle" }),
          /* @__PURE__ */ jsxs("select", { id: "userRole", defaultValue: "", children: [
            /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Sélectionnez un rôle" }),
            /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" }),
            /* @__PURE__ */ jsx("option", { value: "simpleUser", children: "Simple User" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "status user", children: "Statut" }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "20px", marginTop: "5px" }, children: [
            /* @__PURE__ */ jsxs("label", { children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "status", value: "actif", defaultChecked: true }),
              " ",
              "Actif"
            ] }),
            /* @__PURE__ */ jsxs("label", { children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "status", value: "desactive" }),
              " ",
              "Désactivé"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "modal-actions", children: [
          /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-secondary", onClick: () => closeModal(), children: "Annuler" }),
          /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary", children: "Créer" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        id: "donationReportModal",
        className: `modal ${openedModal === "donationReportModal" ? "active" : ""}`,
        children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ jsx("h3", { children: "Générer un Rapport de Donation" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "modal-close",
                onClick: () => closeModal(),
                children: "×"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("form", { className: "modal-form", onSubmit: (e) => {
            e.preventDefault();
            closeModal();
          }, children: [
            /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "donateur", children: "Donateur" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  id: "donateur",
                  name: "donateur",
                  placeholder: "Nom du donateur",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "montant", children: "Montant (€)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  id: "montant",
                  name: "montant",
                  placeholder: "Montant du don",
                  min: "0",
                  step: "0.01",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "date", children: "Date" }),
              /* @__PURE__ */ jsx("input", { type: "date", id: "date", name: "date", required: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "status", children: "Statut" }),
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "20px", marginTop: "5px" }, children: [
                /* @__PURE__ */ jsxs("label", { children: [
                  /* @__PURE__ */ jsx("input", { type: "radio", name: "statut", value: "confirmé", defaultChecked: true }),
                  " Confirmé"
                ] }),
                /* @__PURE__ */ jsxs("label", { children: [
                  /* @__PURE__ */ jsx("input", { type: "radio", name: "statut", value: "en attente" }),
                  " En attente"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "modal-actions", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "btn btn-secondary",
                  onClick: () => closeModal(),
                  children: "Annuler"
                }
              ),
              /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary", children: "Générer" })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("aside", { className: "sidebar", id: "sidebar", children: [
      /* @__PURE__ */ jsx("div", { className: "sidebar-header", children: /* @__PURE__ */ jsx("h1", { children: "Admin Dashboard" }) }),
      /* @__PURE__ */ jsxs("nav", { className: "sidebar-nav", children: [
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "#dashboard",
              className: `nav-link ${activeSection === "dashboard" ? "active" : ""}`,
              onClick: (e) => {
                e.preventDefault();
                handleNavClick("dashboard");
              },
              "data-section": "dashboard",
              children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-tachometer-alt" }),
                /* @__PURE__ */ jsx("span", { children: "Dashboard" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "#reports",
              className: `nav-link ${activeSection === "reports" ? "active" : ""}`,
              onClick: (e) => {
                e.preventDefault();
                handleNavClick("reports");
              },
              "data-section": "reports",
              children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-file-alt" }),
                /* @__PURE__ */ jsx("span", { children: "Rapports" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "#publications",
              className: `nav-link ${activeSection === "publications" ? "active" : ""}`,
              onClick: (e) => {
                e.preventDefault();
                handleNavClick("publications");
              },
              "data-section": "publications",
              children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-newspaper" }),
                /* @__PURE__ */ jsx("span", { children: "Publications" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "#users",
              className: `nav-link ${activeSection === "users" ? "active" : ""}`,
              onClick: (e) => {
                e.preventDefault();
                handleNavClick("users");
              },
              "data-section": "users",
              children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-users" }),
                /* @__PURE__ */ jsx("span", { children: "Utilisateurs" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "#donations",
              className: `nav-link ${activeSection === "donations" ? "active" : ""}`,
              onClick: (e) => {
                e.preventDefault();
                handleNavClick("donations");
              },
              "data-section": "donations",
              children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-heart" }),
                /* @__PURE__ */ jsx("span", { children: "Donations" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sidebar-footer", children: [
          /* @__PURE__ */ jsxs("button", { className: "nav-link", onClick: null, children: [
            /* @__PURE__ */ jsx("i", { className: "fas fa-cog" }),
            /* @__PURE__ */ jsx("span", { children: "Paramètres" })
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "nav-link logout", onClick: null, children: [
            /* @__PURE__ */ jsx("i", { className: "fas fa-sign-out-alt" }),
            /* @__PURE__ */ jsx("span", { children: "Déconnexion" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "main-content", children: [
      /* @__PURE__ */ jsxs("header", { className: "header", children: [
        /* @__PURE__ */ jsxs("div", { className: "header-left", children: [
          /* @__PURE__ */ jsx("button", { className: "mobile-menu-btn", id: "mobileMenuBtn", children: /* @__PURE__ */ jsx("i", { className: "fas fa-bars" }) }),
          /* @__PURE__ */ jsx("h2", { id: "pageTitle", children: activeSection.charAt(0).toUpperCase() + activeSection.slice(1) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "header-right", children: [
          /* @__PURE__ */ jsx("button", { className: "notification-btn", children: /* @__PURE__ */ jsx("i", { className: "fas fa-bell" }) }),
          /* @__PURE__ */ jsxs("div", { className: "user-profile", children: [
            /* @__PURE__ */ jsx("div", { className: "avatar", children: "A" }),
            /* @__PURE__ */ jsx("span", { children: "Admin User" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "section",
        {
          id: "dashboard-section",
          className: `content-section ${activeSection === "dashboard" ? "active" : "hidden"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "stats-grid", children: [
              /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
                /* @__PURE__ */ jsx("div", { className: "stat-icon primary", children: /* @__PURE__ */ jsx("i", { className: "fas fa-file-alt" }) }),
                /* @__PURE__ */ jsxs("div", { className: "stat-content", children: [
                  /* @__PURE__ */ jsx("h3", { id: "totalReports", children: "1" }),
                  /* @__PURE__ */ jsx("p", { children: "Total Rapports" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
                /* @__PURE__ */ jsx("div", { className: "stat-icon success", children: /* @__PURE__ */ jsx("i", { className: "fas fa-newspaper" }) }),
                /* @__PURE__ */ jsxs("div", { className: "stat-content", children: [
                  /* @__PURE__ */ jsx("h3", { id: "totalPublications", children: "1" }),
                  /* @__PURE__ */ jsx("p", { children: "Publications" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
                /* @__PURE__ */ jsx("div", { className: "stat-icon purple", children: /* @__PURE__ */ jsx("i", { className: "fas fa-users" }) }),
                /* @__PURE__ */ jsxs("div", { className: "stat-content", children: [
                  /* @__PURE__ */ jsx("h3", { id: "totalUsers", children: "1" }),
                  /* @__PURE__ */ jsx("p", { children: "Utilisateurs" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
                /* @__PURE__ */ jsx("div", { className: "stat-icon danger", children: /* @__PURE__ */ jsx("i", { className: "fas fa-heart" }) }),
                /* @__PURE__ */ jsxs("div", { className: "stat-content", children: [
                  /* @__PURE__ */ jsx("h3", { id: "totalDonations", children: "€50" }),
                  /* @__PURE__ */ jsx("p", { children: "Donations" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "activity-card", children: [
              /* @__PURE__ */ jsx("h3", { children: "Activité Récente" }),
              /* @__PURE__ */ jsxs("div", { className: "activity-list", children: [
                /* @__PURE__ */ jsxs("div", { className: "activity-item", children: [
                  /* @__PURE__ */ jsx("div", { className: "activity-dot primary" }),
                  /* @__PURE__ */ jsxs("div", { className: "activity-content", children: [
                    /* @__PURE__ */ jsx("p", { children: 'Nouveau rapport publié: "Rapport Mensuel Janvier 2024"' }),
                    /* @__PURE__ */ jsx("span", { className: "activity-time", children: "Il y a 2 heures" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "activity-item", children: [
                  /* @__PURE__ */ jsx("div", { className: "activity-dot success" }),
                  /* @__PURE__ */ jsxs("div", { className: "activity-content", children: [
                    /* @__PURE__ */ jsx("p", { children: "Nouvel utilisateur créé: Marie Dubois" }),
                    /* @__PURE__ */ jsx("span", { className: "activity-time", children: "Il y a 4 heures" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "activity-item", children: [
                  /* @__PURE__ */ jsx("div", { className: "activity-dot warning" }),
                  /* @__PURE__ */ jsxs("div", { className: "activity-content", children: [
                    /* @__PURE__ */ jsx("p", { children: "Nouvelle donation reçue: €50" }),
                    /* @__PURE__ */ jsx("span", { className: "activity-time", children: "Il y a 6 heures" })
                  ] })
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "section",
        {
          id: "reports-section",
          className: `content-section ${activeSection === "reports" ? "active" : "hidden"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
              /* @__PURE__ */ jsx("h3", { children: "Gestion des Rapports" }),
              /* @__PURE__ */ jsxs("button", { className: "btn btn-primary", onClick: () => openModal("reportModal"), children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-plus" }),
                " Nouveau Rapport"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "table-container", children: /* @__PURE__ */ jsxs("table", { className: "data-table", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { children: "Titre" }),
                /* @__PURE__ */ jsx("th", { children: "Statut" }),
                /* @__PURE__ */ jsx("th", { children: "Date" }),
                /* @__PURE__ */ jsx("th", { children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { id: "reportsTable", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsxs("td", { children: [
                  /* @__PURE__ */ jsx("div", { className: "table-cell-title", children: "Rapport Financier Q1 2024" }),
                  /* @__PURE__ */ jsx("div", { className: "table-cell-subtitle", children: "Rapport trimestriel des finances" })
                ] }),
                /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", { className: "badge success", children: "Publié" }) }),
                /* @__PURE__ */ jsx("td", { className: "table-cell-date", children: "7 jan. 2025" }),
                /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "action-buttons", children: [
                  /* @__PURE__ */ jsx("button", { className: "btn-icon", children: /* @__PURE__ */ jsx("i", { className: "fas fa-eye" }) }),
                  /* @__PURE__ */ jsx("button", { className: "btn-icon", children: /* @__PURE__ */ jsx("i", { className: "fas fa-edit" }) }),
                  /* @__PURE__ */ jsx("button", { className: "btn-icon danger", children: /* @__PURE__ */ jsx("i", { className: "fas fa-trash" }) })
                ] }) })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "section",
        {
          id: "publications-section",
          className: `content-section ${activeSection === "publications" ? "active" : "hidden"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
              /* @__PURE__ */ jsx("h3", { children: "Gestion des Publications" }),
              /* @__PURE__ */ jsxs("button", { className: "btn btn-primary", onClick: () => openModal("publicationModal"), children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-plus" }),
                " Nouvelle Publication"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "publications-grid", children: /* @__PURE__ */ jsxs("div", { className: "publication-card", children: [
              /* @__PURE__ */ jsx("div", { className: "publication-image", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200",
                  alt: "Publication"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "publication-content", children: [
                /* @__PURE__ */ jsx("h4", { children: "Guide des Bonnes Pratiques" }),
                /* @__PURE__ */ jsx("p", { children: "Un guide complet pour améliorer les processus organisationnels..." }),
                /* @__PURE__ */ jsxs("div", { className: "publication-footer", children: [
                  /* @__PURE__ */ jsx("span", { className: "badge success", children: "Publié" }),
                  /* @__PURE__ */ jsxs("div", { className: "action-buttons", children: [
                    /* @__PURE__ */ jsx("button", { className: "btn-icon", children: /* @__PURE__ */ jsx("i", { className: "fas fa-edit" }) }),
                    /* @__PURE__ */ jsx("button", { className: "btn-icon danger", children: /* @__PURE__ */ jsx("i", { className: "fas fa-trash" }) })
                  ] })
                ] })
              ] })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "section",
        {
          id: "users-section",
          className: `content-section ${activeSection === "users" ? "active" : "hidden"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
              /* @__PURE__ */ jsx("h3", { children: "Gestion des Utilisateurs" }),
              /* @__PURE__ */ jsxs("button", { className: "btn btn-primary", onClick: () => openModal("userModal"), children: [
                /* @__PURE__ */ jsx("i", { className: "fas fa-plus" }),
                " Nouvel Utilisateur"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "table-container", children: /* @__PURE__ */ jsxs("table", { className: "data-table", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { children: "Utilisateur" }),
                /* @__PURE__ */ jsx("th", { children: "Email" }),
                /* @__PURE__ */ jsx("th", { children: "Rôle" }),
                /* @__PURE__ */ jsx("th", { children: "Statut" }),
                /* @__PURE__ */ jsx("th", { children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { id: "usersTable", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "user-cell", children: [
                  /* @__PURE__ */ jsx("div", { className: "user-avatar", children: "AU" }),
                  /* @__PURE__ */ jsxs("div", { className: "user-info", children: [
                    /* @__PURE__ */ jsx("div", { className: "user-name", children: "Admin User" }),
                    /* @__PURE__ */ jsx("div", { className: "user-date", children: "Rejoint le 7 jan. 2025" })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("td", { children: "admin@example.com" }),
                /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", { className: "badge primary", children: "Administrateur" }) }),
                /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", { className: "badge success", children: "Actif" }) }),
                /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "action-buttons", children: [
                  /* @__PURE__ */ jsx("button", { className: "btn-icon", children: /* @__PURE__ */ jsx("i", { className: "fas fa-eye" }) }),
                  /* @__PURE__ */ jsx("button", { className: "btn-icon", children: /* @__PURE__ */ jsx("i", { className: "fas fa-edit" }) }),
                  /* @__PURE__ */ jsx("button", { className: "btn-icon danger", children: /* @__PURE__ */ jsx("i", { className: "fas fa-user-times" }) })
                ] }) })
              ] }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "section",
        {
          id: "donations-section",
          className: `content-section ${activeSection === "donations" ? "active" : "hidden"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "section-header", children: [
              /* @__PURE__ */ jsx("h3", { children: "Suivi des Donations" }),
              /* @__PURE__ */ jsx("button", { className: "btn btn-primary", onClick: () => openModal("donationReportModal"), children: "Générer Rapport" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "donation-stats", children: [
              /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
                /* @__PURE__ */ jsxs("div", { className: "stat-content", children: [
                  /* @__PURE__ */ jsx("h3", { children: "€50" }),
                  /* @__PURE__ */ jsx("p", { children: "Total ce mois" }),
                  /* @__PURE__ */ jsx("span", { className: "trend success", children: "+12% vs mois dernier" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "stat-icon success", children: /* @__PURE__ */ jsx("i", { className: "fas fa-trending-up" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
                /* @__PURE__ */ jsxs("div", { className: "stat-content", children: [
                  /* @__PURE__ */ jsx("h3", { children: "1" }),
                  /* @__PURE__ */ jsx("p", { children: "Nombre de donateurs" }),
                  /* @__PURE__ */ jsx("span", { className: "trend primary", children: "+3 nouveaux" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "stat-icon primary", children: /* @__PURE__ */ jsx("i", { className: "fas fa-users" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
                /* @__PURE__ */ jsxs("div", { className: "stat-content", children: [
                  /* @__PURE__ */ jsx("h3", { children: "€50" }),
                  /* @__PURE__ */ jsx("p", { children: "Don moyen" }),
                  /* @__PURE__ */ jsx("span", { className: "trend neutral", children: "Stable" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "stat-icon purple", children: /* @__PURE__ */ jsx("i", { className: "fas fa-heart" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "donations-card", children: [
              /* @__PURE__ */ jsx("h3", { children: "Donations Récentes" }),
              /* @__PURE__ */ jsx("div", { className: "table-container", children: /* @__PURE__ */ jsxs("table", { className: "data-table", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { children: "Donateur" }),
                  /* @__PURE__ */ jsx("th", { children: "Montant" }),
                  /* @__PURE__ */ jsx("th", { children: "Date" }),
                  /* @__PURE__ */ jsx("th", { children: "Statut" })
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsxs("td", { children: [
                    /* @__PURE__ */ jsx("div", { className: "table-cell-title", children: "Sophie Leroux" }),
                    /* @__PURE__ */ jsx("div", { className: "table-cell-subtitle", children: "sophie.leroux@email.com" })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "font-semibold", children: "€50.00" }),
                  /* @__PURE__ */ jsx("td", { className: "table-cell-date", children: "7 jan. 2025" }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", { className: "badge success", children: "Confirmé" }) })
                ] }) })
              ] }) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
function meta() {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CslqBGzC.js", "imports": ["/assets/chunk-ZYFC6VSF-CBBTUsSH.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-CGB74Ym7.js", "imports": ["/assets/chunk-ZYFC6VSF-CBBTUsSH.js"], "css": ["/assets/root-DE_zzLHD.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-JL2ozaYi.js", "imports": ["/assets/chunk-ZYFC6VSF-CBBTUsSH.js"], "css": ["/assets/home-CC8e0mhQ.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-87caa601.js", "version": "87caa601", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
