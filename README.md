# Cloudflare Error Page (React Version)

A pixel-perfect, static React implementation of the classic Cloudflare error page.

With the help of **Gemini 3**, this fork adds a React application to the original project, making it incredibly easy to deploy directly to **Cloudflare Pages** 😈

---

## 📸 Screenshots

### Desktop View
![Desktop View](./doc/desktop-preview.png)

### Mobile View
![Mobile View](./doc/mobile-preview.png)

---

## 🚀 Deploy to Cloudflare Pages

You can deploy this project to Cloudflare Pages in just a few clicks.

1.  **Fork this repository** to your GitHub account.
2.  Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Compute (Workers & Pages)** > **Pages**.
3.  Click **Connect to Git** and select your forked repository.
4.  Configure the build settings:
    *   **Framework preset**: `React(Vite)`
    *   **Build command**: `npm run build`
    *   **Build output directory**: `dist`
    *   **Root directory**: `react-app` (Important!)
5.  Click **Save and Deploy**.

That's it! Your custom error page is now live.

---

## ⚙️ Configuration (Zero Code)

You can customize the text, error codes, and status indicators without modifying the code. Just use **Variables and Secrets** in Cloudflare Pages.

1.  Go to your Pages project **Settings** > **Variables and Secrets**.
2.  Add a new variable named `VITE_CONFIG_JSON`.
3.  Set the value to a JSON string with your custom settings.

### Configuration Examples

#### Example 1: System Maintenance (503)
```json
{
  "title": "System Maintenance",
  "error_code": 503,
  "what_happened": "<p>We are currently performing scheduled maintenance.</p>",
  "what_can_i_do": "<p>Please check back in 15 minutes.</p>",
  "browser_status": { "status": "ok", "status_text": "Your Browser" },
  "cloudflare_status": { "status": "ok", "status_text": "Cloudflare" },
  "host_status": { "status": "error", "status_text": "Maintenance" }
}
```

#### Example 2: Everything is Working (200)
```json
{
  "title": "Everything is working",
  "error_code": 200,
  "domain": "example.com",
  "browser_status": { "status": "ok", "status_text": "Working" },
  "cloudflare_status": { "status": "ok", "status_text": "Working", "location": "Hong Kong", "link": "https://www.cloudflare.com" },
  "host_status": { "status": "ok", "status_text": "Working" },
  "what_happened": "<p>All systems are operational.</p>",
  "what_can_i_do": "<p>Your website is running smoothly!</p>",
  "more_information": { "hidden": true }
}
```

#### Example 3: Custom Error with Branding
```json
{
  "title": "Service Temporarily Unavailable",
  "error_code": 503,
  "domain": "mywebsite.com",
  "cloudflare_status": { "status": "ok", "location": "Singapore" },
  "host_status": { "status": "error", "status_text": "Upgrading" },
  "what_happened": "<p>We're upgrading our infrastructure.</p>",
  "what_can_i_do": "<p>Follow us on Twitter <a href='https://twitter.com/yourhandle'>@yourhandle</a> for updates.</p>",
  "perf_sec_by": { "text": "Your Company", "link": "https://yourcompany.com" }
}
```

#### Example 4: Custom 404 Page
```json
{
  "title": "Page Not Found",
  "error_code": 404,
  "browser_status": { "status": "ok", "status_text": "Working" },
  "cloudflare_status": { "status": "ok", "status_text": "Working" },
  "host_status": { "status": "ok", "status_text": "Working" },
  "what_happened": "<p>The page you're looking for doesn't exist.</p>",
  "what_can_i_do": "<p>Check the URL or visit our <a href='/'>homepage</a>.</p>"
}
```

### Full Configuration Options
The app performs a deep merge, so you only need to provide the fields you want to override.

```javascript
{
  "title": "Internal server error",
  "error_code": 500,
  "domain": null, // Defaults to current hostname (window.location.hostname)
  "html_title": null, // Page title format: "<domain> | <error_code>: <title>"
  "time": null, // Defaults to current UTC time
  "ray_id": null, // Defaults to random hex
  "client_ip": "127.0.0.1",
  
  "more_information": {
    "hidden": false,
    "text": "cloudflare.com",
    "link": "https://www.cloudflare.com"
  },

  "browser_status": {
    "status": "ok", // "ok" or "error"
    "status_text": "Working",
    "location": "You",
    "name": "Browser"
  },
  "cloudflare_status": {
    "status": "error",
    "status_text": "Error",
    "location": "London",
    "name": "Cloudflare",
    "link": "https://www.cloudflare.com/zh-cn/5xx-error-landing/?utm_source=errorcode_500" // Link URL for Cloudflare status text
  },
  "host_status": {
    "status": "ok",
    "status_text": "Working",
    "location": null, // Defaults to the domain name
    "name": "Host"
  },
  "error_source": "cloudflare", // "browser", "cloudflare", or "host"
  
  "what_happened": "<p>HTML content supported here.</p>",
  "what_can_i_do": "<p>HTML content supported here.</p>",
  
  "perf_sec_by": {
    "text": "Cloudflare",
    "link": "https://www.cloudflare.com"
  }
}
```

