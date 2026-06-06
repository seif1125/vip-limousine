// app/api/send/route.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(req) {
  try {
    const body = await req.json();
  
    // 1. Extract payload and locale from the body (matching the frontend fetch body)
    const { payload, locale = 'en' } = body;
    
    // 2. Destructure properties directly from the payload object
    const {
      customerName,
      email,
      phone1,
      phone2,
      nationality,
      car,
      fromDate,
      toDate,
      totalPrice,
      extraHourCost, // Matching frontend payload
      extraHours,    // Matching frontend payload
      paymentType,
      rate
    } = payload;

    const isAr = locale === 'ar';

    // Fallback name processing to prevent undefined errors
    const carName = car ? (isAr ? car.name_ar : (car.name_en || car.name)) : 'Vehicle';

    // Multilingual support
    const translations = {
      en: {
        subject: `Reservation Request: ${carName} from ${fromDate} to ${toDate}`,
        newBooking: "New Booking Request",
        hello: "Hello",
        received: "We have received your request for the",
        shortly: "Our concierge will contact you shortly.",
        details: "Details:",
        pickup: "Pickup",
        return: "Return",
        nationalityLabel: "Nationality",
        mobile: "Mobile",
        baseRate: "Base Rate",
        additionalHoursLabel: "Extra hours",
        additionalPriceLabel: "Extra price",
        none: "None",
        estimatedTotal: "Estimated Total",
        paymentMethod: "Payment Method",
        disclaimer: "This is an automated receipt of your inquiry. Final confirmation and prices are subject to changes.",
      },
      ar: {
        subject: `طلب حجز: ${carName} من ${fromDate} إلى ${toDate}`,
        newBooking: "طلب حجز جديد",
        hello: "مرحباً",
        received: "لقد تلقينا طلبك لسيارة",
        shortly: "سيتواصل معك فريق خدمة العملاء لدينا قريباً.",
        details: "التفاصيل:",
        pickup: "تاريخ الاستلام",
        return: "تاريخ الإرجاع",
        nationalityLabel: "الجنسية",
        mobile: "رقم الهاتف",
        baseRate: "السعر الأساسي",
        additionalHoursLabel: "ساعات إضافية",
        additionalPriceLabel: "سعر إضافي",
        none: "لا يوجد",
        estimatedTotal: "الإجمالي التقديري",
        paymentMethod: "طريقة الدفع",
        disclaimer: "هذا إيصال آلي لاستفسارك. التأكيد النهائي والأسعار قابلة للتغيير.",
      }
    };

    const t = translations[isAr ? 'ar' : 'en'];
    const dir = isAr ? 'rtl' : 'ltr';

    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'seifammar1125@gmail.com', // Recommend using process.env.EMAIL_USER here
    //     pass: process.env.GMAIL_PASS, 
    //   },
    // });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'seifammar1125@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
       
      },
    });
    const mailOptions = {
      from: `"VIP Limousine Concierge" <s@gmail.com>`,
      to: email || 'seifammar1125@gmail.com', 
      bcc: 'seifammar1125@gmail.com',
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
          <p>${!email ? 'Reservation for' : t.hello} <strong>${customerName || ''}</strong>,</p>
          <p>${t.received} <strong>${carName}</strong>. ${t.shortly}</p>
          
          <div style="background: #F8FAFC; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0;">
            <h3 style="margin-top: 0;">${t.details}</h3>
            <p><strong>${t.pickup}:</strong> ${fromDate || ''}</p>
            <p><strong>${t.return}:</strong> ${toDate || ''}</p>
            <p><strong>${t.nationalityLabel}:</strong> ${nationality || ''}</p>
            <p><strong>${t.mobile}:</strong> ${phone1 || ''} ${phone2 ? `/ ${phone2}` : ''}</p>
           
            <P style="color: #64748B; font-size: 12px;"><em>${t.baseRate}: EGP${rate || car?.price || 0}</em></P>
            
            <p><strong>${t.additionalHoursLabel}:</strong> ${extraHours || 0}</p>
            <p><strong>${t.additionalPriceLabel}:</strong> ${extraHours > 0 ? `EGP${extraHours * extraHourCost}` : t.none}</p>
            
            <p style="color: #C5A25D; font-size: 18px;"><strong>${t.estimatedTotal}: EGP${totalPrice || 0}</strong></p>
            <p><strong>${t.paymentMethod}:</strong> ${paymentType || 'N/A'}</p>
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