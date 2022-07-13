# ACA-Py_Controller
Simple controller for debugging ACA-Py connections

You will need to set your own IP address for your server that you are running the ACA-Py on in the webhook.js route code.  Otherwise, it does not know where to make the REST Call to your ACA-Py that you are controlling.

# Pre-requisite
    BPA
        Create Virtual machine for BPA (an Ubuntu server, using Azure)
        ⦁	Use the downloaded .pen key and run PuttyGen that will generate the private key.
        ⦁	Copy the public IP from the Azure VM and use it along with the private key to load the install using Putty.
        ⦁	Open the VM using putty (Username - azureuser)
        ⦁	Commands on the VM 
            sudo apt update
            sudo apt upgrade  
            sudo apt install docker.io
            sudo apt install curl
            sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)>" -o /usr/local/bin/docker-compose
            sudo chmod +x /usr/local/bin/docker-compose
            docker-compose -v
            git clone https://github.com/hyperledger-labs/business-partner-agent
            cd business-partner-agent/scripts
            ./register-dids.sh
            nano .env
                change some ports and privacy settings.
                change BPA_HOST ... replace bpal with the public IP.
                change BPA2_HOST ... replace bpal2 with the public IP.
                ACAPY_ENDPOINT include the IP
                ACAPY2_ENDPOINT include the IP
            sudo docker-compose up
        ⦁	Now you have to open the ports, 8080, 8030, 8031 on the Azure VM Machine
        ⦁	Visit the networking tab to configure the ports.
        ⦁	Visit ip:8080 to chekc the BPA instance running.
		
        Steps: Get the BPA running the next day. 
        ⦁	Clean the already run instances.
            sudo docker container prune
            sudo docker rmi $(sudo docker images -q)
            sudo docker volume prune
        ⦁	Ensure the endpoints are updated in the .env file with the IP address of the BPA server.
                ./register-dids.sh
                sudo docker-compose up
        ⦁	Once the BPA is up and runnning.
        ⦁	If its erroring out, do run the above cmds once again. It will work.
        ⦁	Check if you have configured inbound ports on the server, configure 8080, 8030, 8031.
        ⦁	visit IP:8080 to open the BPA UI. 

    # ACA-Py 
        Create Virtual machine for BPA (an Ubuntu server, using Azure), keep a note to add a disk on the 'disk; tab while creating the VM.
        ⦁	Use the downloaded .pen key and run PuttyGen that will generate the private key.
        ⦁	Copy the public IP from the Azure VM and use it along with the private key to load the install using Putty.
        ⦁	Open the VM using putty (Username - azureuser)
        ⦁	Commands on the VM 
            whereis python
            sudo apt update
            sudo apt install python3-pip
            pip install aries-cloudagent
            sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys CE7709D068DB5E88
            sudo add-apt-repository "deb https://repo.sovrin.org/sdk/deb bionic master"
            sudo apt update
            sudo apt install -y libindy
            pip3 install python3_indy
            sudo apt install -y indy-cli
            sudo apt install libsodium-dev
        ⦁	Restart the ACAPy server by closing and openning it again using Putty.
        ⦁	Navigate to - https://indy-test.bosch-digital.de/genesis and Authenticate the seed by pasting it and clicking 'Register DIDs'.
        ⦁	Change the IP address(ACAPy), Wallet name and the seed to a random seed.
        ⦁	IMPORTANT make sure to copy and paste all 'aca-py' cmds into a notepad and remove the tab from the starting of each line, else the cmd will error out.
        aca-py provision \
        --wallet-type indy \
        --endpoint http://52.188.211.100 \
        --seed 100A000000300000d00000000000002S \
        --wallet-name WalletMayankTomar4 \
        --wallet-key MASTER_KEY_SECRET \
        --genesis-url https://indy-test.bosch-digital.de/genesis
        ⦁	Add ports 8000, 8080 in the ACAPy VM on azure. 
        ⦁	Change the IP address(ACAPy) in endpoint, seed, wallet name from the above commands
        aca-py start \
        --inbound-transport http 0.0.0.0 8000 \
        --endpoint http://52.188.211.100 \
        --outbound-transport http \
        --admin 0.0.0.0 8080 \
        --genesis-url https://indy-test.bosch-digital.de/genesis \
        --wallet-type indy \
        --wallet-name WalletMayankTomar4 \
        --wallet-key MASTER_KEY_SECRET \
        --seed 100A000000300000d00000000000002S \
        --admin-insecure-mode \
        --label MT_SSI_AGENT \
        --log-level debug \
        --storage-type indy \
        --auto-ping-connection \
        --max-message-size 10485760

        ⦁	Visit http://[ IP ADDRESS]:8080/api/doc  to access ACAPy Swagger interface. 

    # ACA-Py Controller
        ⦁	Create Virtual machine for BPA (an Ubuntu server, using AWS), add a port 3000.
        ⦁	Use the downloaded .pen key and run PuttyGen that will generate the private key.
        ⦁	Copy the public IP from the Azure VM and use it along with the private key to load the install using Putty.
        ⦁	Open the VM using putty (Username - ubuntu)
        ⦁	Commands on the VM 
            git clone your webhook repo from Github. Below is my repo.
                https://github.com/MakTom/ACA_Py_Controller
            cd to your code folder.
            sudo apt update
            sudo apt upgrade
            sudo apt install npm
            sudo npm install -g n
            sudo n latest
            node -v
            sudo npm install npm@latest -g
            npm install
            npm run start
        ⦁	Stop your ACAPy server.
        ⦁	Addin the address of the webhook.
        aca-py start \
        --inbound-transport http 0.0.0.0 8000 \
        --endpoint http://52.188.211.100:8000 \
        --outbound-transport http \
        --admin 0.0.0.0 8080 \
        --webhook-url http://34.201.33.137:3000 \
        --genesis-url https://indy-test.bosch-digital.de/genesis \
        --wallet-type indy \
        --wallet-name WalletMayankTomar4 \
        --wallet-key MASTER_KEY_SECRET \
        --seed 100A000000300000d00000000000002S \
        --admin-insecure-mode \
        --label MT_SSI_AGENT \
        --log-level debug \
        --storage-type indy \
        --auto-ping-connection \
        --max-message-size 10485760
