import React, { useEffect, useState } from 'react';

const ContactPage = () => {
  const [isAndroid, setIsAndroid] = useState(false);

  const contact = {
    name: 'Akash Pawar',
    phoneNumber: '+918070207007',
    email: 'contact@vr-bs.com',
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
      
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'contacts' });
        if (permission.state === 'granted') {
          await navigator.contacts.save([newContact]);
          alert('Contact saved successfully!');
          return;
        }
      }
      alert('Contact saving not supported. Please use the download option.');
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Failed to save contact. Try the download option.');
    }
  };

  // Download vCard for non-Android devices or as fallback
  const downloadVCard = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL;TYPE=CELL:${contact.phoneNumber}
EMAIL:${contact.email}
END:VCARD`.trim();

    try {
      const blob = new Blob([vCardData], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${contact.name}.vcf`;

      document.body.appendChild(link);
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download the vCard. Please try again.');
    }
  };

  // Fallback for Android where download might fail
  const handleAndroidFallback = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL;TYPE=CELL:${contact.phoneNumber}
EMAIL:${contact.email}
END:VCARD`.trim();

    const encodedData = encodeURIComponent(vCardData);
    const dataUrl = `data:text/vcard;charset=utf-8,${encodedData}`;

    window.location.href = dataUrl;
  };

  return (
    <div className="content" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Contact Information</h1>
      <p>Name: {contact.name}</p>
      <p>
        WhatsApp Me:{' '}
        <a href={`https://wa.me/${contact.phoneNumber.replace('+', '')}`}>
          {contact.phoneNumber}
        </a>
      </p>
      <p>
        Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
      <p>
        Visit Us: <a href="https://www.vr-bs.com">vr-bs.com</a>
      </p>

      {isAndroid ? (
        <>
          <button
            onClick={saveContact}
            style={{ marginTop: '20px', padding: '10px 20px' }}
          >
            Save Contact
          </button>
          <button
            onClick={handleAndroidFallback}
            style={{ marginTop: '10px', padding: '10px 20px' }}
          >
            Download vCard (Fallback)
          </button>
        </>
      ) : (
        <button
          onClick={downloadVCard}
          style={{ marginTop: '20px', padding: '10px 20px' }}
        >
          Save Contact
        </button>
      )}
      <p style={{ fontSize: '10px' }}>
        (After downloading, kindly <b>Open</b> the file to Save)
      </p>
    </div>
  );
};

export default ContactPage;
