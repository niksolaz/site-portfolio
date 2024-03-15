'use client'
import Navbar from "../../components/Navbar";
import Alert from '../../components/Alert'
import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import useAlert from '../../hooks/useAlert'

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)
  
  const { alert, showAlert, hideAlert } = useAlert()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    console.log(serviceId, templateId, publicKey)
    
    /*
    emailjs.send(
      serviceId!,
      templateId!,
      {
        from_name: form.name,
        to_name: 'Nicola',
        from_email: form.email,
        to_email: 'solazzo.nicola@gmail.com',
        message: form.message
      },
      publicKey
    ).then(() => {
      setIsLoading(false);
      showAlert({ show: true, text: 'Message sent successfully', type: 'success' } as { show: boolean, text: string, type?: string });
      setTimeout(() => {
        hideAlert();
        setForm({ name: '', email: '', message: '' });
      }, 3000)
    }).catch(err => {
      setIsLoading(false);
      console.error(err)
      showAlert({ show: true, text: 'An error occurred, please try again later', type: 'danger' } as { show: boolean, text: string, type?: string });
    })
    */
  };
  
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
         <Navbar />
         {alert.show && <Alert {...alert} />}
         <div className="flex-1 min-w-[50%] flex flex-col">
            <h1 className="head-text">Get in touch</h1>
            <form 
              className="w-full flex flex-col gap-7 mt-14"
              onSubmit={handleSubmit}
            >
              <label className="ext-black-50 font-semibold">
                Your Name
                <input 
                  type="text" 
                  name="name"
                  className="input"
                  placeholder="Mario Rossi"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </label>
              <label className="ext-black-50 font-semibold">
                Your Email
                <input 
                  type="email" 
                  name="email"
                  className="input"
                  placeholder="email@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </label>
              <label className="ext-black-50 font-semibold">
                Your Message
                <textarea 
                  name="message"
                  rows={4}
                  className="textarea"
                  placeholder="let me know how I can help you"
                  required
                  value={form.message}
                  onChange={handleChange}
                />
              </label>
              <button
                type="submit"
                className="btn"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </main>
    )
}
