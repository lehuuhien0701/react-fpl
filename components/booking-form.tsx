"use client";

import React, { useState } from 'react';
import { translations } from '@/translations/common';
import { useParams, useRouter } from 'next/navigation';
import { i18n } from "@/i18n.config";
import { Locale } from '@/translations/types';

export const BookingForm = ({ 
  data,
  className
}: { 
  data: any;
  className?: string;
}) => {
  const params = useParams();
  const currentLocale = (params?.locale as Locale) || (i18n.defaultLocale as Locale);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agreement: true
  });

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = translations[currentLocale]?.field_required || translations[i18n.defaultLocale].field_required;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = translations[currentLocale]?.field_required || translations[i18n.defaultLocale].field_required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translations[currentLocale]?.invalid_email || translations[i18n.defaultLocale].invalid_email;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = translations[currentLocale]?.field_required || translations[i18n.defaultLocale].field_required;
    }
  

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale: currentLocale // truyền ngôn ngữ hiện tại vào API
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Reset form after successful submission
      setFormData({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        agreement: true
      });

      // Redirect to the Thank You page, thêm locale nếu không phải mặc định
      if (currentLocale === i18n.defaultLocale) {
        router.push('/thank-you');
      } else {
        router.push(`/${currentLocale}/thank-you`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(data.form_message.submit_error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Lấy label từ data (hoặc fallback)
  const firstNameLabel = data?.first_name_label || "First Name";
  const lastNameLabel = data?.last_name_label || "Last Name";
  const emailLabel = data?.email_label || "Email";
  const phoneLabel = data?.phone_label || "Phone";
  const messageLabel = data?.message_label || "Message";
  const accentPrimary = data?.accent_primary;
  const submitLabel = translations[currentLocale]?.submit || translations[i18n.defaultLocale].submit;

  //console.log("Rendering BookingForm:", data);

  return (
    <form onSubmit={handleSubmit} className={`w-full space-y-5 ${className || ''}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-[4px]">
          <label htmlFor="fname" className="font-normal text-sm leading-none text-[#CDCCD8]">{firstNameLabel}</label>
          <input
            type="text"
            id="fname"
            className="text-base text-white w-full h-11 p-2 outline-none focus:border-navy focus:ring-navy transition duration-200 bg-transparent border border-[#CDCCD8]"
            placeholder=""
            value={formData.name}
            onChange={e => handleInputChange('name', e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="flex flex-col space-y-[4px]">
          <label htmlFor="lname" className="font-normal text-sm leading-none text-[#CDCCD8]">{lastNameLabel}</label>
          <input
            type="text"
            id="lname"
            className="text-base text-white w-full h-11 p-2 outline-none focus:border-navy focus:ring-navy transition duration-200 bg-transparent border border-[#CDCCD8]"
            placeholder=""
            value={formData.lastName}
            onChange={e => handleInputChange('lastName', e.target.value)}
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-[4px]">
          <label htmlFor="email" className="font-normal text-sm leading-none text-[#CDCCD8]">{emailLabel}</label>
          <input
            type="email"
            id="email"
            className="text-base text-white w-full h-11 p-2 outline-none focus:border-navy focus:ring-navy transition duration-200 bg-transparent border border-[#CDCCD8]"
            placeholder=""
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="flex flex-col space-y-[4px]">
          <label htmlFor="phone" className="font-normal text-sm leading-none text-[#CDCCD8]">{phoneLabel}</label>
          <input
            type="text"
            id="phone"
            className="text-base text-white w-full h-11 p-2 outline-none focus:border-navy focus:ring-navy transition duration-200 bg-transparent border border-[#CDCCD8]"
            placeholder=""
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="flex flex-col space-y-[4px]">
        <label htmlFor="message" className="font-normal text-sm leading-none text-[#CDCCD8]">{messageLabel}</label>
        <textarea
          id="message"
          className="text-base text-white w-full h-40 p-2 outline-none focus:border-navy focus:ring-navy transition duration-200 bg-transparent border border-[#CDCCD8]"
          placeholder={translations[currentLocale]?.message || translations[i18n.defaultLocale].message}
          value={formData.message}
          onChange={e => handleInputChange('message', e.target.value)}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="emailOptIn2"
            name="emailOptIn"
            className="peer2 hidden"
            checked={formData.agreement}
            required
            onChange={e => handleInputChange('agreement', e.target.checked)}
          />
          <label htmlFor="emailOptIn2" className="custom-checkbox-button2 mr-[10px] relative flex items-center justify-center flex-shrink-0">
            <svg className="absolute h-4 w-4 text-white opacity-0 transition-opacity duration-200" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g opacity="0.6">
                <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#CDCCD8" />
                <path d="M12.207 4.79303C12.3945 4.98056 12.4998 5.23487 12.4998 5.50003C12.4998 5.76519 12.3945 6.0195 12.207 6.20703L7.207 11.207C7.01947 11.3945 6.76517 11.4998 6.5 11.4998C6.23484 11.4998 5.98053 11.3945 5.793 11.207L3.793 9.20703C3.61084 9.01843 3.51005 8.76583 3.51233 8.50363C3.51461 8.24143 3.61978 7.99062 3.80518 7.80521C3.99059 7.6198 4.2414 7.51463 4.5036 7.51236C4.7658 7.51008 5.0184 7.61087 5.207 7.79303L6.5 9.08603L10.793 4.79303C10.9805 4.60556 11.2348 4.50024 11.5 4.50024C11.7652 4.50024 12.0195 4.60556 12.207 4.79303Z" fill="#CDCCD8" />
              </g>
            </svg>
          </label>
          <label htmlFor="emailOptIn2" className="font-normal text-xs text-[#CDCCD8] cursor-pointer select-none">
            {accentPrimary || "By checking this box and submitting this form, I explicitly agree..."}
          </label>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto text-sm font-medium text-primary bg-secondary h-11 px-10 hover:bg-white transition duration-200"
          disabled={loading}
        >
          {loading ? 'Submitting...' : submitLabel}
        </button>
      </div>
    </form>
  );
};