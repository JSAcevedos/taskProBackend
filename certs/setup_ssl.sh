# setup-ssl.sh
openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout certs/localhost.key \
  -out certs/localhost.crt \
  -config certs/localhost.cnf
echo "Certificates generated successfully"
sudo cp localhost.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
echo "Certificates added to trusted store"