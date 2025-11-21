import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { translations } from '@/translations/common';
import type { Translations } from '@/translations/types'; // thêm dòng này

export async function POST(request: Request) {
  try {
    // Lấy dữ liệu từ request
    const formData = await request.json();
    // DEBUG: log formData để kiểm tra dữ liệu nhận được
    console.log("[booking API] formData:", formData);

    const currentYear = new Date().getFullYear();

    // Lấy locale từ formData.locale
    const locale = typeof formData.locale === "string" && formData.locale in translations
      ? formData.locale
      : 'en';
    const t = translations[locale as keyof typeof translations] || translations['en']; // fallback nếu không có bản dịch

    // Tạo transporter cho nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // DEBUG: log cấu hình transporter (ẩn pass)
    console.log("[booking API] transporter config:", {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? "***" : undefined,
    });

    const recipientEmails = {
    secretimmo: process.env.SECRETIMMO_EMAIL,
    nextimmo: process.env.NEXTIMMO_EMAIL
    };

    // HTML cho email người dùng
    const userEmailHtml = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border-radius: 8px;">
      <h2 style="color: #B38E41;">${t.email_subject_user || "Demande de propriété"}</h2>
      <p>${t.email_greeting_user?.replace('{name}', formData.name) || `Bonjour ${formData.name},`}</p>
      <p>${t.email_body_user || "Nous avons bien reçu votre demande d’estimation et nous vous en remercions. Un responsable vous contactera sous peu afin de vous proposer des créneaux disponibles pour la visite sur place. Voici le récapitulatif des informations concernant votre bien à estimer:"}</p>
      <h3>${t.email_personal_info || "Informations personnelles :"}</h3>
      <ul>
        <li><strong>${t.first_name_label || "Nom"} :</strong> ${formData.name}</li>
        <li><strong>${t.last_name_label || "Prénom"} :</strong> ${formData.lastName}</li>
        <li><strong>${t.email_label || "Email"} :</strong> ${formData.email}</li>
        <li><strong>${t.phone_label || "Téléphone"} :</strong> ${formData.phone}</li>
        <li><strong>${t.message_label || "Message"} :</strong> ${formData.message}</li>
      </ul>
      <p>${t.email_contact_soon || "Nous vous contacterons très prochainement."}</p>
      <hr style="border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="color: #999;">© ${currentYear} Fiduciaire Premier Luxembourg S.A.. Tous droits réservés.</p>
    </div>
    `;

    // HTML cho email quản trị viên
    const adminEmailHtml = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border-radius: 8px;">
      <h2 style="color: #B38E41;">${t.email_subject_admin || "Nouvelle demande de propriété"}</h2>
      <h3>${t.email_personal_info || "Informations personnelles :"}</h3>
      <ul>
        <li><strong>${t.first_name_label || "Nom"} :</strong> ${formData.name}</li>
        <li><strong>${t.last_name_label || "Prénom"} :</strong> ${formData.lastName}</li>
        <li><strong>${t.email_label || "Email"} :</strong> ${formData.email}</li>
        <li><strong>${t.phone_label || "Téléphone"} :</strong> ${formData.phone}</li>
        <li><strong>${t.message_label || "Message"} :</strong> ${formData.message}</li>
      </ul>
      <hr style="border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="color: #999;">© ${currentYear} Fiduciaire Premier Luxembourg S.A.. Tous droits réservés.</p>
    </div>
    `;

    // Tùy chọn gửi email cho người dùng
    const userMailOptions = {
      from: '"Fiduciaire Premier Luxembourg S.A." <noreply@nextimmo.lu>',
      to: formData.email,
      subject: 'Votre demande de propriété a été reçue',
      html: userEmailHtml,
    };

    // Tùy chọn gửi email cho quản trị viên
    const adminMailOptions = {
      from: '"Fiduciaire Premier Luxembourg S.A." <noreply@nextimmo.lu>',
      to: (recipientEmails as any)[formData.emailType] || process.env.ADMIN_EMAIL,
      subject: 'Nouvelle demande de propriété',
      html: adminEmailHtml,
    };

    // Gửi email
    try {
      const userResult = await transporter.sendMail(userMailOptions);
      console.log("[booking API] userMailOptions result:", userResult);
    } catch (err) {
      console.error("[booking API] Error sending user email:", err);
      throw err;
    }
    try {
      const adminResult = await transporter.sendMail(adminMailOptions);
      console.log("[booking API] adminMailOptions result:", adminResult);
    } catch (err) {
      console.error("[booking API] Error sending admin email:", err);
      throw err;
    }

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('[booking API] Error sending email:', error);
    return NextResponse.json({ message: 'Error sending emails' }, { status: 500 });
  }
}
