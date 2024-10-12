import React, { useEffect, useState } from 'react';

const ContactPage = () => {
  const [deviceType, setDeviceType] = useState(null);

  const contact = {
    name: 'John Doe',
    phoneNumber: '+911234567890',
    email: 'john.doe@example.com',
  };

  // Detect if the user is on an Android or iOS device
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('android')) {
      setDeviceType('android');
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      setDeviceType('ios');
    }
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

  // Download vCard for Android devices
  const downloadAndroidVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL;TYPE=CELL:${contact.phoneNumber}
EMAIL:${contact.email}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contact.name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download vCard for iOS devices
  const downloadIOSVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL;TYPE=CELL:${contact.phoneNumber}
EMAIL:${contact.email}
N:${contact.name}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contact.name}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    if (deviceType === 'android') {
      downloadAndroidVCard();
    } else if (deviceType === 'ios') {
      downloadIOSVCard();
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Contact Information</h1>
      <p>Name: {contact.name}</p>
      <p>Phone: {contact.phoneNumber}</p>
      <p>Email: {contact.email}</p>

      {deviceType === 'android' ? (
        <button onClick={saveContact} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Save Contact
        </button>
      ) : (
        <button onClick={handleDownload} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Download Contact (vCard)
        </button>
      )}
    </div>
  );
};

export default ContactPage;
