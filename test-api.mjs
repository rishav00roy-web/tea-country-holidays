import http from 'http';

async function testApi() {
  const req = http.request('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log('Response:', res.statusCode, data));
  });

  req.on('error', e => console.error('Error:', e.message));
  
  req.write(JSON.stringify({
    message: "What tour packages do you offer?",
    history: [
      { role: "assistant", text: "Namaste! I am your Tea Country Holidays concierge assistant." }
    ]
  }));
  req.end();
}

testApi();
