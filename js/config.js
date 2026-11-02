/* =====================================================================
   config.js  -  YOUR CONTROL PANEL
   ---------------------------------------------------------------------
   Everything you will change often lives here: contact details, prices,
   social links, service area.

   How it works:
   - This file creates one JavaScript object called SITIO_CONFIG.
   - js/main.js reads it and fills the page. For example, any HTML tag
     written like  <span data-config="founder">  gets its text replaced
     with the "founder" value below.
   - Values that differ by language look like { es: "...", en: "..." }.

   Rules:
   - Keep the quotes "" and the commas , at the end of each line.
   - Save the file, refresh the page, and your change appears.
   ===================================================================== */

window.SITIO_CONFIG = {

  // ---- Business identity -------------------------------------------
  businessName: "SitioSpot",
  founder: "Serafin Ruiz",
  slogan: {
    es: "Tu negocio merece estar en internet.",
    en: "Your business deserves to be online."
  },

  // ---- Contact -------------------------------------------------------
  // WhatsApp: country code + number, DIGITS ONLY (no +, spaces or dashes).
  // Mexico = 52, so +52 442 653 0823 becomes 524426530823.
  whatsapp: "524426530823",
  whatsappDisplay: "+52 442 653 0823",   // how the number is shown to visitors

  // Pre-written message that opens when someone taps a WhatsApp button.
  whatsappMessage: {
    es: "Hola Serafin, me interesa un sitio web para mi negocio.",
    en: "Hi Serafin, I'm interested in a website for my business."
  },

  // Email: leave "" (empty) until you have a complete business address.
  // While empty, the email line stays hidden. Example: "hola@sitiospot.com"
  email: "",

  // ---- Location ------------------------------------------------------
  // General area only. Do NOT put a home address here.
  location: {
    es: "Querétaro, México",
    en: "Querétaro, Mexico"
  },
  serviceArea: {
    es: "Querétaro, México",
    en: "Querétaro, Mexico"
  },
  // Opens a general map search for Querétaro (no invented business address).
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Quer%C3%A9taro%2C%20M%C3%A9xico",

  // ---- Social media ----------------------------------------------------
  // Leave "" until the account really exists. Empty ones stay hidden.
  social: {
    facebook: "",
    instagram: ""
  },

  // ---- Prices (MXN) ----------------------------------------------------
  // Numbers only as text, with the comma. The "$" and "MXN" are in the HTML.
  prices: {
    from: "1,000",            // "Proyectos desde $1,000 MXN"
    rangeFrom: "1,000",       // typical range start
    rangeTo: "3,000",         // typical range end
    maintenanceFrom: "200",   // monthly maintenance, low end
    maintenanceTo: "400"      // monthly maintenance, high end
  }
};
