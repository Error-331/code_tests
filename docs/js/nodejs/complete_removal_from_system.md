# Complete removal of NodeJS from system

```console

# Remove nvm
sudo rm -rf ~/.nvm
hash -r

# Remove latest node version
sudo npm uninstall -g n

# Remove n
cd ~/src/n && sudo make uninstall && cd .. && sudo rm -r n

# Remove latest nodejs version
sudo apt-get purge -y nodejs npm

# Remove nodejs-legacy version
sudo apt-get purge -y nodejs-legacy npm

sudo apt -y autoremove

# Remove nodejs files
sudo rm -rf /usr/local/lib/node_modules/npm
sudo rm -rf /usr/local/lib/node_modules/n
sudo rm -f /usr/local/bin/node
sudo rm -f /usr/local/bin/npm
sudo rm -f /usr/bin/node
sudo rm -rf /usr/local/n/versions/node

```