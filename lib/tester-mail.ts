import nodemailer from 'nodemailer';

type MailLanguage = 'pl' | 'en' | 'no';

const COPY: Record<
  MailLanguage,
  { subject: string; heading: string; body: string; button: string; expiry: string }
> = {
  pl: {
    subject: 'Twój dostęp do programu testowego RipperSync',
    heading: 'Potwierdź dostęp do RipperSync',
    body: 'Kliknij poniżej, aby potwierdzić adres e-mail i otworzyć prywatny dostęp do programu testowego.',
    button: 'Potwierdź adres i wejdź',
    expiry: 'Link jest jednorazowy i wygaśnie po 24 godzinach.'
  },
  en: {
    subject: 'Your RipperSync test program access',
    heading: 'Confirm your RipperSync access',
    body: 'Use the link below to confirm your email address and open private access to the test program.',
    button: 'Confirm email and continue',
    expiry: 'This link can be used once and expires after 24 hours.'
  },
  no: {
    subject: 'Din tilgang til RipperSync-testprogrammet',
    heading: 'Bekreft tilgangen til RipperSync',
    body: 'Bruk lenken nedenfor for å bekrefte e-postadressen din og åpne privat tilgang til testprogrammet.',
    button: 'Bekreft e-post og fortsett',
    expiry: 'Lenken kan brukes én gang og utløper etter 24 timer.'
  }
};

function mailLanguage(lang?: string): MailLanguage {
  return lang === 'no' || lang === 'en' ? lang : 'pl';
}

function smtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM;
  const port = Number(process.env.SMTP_PORT || '2525');

  if (!host || !user || !pass || !from || !Number.isFinite(port)) {
    throw new Error('SMTP is not fully configured');
  }
  return { host, user, pass, from, port };
}

export async function sendTesterAccessEmail({
  to,
  verifyUrl,
  lang
}: {
  to: string;
  verifyUrl: string;
  lang?: string;
}): Promise<void> {
  const config = smtpConfig();
  const copy = COPY[mailLanguage(lang)];
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    requireTLS: config.port !== 465,
    auth: {
      user: config.user,
      pass: config.pass
    }
  });

  await transporter.sendMail({
    from: config.from,
    to,
    subject: copy.subject,
    text: `${copy.heading}\n\n${copy.body}\n\n${verifyUrl}\n\n${copy.expiry}`,
    html: `
      <div style="background:#07090c;padding:36px 18px;font-family:Arial,sans-serif;color:#e9ecf1">
        <div style="max-width:560px;margin:0 auto;border:1px solid #2a3039;background:#11151b;padding:32px">
          <div style="font-family:monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#f1b86a;margin-bottom:20px">RipperSync · program testowy</div>
          <h1 style="font-size:26px;line-height:1.2;margin:0 0 16px;color:#fff">${copy.heading}</h1>
          <p style="font-size:16px;line-height:1.65;color:#bcc3ce;margin:0 0 26px">${copy.body}</p>
          <a href="${verifyUrl}" style="display:inline-block;background:#dd7e27;color:#07090c;text-decoration:none;font-weight:700;padding:13px 18px">${copy.button}</a>
          <p style="font-family:monospace;font-size:12px;line-height:1.5;color:#7d8796;margin:26px 0 0">${copy.expiry}</p>
        </div>
      </div>
    `
  });
}

