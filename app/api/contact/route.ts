import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid phone number",
        },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a more detailed project description (at least 10 characters)",
        },
        { status: 400 }
      );
    }

    // Get email from environment variable
    const contactEmail = process.env.CONTACT_FORM_EMAIL || 'contact@corazor.com';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://corazor.com';

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification using the contactEmail
    // 3. Integrate with CRM
    
    // Example: If using a service like Resend, SendGrid, or Nodemailer:
    // if (process.env.CONTACT_FORM_SERVICE === 'resend' && process.env.CONTACT_FORM_API_KEY) {
    //   await sendEmailViaResend(body, contactEmail);
    // }

    // Log the submission (in production, you'd save to database)
    if (process.env.NEXT_PUBLIC_DEPLOY_ENV !== 'production') {
      console.log('Contact form submission:', {
        name,
        email,
        phone,
        company: body.company || 'N/A',
        message: message.substring(0, 100) + '...',
      });
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        message: "Form received successfully. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    // Only log errors in development
    if (process.env.NEXT_PUBLIC_DEPLOY_ENV !== 'production') {
      console.error("Contact form error:", error);
    }
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}