### Configuration Fields Explained

| Field | Description | Default Value |
|-------|-------------|---------------|
| `title` | Error page title | `"Internal server error"` |
| `error_code` | HTTP status code | `500` |
| `domain` | Domain name displayed in Host location | Current hostname (`window.location.hostname`) |
| `html_title` | Browser tab title | `"<domain> \| <error_code>: <title>"` |
| `time` | Timestamp displayed on the page | Current UTC time |
| `ray_id` | Cloudflare Ray ID | Random hex string |
| `client_ip` | Client IP address | `"127.0.0.1"` |
| `more_information.hidden` | Hide "Visit cloudflare.com" link | `false` |
| `browser_status.location` | Browser location text | `"You"` |
| `cloudflare_status.location` | Cloudflare edge location | `"London"` |
| `cloudflare_status.link` | Link URL for Cloudflare status text | `"https://www.cloudflare.com/zh-cn/5xx-error-landing/?utm_source=errorcode_500"` |
| `host_status.location` | Host location (domain) | Same as `domain` |
| `error_source` | Highlight error source section | `"cloudflare"` |
| `what_happened` | HTML content for "What happened?" | Error description |
| `what_can_i_do` | HTML content for "What can I do?" | Suggestion text |



## 🛠 Local Development

### Running the Project

To run the project locally:

```bash
cd react-app
npm install
npm run dev
```

The development server includes a **floating demo controller** (hover at the top of the screen) to quickly preview different error states (500, 503, 200).

### Using Custom Configuration Locally

To test your custom configuration in local development:

1. **Create a `.env` file** in the `react-app` directory:
   ```bash
   cd react-app
   touch .env
   ```

2. **Add your configuration** to the `.env` file:
   ```env
   VITE_CONFIG_JSON={"title":"Everything is working","error_code":200,"domain":"localhost","browser_status":{"status":"ok","status_text":"Working"},"cloudflare_status":{"status":"ok","status_text":"Working","location":"Mars"},"host_status":{"status":"ok","status_text":"Working"},"what_happened":"<p>All systems are operational.</p>","what_can_i_do":"<p>Your website is running smoothly!</p>","more_information":{"hidden":true}}
   ```

3. **Restart the dev server** (stop and run `npm run dev` again) to apply the changes.

#### More `.env` Examples

**Maintenance Mode:**
```env
VITE_CONFIG_JSON={"title":"Under Maintenance","error_code":503,"cloudflare_status":{"location":"Tokyo"},"host_status":{"status":"error","status_text":"Maintenance"},"what_happened":"<p>We're making improvements.</p>","what_can_i_do":"<p>Check back in 30 minutes.</p>"}
```

**Custom 404:**
```env
VITE_CONFIG_JSON={"title":"Page Not Found","error_code":404,"domain":"mysite.local","what_happened":"<p>This page doesn't exist.</p>","what_can_i_do":"<p>Try searching or visit our homepage.</p>"}
```

**All Green (Status Page):**
```env
VITE_CONFIG_JSON={"title":"All Systems Operational","error_code":200,"browser_status":{"status":"ok"},"cloudflare_status":{"status":"ok","location":"Singapore"},"host_status":{"status":"ok"},"what_happened":"<p>Everything is working perfectly.</p>","more_information":{"hidden":true}}
```

> **💡 Tip:** The `.env` file is gitignored by default, so your local configuration won't be committed to the repository.

---

## ❤️ Credits & Acknowledgements

*   **Original Project**: Thanks to the original author [donlon](https://github.com/donlon/cloudflare-error-page) for the Python/Jinja2 implementation and assets.
*   **Gemini 3**: For the intelligent coding assistance, React migration, and pixel-perfect UI refinements.
*   **Cloudflare**: For providing the **robust** infrastructure and design inspiration.

---

MIT License