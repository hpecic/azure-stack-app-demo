#!/bin/bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
VERSION=$(lsb_release -cs)
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $VERSION stable"
sudo apt-get update
sudo apt-get install -y docker-ce
sudo usermod -aG docker ${USER}
IP=$(ifconfig eth0 | grep 'inet addr' | cut -d ':' -f 2 | cut -d ' ' -f 1)
sudo docker run -e IP_PROVIDED=$IP -d -p 80:80 -e ONESPHERE_PASSWORD=Cloud@hp1234 hpedemo/demo-onesphere
# echo -e '#!/bin/sh\nsudo docker run -d -p 8080:8080 hpedemo/demo-onesphere' >> /etc/init.d/demo-onesphere-docker
# ln -s /etc/init.d/demo-onesphere-docker /etc/rc.d/
