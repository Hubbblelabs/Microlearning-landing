#!/usr/bin/env node
/**
 * Quick Production Health Check
 * Run this after deployment to verify all systems are operational
 */

const API_URL = process.env.API_URL || 'http://localhost:3000';

const checks = {
  passed: 0,
  failed: 0,
  results: []
};

function log(emoji, message, status = '') {
  const statusColor = status === 'PASS' ? '\x1b[32m' : status === 'FAIL' ? '\x1b[31m' : '';
  const reset = '\x1b[0m';
  console.log(`${emoji} ${message} ${statusColor}${status}${reset}`);
}

async function checkHomepage() {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      checks.passed++;
      log('✅', 'Homepage accessible', 'PASS');
      return true;
    }
    checks.failed++;
    log('❌', `Homepage returned ${response.status}`, 'FAIL');
    return false;
  } catch (error) {
    checks.failed++;
    log('❌', `Homepage not accessible: ${error.message}`, 'FAIL');
    return false;
  }
}

async function checkAPIEndpoint() {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'GET'
    });
    
    // We expect 405 for GET requests
    if (response.status === 405) {
      checks.passed++;
      log('✅', 'API endpoint responding', 'PASS');
      return true;
    }
    checks.failed++;
    log('❌', `API endpoint returned unexpected status: ${response.status}`, 'FAIL');
    return false;
  } catch (error) {
    checks.failed++;
    log('❌', `API endpoint error: ${error.message}`, 'FAIL');
    return false;
  }
}

async function checkAPIValidation() {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test' }) // Missing required fields
    });
    
    if (response.status === 400) {
      const data = await response.json();
      if (data.error) {
        checks.passed++;
        log('✅', 'API validation working', 'PASS');
        return true;
      }
    }
    checks.failed++;
    log('❌', 'API validation not working properly', 'FAIL');
    return false;
  } catch (error) {
    checks.failed++;
    log('❌', `API validation check failed: ${error.message}`, 'FAIL');
    return false;
  }
}

async function checkSitemap() {
  try {
    const response = await fetch(`${API_URL}/sitemap.xml`);
    if (response.ok && response.headers.get('content-type')?.includes('xml')) {
      checks.passed++;
      log('✅', 'Sitemap available', 'PASS');
      return true;
    }
    checks.failed++;
    log('❌', 'Sitemap not accessible', 'FAIL');
    return false;
  } catch (error) {
    checks.failed++;
    log('❌', `Sitemap check failed: ${error.message}`, 'FAIL');
    return false;
  }
}

async function checkRobots() {
  try {
    const response = await fetch(`${API_URL}/robots.txt`);
    if (response.ok) {
      checks.passed++;
      log('✅', 'Robots.txt available', 'PASS');
      return true;
    }
    checks.failed++;
    log('❌', 'Robots.txt not accessible', 'FAIL');
    return false;
  } catch (error) {
    checks.failed++;
    log('❌', `Robots.txt check failed: ${error.message}`, 'FAIL');
    return false;
  }
}

async function checkManifest() {
  try {
    const response = await fetch(`${API_URL}/manifest.webmanifest`);
    if (response.ok) {
      checks.passed++;
      log('✅', 'Manifest available', 'PASS');
      return true;
    }
    checks.failed++;
    log('❌', 'Manifest not accessible', 'FAIL');
    return false;
  } catch (error) {
    checks.failed++;
    log('❌', `Manifest check failed: ${error.message}`, 'FAIL');
    return false;
  }
}

async function checkSecurityHeaders() {
  try {
    const response = await fetch(API_URL);
    const headers = {
      'x-frame-options': response.headers.get('x-frame-options'),
      'x-content-type-options': response.headers.get('x-content-type-options'),
      'strict-transport-security': response.headers.get('strict-transport-security'),
    };
    
    const hasRequiredHeaders = 
      headers['x-frame-options'] && 
      headers['x-content-type-options'];
    
    if (hasRequiredHeaders) {
      checks.passed++;
      log('✅', 'Security headers present', 'PASS');
      return true;
    }
    checks.failed++;
    log('⚠️', 'Some security headers missing', 'WARN');
    return false;
  } catch (error) {
    checks.failed++;
    log('❌', `Security headers check failed: ${error.message}`, 'FAIL');
    return false;
  }
}

async function runHealthCheck() {
  console.log('\n' + '='.repeat(50));
  console.log('🏥 PRODUCTION HEALTH CHECK');
  console.log('='.repeat(50));
  console.log(`Testing: ${API_URL}\n`);

  await checkHomepage();
  await checkAPIEndpoint();
  await checkAPIValidation();
  await checkSitemap();
  await checkRobots();
  await checkManifest();
  await checkSecurityHeaders();

  console.log('\n' + '='.repeat(50));
  console.log('📊 RESULTS');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${checks.passed}`);
  console.log(`❌ Failed: ${checks.failed}`);
  console.log(`📈 Success Rate: ${((checks.passed / (checks.passed + checks.failed)) * 100).toFixed(1)}%`);
  
  if (checks.failed === 0) {
    console.log('\n🎉 All health checks passed! System is operational.\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some checks failed. Please review the issues above.\n');
    process.exit(1);
  }
}

runHealthCheck().catch(error => {
  console.error('\n❌ Fatal error during health check:', error.message);
  process.exit(1);
});
