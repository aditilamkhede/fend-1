function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    // Client.checkForName(formText)

    if(!Client.validateURL(formText)){
      alert('Invalid URL');
      return
    }
    console.log("::: Form Submitted :::")
    // fetch('http://localhost:8080/test')

    var urldata = {nlpurl: formText};

    postnlpdata('http://localhost:8081/nlpapi', urldata)
    .then(function(data){
      console.log('inside then', data);
      // let strLabel = data[0]['label']
      // console.log('In Response Data Label - ', strLabel);
      alert('post response Data - '+ data);
      getNlpData('http://localhost:8081/nlpapi', urldata)
      .then(function(data) {
        console.log(data);
        updateUI(data);
      })
    });
    // fetch('/nlpapi', {
    //   method: 'POST',
    //   credentials: 'same-origin',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(urldata),
    // })
    // .then(res => res.json())
    // .then(function(res) {
    //   alert('Inside', res);
    //     document.getElementById('results').innerHTML = res.message
    // })
}

function updateUI(result)
{
  try {
    // document.getElementById('results').innerHTML = result.categories[0]['label'];
    document.getElementById('urlImage').src = result.image;
    document.querySelector('#title p:nth-child(2)').innerHTML = result.title;
    document.querySelector('#author p:nth-child(2)').innerHTML = result.author;
  } catch (e) {
    console.log("updateUI Error - ", e);
  }
}
//get request to get nlp data
const getNlpData = async(baseUrl, data) => {
  console.log('in getNlpData', data);
  // const wURL = apiBaseURL+'?appid='+key;
  const wURL = baseUrl;
  console.log('url', wURL);
  const res = await fetch(wURL, data);
  try {
    console.log('Try getNlpData', res);
    const rsdata = await res.json();
    console.log('Data getNlpData', rsdata);
    return rsdata;
  } catch(ex) {
    console.log('Error in getNlpData', ex);
  }
}


const postnlpdata = async(url='', data={}) => {
  console.log("In Post 1", url, data['nlpurl']);
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    console.log("In post data", newData);
    return newData;
  } catch (err) {
    console.log('Error in postnlpdata', err);
  }
}

export { handleSubmit }
