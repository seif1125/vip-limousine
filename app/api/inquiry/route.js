import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(req) {
  try {
    const body = await req.json();
    const { formData, locale } = body;
    const { company, name, email, message } = formData;

    const isAr = locale === 'ar';

    const translations = {
      en: {
        subject: `New Corporate Inquiry: ${company}`,
        newBooking: "New Company Inquiry",
        nameLabel: "Contact Name",
        companyLabel: "Company Name",
        emailLabel: "Email",
        messageLabel: "Message",
        disclaimer: "This is an automated inquiry from the company contact form.",
      },
      ar: {
        subject: `استفسار جديد للشركات: ${company}`,
        newBooking: "استفسار جديد من شركة",
        nameLabel: "اسم الشخص",
        companyLabel: "اسم الشركة",
        emailLabel: "البريد الإلكتروني",
        messageLabel: "الرسالة",
        disclaimer: "هذا بريد إلكتروني آلي من نموذج استفسار الشركات.",
      }
    };

    const t = translations[isAr ? 'ar' : 'en'];
    const dir = isAr ? 'rtl' : 'ltr';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'seifammar1125@gmail.com',
        pass: process.env.GMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"VIP Limousine Concierge" <s@gmail.com>`,
      to: 'seifammar1125@gmail.com', // Sent to you directly for corporate inquiries
      subject: t.subject,
      attachments: [
        {
          filename: 'logo.png',
          path: path.join(process.cwd(), 'public', 'logo.png'),
          cid: 'viplogo'
        }
      ],
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #0F172A; direction: ${dir}; text-align: ${isAr ? 'right' : 'left'};">
          
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:viplogo" alt="VIP Limousine" style="max-width: 150px; height: auto;" />
          </div>

          <h2 style="color: #C5A25D;">${t.newBooking}</h2>
          
          <div style="background: #F8FAFC; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0;">
            <p><strong>${t.companyLabel}:</strong> ${company}</p>
            <p><strong>${t.nameLabel}:</strong> ${name}</p>
            <p><strong>${t.emailLabel}:</strong> ${email}</p>
            <p><strong>${t.messageLabel}:</strong> ${message}</p>
          </div>
          
          <p style="font-size: 11px; color: #64748B; margin-top: 20px;">
            <em>${t.disclaimer}</em>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}