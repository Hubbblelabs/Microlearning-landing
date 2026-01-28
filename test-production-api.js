/**
 * Production API Test Script
 * Tests the /api/contact endpoint in production mode
 */

const API_URL = process.env.API_URL || 'http://localhost:3000';
const CONTACT_ENDPOINT = `${API_URL}/api/contact`;

// ANSI color codes for better output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function section(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

async function testEndpoint(testName, data, expectedStatus = 200) {
  log(`\n🧪 Test: ${testName}`, 'blue');
  
  try {
    const startTime = Date.now();
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const duration = Date.now() - startTime;
    const responseData = await response.json();
    
    // Check status code
    const statusMatch = response.status === expectedStatus;
    log(`   Status: ${response.status} ${statusMatch ? '✓' : '✗ Expected: ' + expectedStatus}`, statusMatch ? 'green' : 'red');
    log(`   Duration: ${duration}ms`, 'yellow');
    
    // Log response
    log(`   Response:`, 'yellow');
    console.log('   ', JSON.stringify(responseData, null, 2).split('\n').join('\n    '));
    
    if (statusMatch) {
      log(`✅ PASSED: ${testName}`, 'green');
      return { success: true, data: responseData };
    } else {
      log(`❌ FAILED: ${testName}`, 'red');
      return { success: false, data: responseData };
    }
  } catch (error) {
    log(`❌ ERROR: ${testName}`, 'red');
    console.error('   Error:', error.message);
    return { success: false, error: error.message };
  }
}

async function testGETMethod() {
  log(`\n🧪 Test: GET Method (Should be rejected)`, 'blue');
  
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'GET',
    });
    
    const responseData = await response.json();
    
    const statusMatch = response.status === 405;
    log(`   Status: ${response.status} ${statusMatch ? '✓' : '✗ Expected: 405'}`, statusMatch ? 'green' : 'red');
    log(`   Response:`, 'yellow');
    console.log('   ', JSON.stringify(responseData, null, 2).split('\n').join('\n    '));
    
    if (statusMatch && responseData.error) {
      log(`✅ PASSED: GET Method Rejection`, 'green');
      return { success: true };
    } else {
      log(`❌ FAILED: GET Method Rejection`, 'red');
      return { success: false };
    }
  } catch (error) {
    log(`❌ ERROR: GET Method Rejection`, 'red');
    console.error('   Error:', error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  section('🚀 PRODUCTION API TEST SUITE');
  log(`Testing endpoint: ${CONTACT_ENDPOINT}`, 'cyan');
  
  const results = [];
  
  // Test 1: Valid submission
  section('Test 1: Valid Contact Form Submission');
  results.push(await testEndpoint(
    'Valid submission',
    {
      name: 'Production Test User',
      email: 'prod-test@example.com',
      message: 'This is a production API test submission.'
    },
    200
  ));
  
  // Test 2: Missing required fields
  section('Test 2: Missing Required Fields');
  results.push(await testEndpoint(
    'Missing name',
    {
      email: 'test@example.com',
      message: 'Test message'
    },
    400
  ));
  
  results.push(await testEndpoint(
    'Missing email',
    {
      name: 'Test User',
      message: 'Test message'
    },
    400
  ));
  
  results.push(await testEndpoint(
    'Missing message',
    {
      name: 'Test User',
      email: 'test@example.com'
    },
    400
  ));
  
  // Test 3: Invalid email format
  section('Test 3: Invalid Email Format');
  results.push(await testEndpoint(
    'Invalid email',
    {
      name: 'Test User',
      email: 'invalid-email',
      message: 'Test message'
    },
    400
  ));
  
  // Test 4: Empty fields
  section('Test 4: Empty Fields');
  results.push(await testEndpoint(
    'Empty name',
    {
      name: '',
      email: 'test@example.com',
      message: 'Test message'
    },
    400
  ));
  
  // Test 5: GET method (should be rejected)
  section('Test 5: Unsupported HTTP Method');
  results.push(await testGETMethod());
  
  // Test 6: Special characters handling
  section('Test 6: Special Characters Handling');
  results.push(await testEndpoint(
    'Special characters',
    {
      name: 'Test User with Special Chars !@#$%',
      email: 'test+special@example.com',
      message: 'Message with special characters: !@#$%^&*()_+-=[]{}|;:,.<>?'
    },
    200
  ));
  
  // Test 7: Long message
  section('Test 7: Long Message Handling');
  results.push(await testEndpoint(
    'Long message',
    {
      name: 'Test User',
      email: 'test@example.com',
      message: 'A'.repeat(5000) // 5000 character message
    },
    200
  ));
  
  // Summary
  section('📊 TEST SUMMARY');
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const total = results.length;
  
  log(`Total Tests: ${total}`, 'cyan');
  log(`Passed: ${passed}`, 'green');
  log(`Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`, passed === total ? 'green' : 'yellow');
  
  if (passed === total) {
    log('\n🎉 ALL TESTS PASSED! Production API is working correctly.', 'green');
  } else {
    log('\n⚠️  SOME TESTS FAILED! Please review the failures above.', 'red');
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
}

// Health check before running tests
async function healthCheck() {
  section('🏥 HEALTH CHECK');
  log('Checking if server is accessible...', 'cyan');
  
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      log('✅ Server is accessible', 'green');
      return true;
    } else {
      log(`⚠️  Server returned status: ${response.status}`, 'yellow');
      return true; // Continue anyway
    }
  } catch (error) {
    log('❌ Cannot connect to server', 'red');
    log(`   Make sure the server is running at: ${API_URL}`, 'yellow');
    log(`   Error: ${error.message}`, 'red');
    return false;
  }
}

// Run the test suite
async function main() {
  const isHealthy = await healthCheck();
  
  if (!isHealthy) {
    log('\n⚠️  Skipping tests due to health check failure', 'red');
    log('   Start the production server with: npm run start', 'yellow');
    process.exit(1);
  }
  
  await runTests();
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
