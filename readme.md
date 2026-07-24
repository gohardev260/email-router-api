# Email Router API

A high-performance, scalable API gateway built on Cloudflare Workers. It is designed to intelligently parse, filter, and route incoming emails to webhooks, database queues, or third-party email providers based on customizable, dynamic rulesets.

## Overview

Email Router API is a serverless contact form handler that receives form submissions and intelligently routes them via email using Cloudflare's Email Routing service. It provides a secure, CORS-enabled endpoint with built-in validation and responsive HTML email templating.

## Features

- **Serverless Architecture**: Built on Cloudflare Workers for ultra-low latency and automatic scaling.
- **Email Routing**: Intelligent email routing with Cloudflare Email Routing integration.
- **HTML Email Templates**: Responsive, professional HTML email templates included.
- **CORS Support**: Built-in CORS handling for cross-origin requests.
- **Input Validation**: Required field validation for name, email, and message data.
- **Error Handling**: Comprehensive exception handling with standardized API error messages.
- **High Performance**: Sub-100ms response times with zero infrastructure management.

## Tech Stack

- **Runtime**: Node.js (Cloudflare Workers)
- **Email Service**: Cloudflare Email Routing (SEND_EMAIL binding)
- **Framework**: Wrangler (Cloudflare CLI)
- **Language**: JavaScript (ES Modules)

## Prerequisites

Before getting started, ensure you have the following:

- A Cloudflare account with a verified domain.
- Node.js 16+ installed locally.
- Wrangler CLI installed (`npm install -g wrangler`).
- A verified sender email domain configured in Cloudflare Email Routing.

## Installation

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/gohardev260/email-router-api.git](https://github.com/gohardev260/email-router-api.git)
   cd email-router-api

```

2. **Install dependencies** (if applicable):
```bash
npm install

```


3. **Authenticate with Cloudflare**:
```bash
wrangler login

```



## Configuration

### 1. Update Email Addresses in `worker.js`

Edit the following configuration variables in `worker.js`:

```javascript
// Line 34: Your verified personal email (where inquiries will be sent)
const DESTINATION_EMAIL = "diginixhub90@gmail.com"; 

// Line 37: Your verified sender domain email
const SENDER_EMAIL = "contact-form@diginixit.com"; 

```

**Note**: Both email addresses must be actively configured and verified in your Cloudflare Email Routing settings.

### 2. Configure `wrangler.toml`

Ensure your `wrangler.toml` file includes the correct Email Routing binding:

```toml
name = "contact-form"
main = "worker.js"
compatibility_date = "2024-03-03"

[[send_email]]
name = "SEND_EMAIL"

```

### 3. Setup Cloudflare Email Routing

1. Navigate to **Cloudflare Dashboard** → **Your Domain** → **Email Routing**.
2. Verify your domain and set up your routing rules.
3. Configure a catch-all rule or specific rules for your designated sender email.

## Deployment

### Deploy to Cloudflare Workers

Run the following command to deploy the worker to Cloudflare's global network:

```bash
wrangler deploy

```

This will automatically bind the `SEND_EMAIL` service and make your endpoint live.

### Get Your Worker URL

After deployment, your worker will be accessible at:

```text
https://contact-form.<your-subdomain>.workers.dev

```

## API Usage

### Endpoint

**POST** `https://your-worker-url/`

### Request Format

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Website Inquiry",
  "message": "I'm interested in your services..."
}

```

### Required Fields

* `name` (string): Sender's name
* `email` (string): Sender's email address
* `message` (string): Contact message

### Optional Fields

* `subject` (string): Email subject line (defaults to "No Subject")

### Responses

**Success (200)**:

```json
{
  "success": true
}

```

**Missing Required Fields (400)**:

```json
{
  "success": false,
  "error": "Missing required fields"
}

```

**Server Error (500)**:

```json
{
  "success": false,
  "error": "Error message details"
}

```

## Example Usage

### Using cURL

```bash
curl -X POST https://your-worker-url/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Partnership Inquiry",
    "message": "I would like to discuss a potential partnership."
  }'

```

### Using Fetch (JavaScript)

```javascript
const response = await fetch('https://your-worker-url/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Partnership Inquiry',
    message: 'I would like to discuss a potential partnership.'
  })
});

const result = await response.json();
console.log(result);

```

## Email Template Features

The API formats incoming messages into a clean, responsive HTML email template featuring:

* A professional header and inquiry badge.
* Organized data lists (name, email, subject, message).
* A distinct message content box.
* A quick-reply mailto button.
* Device-agnostic responsive design.

## CORS Configuration

The API includes built-in CORS headers for broad compatibility:

```javascript
"Access-Control-Allow-Origin": "*"
"Access-Control-Allow-Methods": "POST, OPTIONS"
"Access-Control-Allow-Headers": "Content-Type"

```

To restrict access, update the `Access-Control-Allow-Origin` header to match your specific frontend domain.

## Development & Local Testing

To test the worker locally before deploying to production:

```bash
wrangler dev

```

This starts a local development server at `http://localhost:8787`. You can send test `POST` requests directly to this localhost URL.

## Troubleshooting

* **Email Not Sending**: Verify that both `DESTINATION_EMAIL` and `SENDER_EMAIL` are configured in Cloudflare Email Routing and that your domain is fully verified.
* **CORS Issues**: Check that `Access-Control-Allow-Origin` is configured correctly for your frontend and that `OPTIONS` preflight requests are being handled.
* **Deployment Errors**: Ensure your Wrangler CLI is authenticated (`wrangler login`) and that the `[[send_email]]` binding is properly defined in `wrangler.toml`.

## Security Considerations

* Input validation is enforced for required fields.
* Error messages are sanitized to prevent sensitive infrastructure leaks.
* *Recommended for Production*: Implement client-side rate limiting and consider a CAPTCHA solution to prevent automated bot submissions.

## Support & Contributing

* **Issue Tracker**: [GitHub Issues](https://github.com/gohardev260/email-router-api/issues)
* **Author**: [@gohardev260](https://github.com/gohardev260)

Pull requests are welcome. For major changes, please open an issue first to discuss the proposed updates.

## License

This project is open-source and available under the MIT License.
