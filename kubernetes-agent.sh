sudo swapoff -a

# MY_IP=$(ifconfig | grep 'inet addr' | cut -d ':' -f 2 | cut -d ' ' -f 1 | sed -n -e '/10./p')
TOKEN=$(curl --header "Content-Type:application/json" -d '{"userName":"pierre-antoine.porte@hpe.com", "password":"Cloud@hp1234"}' https://cic-demo-hpe.hpeonesphere.com/rest/session | jq -r '.token')


# PROJECT_NAME=$(cat /home/ubuntu/project_name.txt)
PROJECT_NAME=$1
PROJECTS=$(curl --header "Content-Type:application/json" -H "Authorization: Bearer $TOKEN" https://cic-demo-hpe.hpeonesphere.com/rest/projects)

JQ_COMMAND=$(echo '.members | .[] | select(.name == "'$PROJECT_NAME'")')
TMP=$(echo $PROJECTS | jq -r "$JQ_COMMAND")
DESCRIPTION=$(echo $TMP | jq -r '.description')

sudo $DESCRIPTION # execute the command
