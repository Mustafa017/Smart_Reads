const axios = require('axios');
const xml2js = require('xml2js');

const parser = xml2js.Parser({ explicitArray: false });

// make a request to goodreads
function getBookData(id) {
    // use axios to make HTTP requests in both node and browser
    axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=GN6yhQAOwVolAnN2TS5V4g`)
        .then((response)=>{
            parser.parseString(response.data, (err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    console.log(result.GoodreadsResponse.book);
                }
            })
        })
        .catch(()=>{
            console.log(error);
        })
}
getBookData(50);
