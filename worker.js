export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      const body = await request.json();
      const name = body.name || "";
      const email = body.email || "";
      const subject = body.subject || "";
      const message = body.message || "";

      if (!name || !email || !message) {
        return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }

      // --- CONFIGURATION ---
      // 1. Destination: Your verified personal email address
      const DESTINATION_EMAIL = "diginixhub90@gmail.com"; 
      
      // 2. Sender: Must be an email address matching your verified Cloudflare domain
      const SENDER_EMAIL = "contact-form@diginixit.com"; 

      // 3. Premium HTML Email Template
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            *, *:before, *:after {
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #f6f8fa;
              margin: 0;
              padding: 0;
              -webkit-font-smoothing: antialiased;
            }
            .wrapper {
              width: 100%;
              background-color: #f6f8fa;
              padding: 32px 16px;
            }
            .container {
              max-width: 580px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              border: 1px solid #e1e4e8;
              overflow: hidden;
              box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
            }
            .header {
              background-color: #0d1117;
              padding: 24px 32px;
              text-align: left;
              border-bottom: 1px solid #21262d;
            }
            .logo {
              color: #ffffff;
              font-size: 20px;
              font-weight: 700;
              letter-spacing: -0.03em;
              text-decoration: none;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }
            .content {
              padding: 32px 32px;
            }
            .badge {
              display: inline-block;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              background-color: #ddf4ff;
              color: #0969da;
              padding: 4px 10px;
              border-radius: 6px;
              font-weight: 600;
              margin-bottom: 16px;
            }
            h1 {
              color: #1f2328;
              font-size: 22px;
              font-weight: 600;
              letter-spacing: -0.02em;
              margin: 0 0 8px 0;
            }
            .intro {
              color: #57606a;
              font-size: 14px;
              line-height: 1.5;
              margin: 0 0 24px 0;
            }
            .details-list {
              margin-bottom: 28px;
            }
            .detail-item {
              margin-bottom: 20px;
              border-bottom: 1px solid #f0f3f6;
              padding-bottom: 16px;
            }
            .detail-item:last-child {
              border-bottom: none;
              padding-bottom: 0;
              margin-bottom: 0;
            }
            .label {
              font-size: 11px;
              font-weight: 600;
              color: #57606a;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              margin-bottom: 6px;
            }
            .value {
              font-size: 15px;
              color: #1f2328;
              line-height: 1.5;
              word-break: break-word;
              overflow-wrap: break-word;
            }
            .email-link {
              color: #0969da;
              text-decoration: none;
            }
            .email-link:hover {
              text-decoration: underline;
            }
            .message-box {
              background-color: #f6f8fa;
              border-radius: 8px;
              padding: 16px;
              font-size: 14px;
              color: #24292f;
              line-height: 1.6;
              margin-top: 6px;
              white-space: pre-wrap;
              word-break: break-word;
              overflow-wrap: break-word;
              border: 1px solid #d0d7de;
            }
            .btn-wrap {
              text-align: center;
              margin-top: 28px;
            }
            .btn {
              display: inline-block;
              background-color: #24292f;
              color: #ffffff !important;
              text-decoration: none;
              font-weight: 500;
              font-size: 14px;
              padding: 12px 24px;
              border-radius: 6px;
              transition: background-color 0.2s ease;
            }
            .btn:hover {
              background-color: #1f2328;
            }
            .footer {
              background-color: #f6f8fa;
              padding: 20px 32px;
              border-top: 1px solid #d0d7de;
              text-align: center;
            }
            .footer p {
              margin: 0;
              font-size: 12px;
              color: #57606a;
              line-height: 1.5;
            }
            @media only screen and (max-width: 480px) {
              .wrapper {
                padding: 16px 8px;
              }
              .content {
                padding: 24px 16px;
              }
              .header {
                padding: 20px 16px;
              }
              .footer {
                padding: 16px 16px;
              }
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <div class="logo">DIGINIXIT.</div>
              </div>
              <div class="content">
                <span class="badge">Inquiry Received</span>
                <h1>New Contact Submission</h1>
                <p class="intro">Here are the details submitted from your website's contact form:</p>
                
                <div class="details-list">
                  <div class="detail-item">
                    <div class="label">Name</div>
                    <div class="value"><strong>${name}</strong></div>
                  </div>
                  <div class="detail-item">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${email}" class="email-link">${email}</a></div>
                  </div>
                  <div class="detail-item">
                    <div class="label">Subject</div>
                    <div class="value">${subject || "No Subject"}</div>
                  </div>
                  <div class="detail-item">
                    <div class="label">Message</div>
                    <div class="value">
                      <div class="message-box">${message}</div>
                    </div>
                  </div>
                </div>

                <div class="btn-wrap">
                  <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Inquiry')}" class="btn">Quick Reply to ${name}</a>
                </div>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} DiginixIT Agency. Form submission via Cloudflare Workers.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      // Send the email using the simplified object-based API
      await env.SEND_EMAIL.send({
        from: SENDER_EMAIL,
        to: DESTINATION_EMAIL,
        subject: `New Website Inquiry: ${subject || "No Subject"}`,
        text: `You have received a new contact form submission:\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Subject: ${subject || "N/A"}\n\n` +
              `Message:\n${message}\n`,
        html: htmlContent
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });

    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }
  }
};
