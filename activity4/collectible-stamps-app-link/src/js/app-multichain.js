App = {
    clientIdOwn: '77XVN8m-DyP4_n-G2FlhmumfLdysEZ04b6Gx4S1XfY0',
    clientSecretOwn: '01aUUi4HCWZ5WhN6y6rKpFR/IQtwJmG0C3sZ2Ex4IbhAyAUOUiLINl6Yc7/a0Zg',
    clientIdToken: '',
    clientSecretToken: '',
    authURL: 'https://api.block.mason.link/oauth2/token',
    baseURL: 'https://api.block.mason.link/v1/',
    linkAccount: '',
    web3Provider: null,
    owners: [],
    tokenConversionRate: 5,
  
    init: function() {
      // Load stamps.
      $.getJSON('../stamps.json', function(data) {
        const stampsRow = $('#stampsRow');
        const stampTemplate = $('#stampTemplate');
  
        for (i = 0; i < data.length; i ++) {
          stampTemplate.find('.panel-title').text(data[i].name);
          stampTemplate.find('img').attr('src', data[i].picture);
          stampTemplate.find('.stamp-fact').text(data[i].fact);
          stampTemplate.find('.btn-own').attr('data-id', data[i].id);
          stampTemplate.find('.btn-value').text(data[i].price * App.tokenConversionRate);
  
          stampsRow.append(stampTemplate.html());
        }
        return App.markOwned();
      });
      return App.initWeb3();
    },
  
    initWeb3: function() {
      if (typeof web3.currentProvider.selectedAddress !== 'undefined') {
        // If a web3 provider exists
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
      } 
      else {
        // Specify default instance if no web3 provider
        App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        web3 = new Web3(App.web3Provider);
      }
      return App.bindEvents();
    },
  
    bindEvents: function() {
      $(document).on('click', '.btn-own', App.handleOwnership);
    },
  
    accessToken: async function(clientId, clientSecret) {
      const authBody = {
        "grant_type": "client_credentials",
        "client_id": clientId,
        "client_secret": clientSecret
      }
  
      const tokenResponse = await fetch(App.authURL, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authBody),
      });
  
      const tokenData = await tokenResponse.json();
      return tokenData["access_token"];
    },
    
    markOwned: async function() {
      const account = await App.fetchActiveAccount();
      const token = await App.accessToken(App.clientIdOwn, App.clientSecretOwn);
      const url = App.baseURL.concat('getOwners');
      
      const response = await fetch(url, {
        method: "get",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token 
        },
      });
      
      const data = await response.json();

      App.owners = data.result;
      for (i = 0; i < App.owners.length; i++) {
        
        if (App.owners[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-stamp').eq(i).find('#ownerAddress').empty();
          $('.panel-stamp').eq(i).find('#ownerAddress').append('Owner: ' + App.owners[i]).css({ wordWrap: "break-word" });
        }
        $('.panel-stamp').eq(i).find('.btn-own').text("Own").attr('disabled', App.owners[i] == account);
      }
    },
    
    fetchActiveAccount: async function() {
      const accounts = await web3.eth.accounts;
      return accounts[0];
    },

    setOwnership: async function(stampId, owner) {
      const url = App.baseURL.concat('setOwnership');
      const token = await App.accessToken(App.clientIdOwn, App.clientSecretOwn);
      
      const reqBody = {
        "stampId": stampId,
        "owner": owner
      };

      try {
        const response = await fetch(url, {
          method: "post",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
          body: JSON.stringify(reqBody),
        });
        
        const data = await response.json();
        
        if (data.success) {
          App.markOwned();
        } else {
            $('.panel-stamp').eq(stampId).find('.btn-own').text("Own").attr('disabled', false);
        }
      } catch(err) {
          console.log(err);
      }
    },

    transferPayment: async function(receiver, amount) {
      // To complete
    },
    
    handleOwnership: async function(event) {
      event.preventDefault();
      const account = await App.fetchActiveAccount();
      const stampId = parseInt($(event.target).data('id'));
      const price = parseInt($(event.target).next().html());
      const existingOwner = App.owners[stampId];
      console.log('existing Owner is', existingOwner);

      if (account && account !== existingOwner) {
        $('.panel-stamp').eq(stampId).find('.btn-own').text("Processing").attr('disabled', true);

        if (existingOwner !== '0x0000000000000000000000000000000000000000') {
          const transferSuccess = await App.transferPayment(existingOwner, price);
          if (transferSuccess) {
            App.setOwnership(stampId, account);
          } else {
            alert("Error in transferring funds");
          }
        } else {
          App.setOwnership(stampId, account);
        }

      } else {
        alert("Ensure you have logged into your Metamask wallet to own this stamp OR are not the existing owner");
      }
    }
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  