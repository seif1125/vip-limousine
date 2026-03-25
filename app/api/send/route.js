import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import path from 'path'; // <-- ADD THIS

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, mobile, mobile2, nationality, carName, fromDate, toDate, totalPrice } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'seifammar1125@gmail.com',
        pass: process.env.GMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"VIP Limousine Concierge" <s@gmail.com>`,
      to: email, 
      bcc: 'seifammar1125@gmail.com',
      subject: `Reservation Request: ${carName}`,
      // 1. Add the attachments array at the same level as 'html'
      attachments: [
        {
          filename: 'logo.png',
          path: path.join(process.cwd(), 'public', 'logo.png'), // Points to public/logo.png
          cid: 'viplogo' // This is the secret ID we use in the HTML below
        }
      ],
      // 2. Add the image tag to your HTML using cid:viplogo
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #0F172A;">
          
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:viplogo" alt="VIP Limousine" style="max-width: 150px; height: auto;" />
          </div>

          <h2 style="color: #C5A25D;">New Booking Request</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>We have received your request for the <strong>${carName}</strong>. Our concierge will contact you shortly.</p>
          
          <div style="background: #F8FAFC; padding: 20px; border-radius: 12px; border: 1px solid #E2E8F0;">
            <h3 style="margin-top: 0;">Details:</h3>
            <p><strong>Pickup:</strong> ${fromDate}</p>
            <p><strong>Return:</strong> ${toDate}</p>
            <p><strong>Nationality:</strong> ${nationality}</p>
            <p><strong>Mobile:</strong> ${mobile} ${mobile2 ? `/ ${mobile2}` : ''}</p>
            <p style="color: #C5A25D; font-size: 18px;"><strong>Estimated Total: ${totalPrice}</strong></p>
          </div>
          
          <p style="font-size: 11px; color: #64748B; margin-top: 20px;">
            This is an automated receipt of your inquiry. Final confirmation is subject to vehicle availability.
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