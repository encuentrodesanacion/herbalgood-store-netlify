const { Pool } = require("pg");

// Configuración de conexión (Segura vía Variable de Entorno)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/**
 * Función sin servidor que maneja la solicitud de cotización y utiliza una transacción
 * para guardar los datos en dos tablas: quotation_requests y quotation_items.
 */
exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Método no permitido." }),
    };
  }

  // 1. Desestructurar los datos enviados por el frontend
  let client, items;
  try {
    const data = JSON.parse(event.body);
    client = data.client;
    items = data.items;
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Formato de datos JSON inválido." }),
    };
  }

  if (!client || !items || items.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Faltan datos del cliente o productos.",
      }),
    };
  }

  // Usamos un cliente único para gestionar la transacción
  const client_pg = await pool.connect();

  try {
    await client_pg.query("BEGIN"); // INICIA LA TRANSACCIÓN

    // --- 2. Inserción en quotation_requests ---
    const requestQuery = `
      INSERT INTO quotation_requests (client_name, client_email, client_phone, quotation_message)
      VALUES ($1, $2, $3, $4)
      RETURNING request_id;
    `;
    const requestValues = [
      client.name,
      client.email,
      client.phone,
      client.quotation_message, // Mensaje estructurado
    ];

    const result = await client_pg.query(requestQuery, requestValues);
    const request_id = result.rows[0].request_id;

    // --- 3. Inserción en quotation_items (Loop) ---
    for (const item of items) {
      const itemQuery = `
        INSERT INTO quotation_items (request_id, product_name, product_price, quantity)
        VALUES ($1, $2, $3, $4);
      `;
      const itemValues = [request_id, item.name, item.price, item.quantity];
      await client_pg.query(itemQuery, itemValues);
    }

    await client_pg.query("COMMIT"); // CONFIRMA LA TRANSACCIÓN (si todo fue bien)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Cotización registrada con éxito.",
        id: request_id,
      }),
    };
  } catch (error) {
    await client_pg.query("ROLLBACK"); // REVierte los cambios si algo falló
    console.error("Fallo de Transacción en DB:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message:
          "Fallo interno al procesar la cotización. Los cambios se revirtieron.",
        error: error.message,
      }),
    };
  } finally {
    client_pg.release(); // Siempre libera el cliente a la Pool al finalizar
  }
};
