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
TEL;TYPE=CELL:${contact.phoneNumber}
EMAIL:${contact.email}
END:VCARD
    `.trim(); // Ensure no leading/trailing whitespace

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
    
    <div className='content'  style={{ textAlign: 'center', padding: '50px' }}>
        
      <h1>Contact Information</h1>
      <p>Name: {contact.name}</p>
      <p>Phone: {contact.phoneNumber}</p>
      <p>Email: <a href={contact.email}>{contact.email}</a></p>
      <p>Visit Us : <a href='https://www.vr-bs.com'>vr-bs.com</a></p>
      

      {isAndroid ? (
        <button onClick={saveContact} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Save Contact
        </button>
      ) : (
        <button onClick={downloadVCard} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Save Contact
        </button>
      )}
      <p style={{fontSize:'10px'}}>(After downloading, kindly <b>Open</b> the file to Save)</p>
    </div>
  );
};

export default ContactPage;
