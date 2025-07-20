# TaskPro Backend

This is the API server for the **TaskPro** application.

## Local SSL Setup

To enable HTTPS in your local development environment, run the following script:

```
bash certs/setup_ssl.sh
```

This will generate a self-signed SSL certificate inside the `certs/` directory.

### Optional: Trust the Certificate

To avoid browser warnings and fully enable HTTPS support, you can manually trust the generated certificate on your operating system:

#### macOS
1. Open **Keychain Access**.
2. Drag and drop the `.crt` file into the **System** keychain.
3. Double-click the certificate and set **"When using this certificate"** to **"Always Trust"**.

#### Linux
1. Move the `.crt` file to the trusted certificates directory:

   ```
   sudo cp certs/taskpro.crt /usr/local/share/ca-certificates/
   sudo update-ca-certificates
   ```

#### Windows
1. Open **Manage Computer Certificates**.
2. Navigate to **Trusted Root Certification Authorities** → **Certificates**.
3. Right-click → **All Tasks** → **Import**, then select the `.crt` file.
