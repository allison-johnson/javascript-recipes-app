class API {

  static baseURL = 'http://localhost:3000/api';

  static get(url) {
    //fetch sends a GET request by default
    return fetch(this.baseURL + url)
      .then(function (response) {
          if (response.status !== 200) {
            throw new Error(response.statusText)
          }
          return response.json();
      })
  }//get

  static post(url, data) {
    return fetch(this.baseURL + url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(resp => {
        return resp.json();
      })
  }//post

  static delete(url) {
    return fetch(this.baseURL + url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.text())
  }

}//class