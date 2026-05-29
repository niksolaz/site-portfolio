'use client'
import Navbar from "../../components/Navbar";
import Alert from '../../components/Alert'
import React, { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import useAlert from '../../hooks/useAlert'
import Image from "next/image";
import Link from 'next/link'

interface IForm {
  name: string;
  email: string;
  message: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderMessage: string;
}

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const [theme, setTheme] = useState(false)
  const [local, setLocal] = useState('en')
  
  const { alert, showAlert, hideAlert } = useAlert()

  const localLink: {en: string, it: string, es: string, fr: string} = {
    en: 'CONTACT ME',
    it: 'CONTATTAMI',
    es: 'CONTACTAME',
    fr: 'CONTACTEZ-MOI'
  }

  const preTitle: {en: string, it: string, es: string, fr: string} = {
    en: 'Write me for info and I will reply as soon as possible ...',
    it: 'Scrivimi per info e ti risponderò al più presto ... ',
    es: 'Escríbeme para obtener información y te responderé lo antes posible ...',
    fr: 'Écrivez-moi pour obtenir des informations et je vous répondrai dès que possible ...'

  }

  const endTitle: {en: string, it: string, es: string, fr: string} = {
    en: '... or contact me on Linkedin',
    it: '... oppure contattami su Linkedin',
    es: '... o contáctame en Linkedin',
    fr: '... ou contactez-moi sur Linkedin'
  }

  const btnSend: {en: string, it: string, es: string, fr: string} = {
    en: 'SEND',
    it: 'INVIA',
    es: 'ENVIAR',
    fr: 'ENVOYER'
  }

  const formLabel: {en: IForm, it: IForm, es: IForm, fr: IForm} = {
    en: {
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your Message',
      placeholderName: 'John Doe',
      placeholderEmail: 'email@example.com',
      placeholderMessage: 'let me know how I can help you'
    },
    it: {
      name: 'Il tuo Nome',
      email: 'La tua Email',
      message: 'Il tuo Messaggio',
      placeholderName: 'Mario Rossi',
      placeholderEmail: 'email@esempio.com',
      placeholderMessage: 'fammi sapere come posso aiutarti'
    },
    es: {
      name: 'Tu Nombre',
      email: 'Tu Correo Electrónico',
      message: 'Tu Mensaje',
      placeholderName: 'Juan Pérez',
      placeholderEmail: 'email@ejemplo.com',
      placeholderMessage: 'déjame saber cómo puedo ayudarte'
    },
    fr: {
      name: 'Votre Nom',
      email: 'Votre Email',
      message: 'Votre Message',
      placeholderName: 'Jean Dupont',
      placeholderEmail: 'email@exemple.com',
      placeholderMessage: 'faites-moi savoir comment je peux vous aider'
    }
  }

  const toggleTheme = () => {
    setTheme(!theme)
  }

  const selectTongue = (e:any) => {
    setLocal(e.target.value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    
    
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
  
  };

  useEffect(() => {
    if (theme) {
      document.body.classList.add('light-theme');
      document.getElementById('theme-switcher')?.classList.remove('icon-moon');
      document.getElementById('theme-switcher')?.classList.add('icon-sun');
      document.getElementById('footer-switcher')?.classList.remove('footer-light');
      document.getElementById('footer-switcher')?.classList.add('footer-dark');
    } else {
      document.body.classList.remove('light-theme');
      document.getElementById('theme-switcher')?.classList.remove('icon-sun');
      document.getElementById('theme-switcher')?.classList.add('icon-moon');
      document.getElementById('footer-switcher')?.classList.remove('footer-dark');
      document.getElementById('footer-switcher')?.classList.add('footer-light');
    }
  }, [theme])
  
    return (
      <>
        <main className="flex min-h-screen flex-col items-center justify-between p-5 lg:p-24">
        <Navbar local={local} />
        <div className="fixed top-0 z-20 flex items-center justify-center space-x-4 py-2">
          <button onClick={toggleTheme}>
            <Image
                id="theme-switcher"
                className="rounded-full w-6 h-6 lg:w-8 lg:h-8 p-1"
                src="/theme.svg"
                alt="theme light/dark mode switcher"
                width={20}
                height={20}
                priority
                />
          </button>
          <select onChange={selectTongue} className="h-6 text-xs text-gray-600 lg:h-8 lg:text-sm border border-gray-400 p-1 bg-gray-200 rounded-lg">
            <option value="en">EN</option>
            <option value="it">IT</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>
        </div>
         {alert.show && <Alert {...alert} />}
         <div className="flex-1 min-w-[50%] flex flex-col  mt-24">
            <h1 className="head-text">{ preTitle[local as keyof typeof preTitle] }</h1>
            <form 
              className="w-full flex flex-col gap-7 mt-4"
              onSubmit={handleSubmit}
            >
              <label className=" font-semibold">
                {formLabel[local as keyof typeof formLabel].name}
                <input 
                  type="text" 
                  name="name"
                  className="input"
                  placeholder={formLabel[local as keyof typeof formLabel].placeholderName}
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </label>
              <label className="font-semibold">
                {formLabel[local as keyof typeof formLabel].email}
                <input 
                  type="email" 
                  name="email"
                  className="input"
                  placeholder={formLabel[local as keyof typeof formLabel].placeholderEmail}
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </label>
              <label className="font-semibold">
                {formLabel[local as keyof typeof formLabel].message}
                <textarea 
                  name="message"
                  rows={4}
                  className="textarea"
                  placeholder={formLabel[local as keyof typeof formLabel].placeholderMessage}
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
                {isLoading ? 'Sending...' : btnSend[local as keyof typeof btnSend]}
              </button>
            </form>
            <h1 className="mt-14">{ endTitle[local as keyof typeof endTitle] }</h1>
            <div className="py-5">
              <a href="https://www.linkedin.com/in/nicolasolazzo/" target="_blank" rel="noreferrer">
                <Image
                  src="/linkedin.png"
                  alt="Linkedin Logo"
                  width={24}
                  height={24}
                  priority
                />
              </a>
            </div>
          </div>
        </main>
        <footer id="footer-switcher" className="w-full text-center py-4 mt-6 rounded-t-lg">
          <p>© 2024 Nicola Solazzo</p>
          <Link href="/contact" className="text-xs font-medium ">
            {localLink[local as keyof typeof localLink]}
          </Link>
        </footer>
      </>
    )
}
