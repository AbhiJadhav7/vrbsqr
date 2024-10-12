import React, { useEffect, useState } from 'react';

const ContactPage = () => {
  const [isAndroid, setIsAndroid] = useState(false);

  const contact = {
    name: 'John Doe',
    phoneNumber: '+911234567890',
    email: 'john.doe@example.com',
  };

  // Detect if the user is on an Android/Chrome device
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroidDevice = userAgent.includes('android') && 'contacts' in navigator;
    setIsAndroid(isAndroidDevice);
  }, []);

  // Save contact for Android users
  const saveContact = async () => {
    try {
      const { name, phoneNumber, email } = contact;
      const newContact = { name, tel: [phoneNumber], email: [email] };

      const permission = await navigator.permissions.query({ name: 'contacts' });

      if (permission.state === 'granted') {
        await navigator.contacts.save([newContact]);
        alert('Contact saved successfully!');
      } else {
        alert('Please allow permission to save the contact.');
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Failed to save contact. Try the download option.');
    }
  };

  // Download vCard for non-Android devices
  const downloadVCard = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL:${contact.phoneNumber}
EMAIL:${contact.email}
ORG:Example Corp
END:VCARD
    `;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contact.name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Contact Information</h1>
      <p>Name: {contact.name}</p>
      <p>Phone: {contact.phoneNumber}</p>
      <p>Email: {contact.email}</p>

      {isAndroid ? (
        <button onClick={saveContact} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Save Contact
        </button>
      ) : (
        <button onClick={downloadVCard} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Download Contact (vCard)
        </button>
      )}
    </div>
  );
};

export default ContactPage;
