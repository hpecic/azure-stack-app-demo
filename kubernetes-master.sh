sudo swapoff -a

CMD_TO_JOIN=$(sudo kubeadm init --token-ttl 0 | grep "kubeadm join")

rm -rf $HOME/.kube
mkdir -p $HOME/.kube
mkdir -p /home/ubuntu/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo cp -i /etc/kubernetes/admin.conf /home/ubuntu/.kube/config
sudo chown ubuntu /home/ubuntu/.kube/config
sudo chgrp ubuntu /home/ubuntu/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

echo 'export KUBECONFIG=/home/ubuntu/.kube/admin.conf' >> /home/ubuntu/.bashrc

sudo sysctl net.bridge.bridge-nf-call-iptables=1
kubectl apply -f https://raw.githubusercontent.com/romana/romana/master/containerize/specs/romana-kubeadm.yml

TOKEN=$(curl --header "Content-Type:application/json" -d '{"userName":"pierre-antoine.porte@hpe.com", "password":"Cloud@hp1234"}' https://cic-demo-hpe.hpeonesphere.com/rest/session | jq -r '.token')


# PROJECT_NAME=$(cat /home/ubuntu/project_name.txt)
PROJECT_NAME=$1
PROJECTS=$(curl --header "Content-Type:application/json" -H "Authorization: Bearer $TOKEN" https://cic-demo-hpe.hpeonesphere.com/rest/projects)

JQ_COMMAND=$(echo '.members | .[] | select(.name == "'$PROJECT_NAME'")')
TMP=$(echo $PROJECTS | jq -r "$JQ_COMMAND")


# DEPLOYMENTS=$(curl --header "Content-Type:application/json" -H "Authorization: Bearer $TOKEN" https://cic-demo-hpe.hpeonesphere.com/rest/deployments?count=-1)
# ADDR_OBJECT=$(echo $DEPLOYMENTS | jq -r '.members' | jq -r ".[] | .deploymentEndpoints[]? | select(.address == '$MY_IP')")
# JQ_COMMAND=$(echo '.[] | select(.deploymentEndpoints[]? | contains(' $ADDR_OBJECT '))')
# PROJECT_URI=$(echo $DEPLOYMENTS | jq -r '.members' | jq -r "$JQ_COMMAND | .projectUri")

PROJECT_URI=$(echo $TMP | jq -r '.uri')

URL=https://cic-demo-hpe.hpeonesphere.com$PROJECT_URI
DESCRIPTION=$(echo $TMP | jq -r '.description')

# NEW_DESCRIPTION="$DESCRIPTION\n--------\nCOMMAND_KUBERNETES:$CMD_TO_JOIN"

curl  --request PATCH \
      -H "Content-Type:application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d "{\"description\":\"$CMD_TO_JOIN\"}" \
      https://cic-demo-hpe.hpeonesphere.com$PROJECT_URI

# deploy dashboard

kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/alternative/kubernetes-dashboard.yaml

# create user for dashboard

kubectl create clusterrolebinding add-on-cluster-admin-dashboard --clusterrole=cluster-admin --serviceaccount=kube-system:kubernetes-dashboard

# proxying the dashboard
MY_IP=$(ifconfig | grep 'inet addr' | cut -d ':' -f 2 | cut -d ' ' -f 1 | sed -n -e '/10./p')

kubectl proxy --address $MY_IP --accept-hosts=.* &
