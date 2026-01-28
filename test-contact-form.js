// Test contact form submission
const https = require('https');

const testData = {
  name: 'Test User',
  email: 'test@example.com',
  message: 'This is a test message from the contact form system.'
};

const data = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('\n=== Testing Contact Form Submission ===\n');
console.log('Submitting test data:');
console.log(testData);
console.log('\n');

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Response Status:', res.statusCode);
    console.log('Response Headers:', res.headers);
    console.log('\nResponse Body:');
    try {
      const parsed = JSON.parse(responseData);
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log(responseData);
    }
  });
});

req.on('error', (error) => {
  // Try with http instead
  console.log('HTTPS failed, trying HTTP...\n');
  
  const http = require('http');
  const httpOptions = { ...options, protocol: 'http:' };
  delete httpOptions.port;
  httpOptions.port = 3000;
  
  const httpReq = http.request(httpOptions, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      console.log('Response Status:', res.statusCode);
      console.log('\nResponse Body:');
      try {
        const parsed = JSON.parse(responseData);
        console.log(JSON.stringify(parsed, null, 2));
        
        if (parsed.success) {
          console.log('\n✅ SUCCESS: Contact form submission worked!');
          console.log('   - Email sent:', parsed.emailSent);
          console.log('   - Row index:', parsed.rowIndex);
        } else {
          console.log('\n❌ ERROR:', parsed.error);
        }
      } catch (e) {
        console.log(responseData);
      }
    });
  });

  httpReq.on('error', (error) => {
    console.error('❌ Request Error:', error.message);
  });

  httpReq.write(data);
  httpReq.end();
});

req.write(data);
req.end();
