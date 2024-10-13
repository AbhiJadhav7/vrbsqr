import React, { useEffect, useState } from 'react';
import hero from '../hero.jpg'; // Make sure to replace with the correct path to your image
import ContactsIcon from '@mui/icons-material/Contacts';
import MailIcon from '@mui/icons-material/Mail';
import LanguageIcon from '@mui/icons-material/Language';
import logo from '../logo.png'
const ContactPage = () => {
  const [isAndroid, setIsAndroid] = useState(false);

  const contact = {
    name: 'Kirti Pawar',
    phoneNumber: '+918600224847',
    email: 'kirti.pawar@vr-bs.com',
    jobTitle: 'Founder & Managing Director'
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
    <div className="content" style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ width: '200px', height: '200px', borderRadius: '50%', backgroundColor: '#ccc', display: 'inline-block', marginTop: '20px', overflow: 'hidden' }}>
        <img
          className='hero'
          src={hero}
          alt=""
          style={{position:'relative' , width: '100%', height: '100%', objectFit: 'cover' }} // Ensure the image fills the circle
        />
      </div>
      <p style={{ lineHeight: '1.4' }}>
        <span>{contact.name}</span><br />
        <u><span className='sp'>{contact.jobTitle}</span></u>
      </p>
      <p className='anchors' style={{lineHeight:'1.7'}}>
      <ContactsIcon style={{ marginRight: '6px',top:'7px',right:'2px',position:'relative',color:'rgb(246, 221, 188)' }} />
        <a className='anchor3'  href={`https://wa.me/${contact.phoneNumber.replace('+', '')}`}>
          {contact.phoneNumber}
        </a><br />
        <LanguageIcon style={{ marginRight: '6px',top:'7px',right:'2px',position:'relative',color:'rgb(246, 221, 188)' }} />
        <a className='anchor1'  href="https://www.vr-bs.com">www.vr-bs.com</a><br />
        <MailIcon style={{ marginRight: '6px',top:'7px',right:'2px',position:'relative',color:'rgb(246, 221, 188)' }} />
         <a className='anchor2'  href={`mailto:${contact.email}`}>{contact.email}</a><br />
        

      </p>
      {isAndroid ? (
        <>
          <button
            onClick={saveContact}
            style={{ marginTop: '10px', padding: '10px 20px',display:'none' }}
          >
            Save Contact (PC / IOS)
          </button>
          <button
            onClick={handleAndroidFallback}
            style={{ marginTop: '10px', padding: '10px 20px' }} //android
          >
            Save Contact
          </button>
        </>
      ) : (
        <button
          onClick={downloadVCard}
          style={{marginTop: '10px', padding: '10px 20px' }}
        >
          Save Contact
        </button>
      )}
      <p className='advisory'>
        (After downloading, kindly <b>Open</b> the file to Save)
      </p>
      <br />
      <div style={{display:'flex',alignItems:"center",justifyContent:"center"}}>
      <img style={{width:'250px'}} src={logo} alt="" />
      </div>
    </div>
  );
};

export default ContactPage;
