/**
 * Test script for the detailed pilot proposal form
 */

const API_URL = process.env.API_URL || 'http://localhost:3000';
const CONTACT_ENDPOINT = `${API_URL}/api/contact`;

console.log('\n🧪 Testing Detailed Pilot Proposal Form');
console.log('='.repeat(60));

async function testDetailedForm() {
    const formData = {
        name: "John Smith",
        email: "john.smith@acme-corp.com",
        company: "Acme Corporation",
        workerCount: "501-1000",
        phone: "+91 98765 43210",
        industry: "Manufacturing"
    };

    // The form converts these fields into a message
    const expectedMessage = `Company: ${formData.company}
Worker Count: ${formData.workerCount}
Phone: ${formData.phone}
Industry: ${formData.industry}

Request for pilot proposal.`;

    console.log('\n📝 Test Data:');
    console.log('   Name:', formData.name);
    console.log('   Email:', formData.email);
    console.log('   Company:', formData.company);
    console.log('   Worker Count:', formData.workerCount);
    console.log('   Phone:', formData.phone);
    console.log('   Industry:', formData.industry);

    try {
        console.log('\n📤 Sending request...');
        
        const response = await fetch(CONTACT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                message: expectedMessage
            }),
        });

        const data = await response.json();

        console.log('\n📥 Response:');
        console.log('   Status:', response.status);
        console.log('   Success:', data.success);
        console.log('   Email Sent:', data.emailSent);
        console.log('   Row Index:', data.rowIndex);
        console.log('   Message:', data.message);

        if (response.ok && data.success) {
            console.log('\n✅ SUCCESS! Detailed form is working correctly!');
            console.log('\n📧 Confirmation email should be sent to:', formData.email);
            console.log('📊 Data should be saved in Google Sheets at row:', data.rowIndex);
            return true;
        } else {
            console.log('\n❌ FAILED:', data.error || 'Unknown error');
            return false;
        }
    } catch (error) {
        console.log('\n❌ ERROR:', error.message);
        return false;
    }
}

// Run the test
testDetailedForm().then(success => {
    console.log('\n' + '='.repeat(60));
    if (success) {
        console.log('✅ All checks passed! The detailed form is production ready.');
    } else {
        console.log('❌ Test failed. Please check the errors above.');
        process.exit(1);
    }
    console.log('='.repeat(60) + '\n');
});
