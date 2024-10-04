import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: "no-reply@uniroom.app",
    to: email,
    subject: "Autenticación de 2 factores",
    html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <table align="center" style="border-width:1px; border-style:solid; border-color:#eaeaea; border-radius:5px; margin-top:40px; max-width:465px; padding:20px;">
            <tbody>
              <tr>
                <td>
                  <img src="https://i.imgur.com/1QXLsFM.png" alt="Logo" height="130" style="display:block;margin:0 auto;">
                  <h1 style="text-align:center; font-size:24px;">Autenticación de 2 factores</h1>
                  <p style="font-size:14px;">Hola, ¡Tus llaves virtuales están aquí!</p>
                  <p style="font-size:14px;">Tu código de acceso es:</p>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background:rgba(0,0,0,.05);border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px">
                   <tbody>
                     <tr>
                       <td>
                        <p style="font-size:32px;line-height:40px;margin:0 auto;color:#000;display:inline-block;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center"><strong>${token}</strong></p>
                       </td>
                      </tr>
                     </tbody>
                   </table>
                  <p style="font-size:14px;">Si no solicitaste esto, no te preocupes; nosotros nos encargamos de desalojar a cualquier intruso que se atreva a mudarse sin avisar. 🚪🔑</p>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `
  });
};


export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "no-reply@uniroom.app",
    to: email,
    subject: "Confirma tu dirección de correo electrónico",
    html: `
     <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <table align="center" style="border-width:1px; border-style:solid; border-color:#eaeaea; border-radius:5px; margin-top:40px; max-width:465px; padding:20px;">
            <tbody>
              <tr>
                <td>
                  <img src="https://i.imgur.com/1QXLsFM.png" alt="Logo" height="130" style="display:block;margin:0 auto;">
                  <h1 style="text-align:center; font-size:24px;">¡Bienvenido a UniRoom! 🤗</h1>
                  <p style="font-size:14px;">Para asegurarnos de que esta cuenta es realmente tuya y no de algún vecino curioso, haz clic en el siguiente botón para confirmar tu dirección de correo electrónico. 🏠🔑</p>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center;margin-top:32px;margin-bottom:32px">
                      <tbody>
                       <tr>
                        <td><a href="${confirmLink}" style="background-color:rgb(0,0,0);border-radius:0.25rem;color:rgb(255,255,255);font-size:12px;font-weight:600;text-decoration-line:none;text-align:center;padding-left:1.25rem;padding-right:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;padding:12px 20px 12px 20px" target="_blank"><span><!--[if mso]><i style="mso-font-width:500%;mso-text-raise:18" hidden>&#8202;&#8202;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Confirmar cuenta</span><span><!--[if mso]><i style="mso-font-width:500%" hidden>&#8202;&#8202;&#8203;</i><![endif]--></span></a></td>
                      </tr>
                     </tbody>
                  </table>
                  <p style="font-size:14px;">¡Que nadie se mude sin tu permiso!</p>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "no-reply@uniroom.app",
    to: email,
    subject: "Recupera tu contraseña",
    html: `
     <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          <table align="center" style="border-width:1px; border-style:solid; border-color:#eaeaea; border-radius:5px; margin-top:40px; max-width:465px; padding:20px;">
            <tbody>
              <tr>
                <td>
                  <img src="https://i.imgur.com/1QXLsFM.png" alt="Logo" height="130" style="display:block;margin:0 auto;">
                  <h1 style="text-align:center; font-size:24px;">¡Perdiste tu contraseña!<br></br> ¿Te mudaste a otro planeta? 🛸</h1>
                  <p style="font-size:14px;">Parece que olvidaste tu contraseña. 😅 Haz clic en el siguiente botón para recuperarla.</p>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center;margin-top:32px;margin-bottom:32px">
                      <tbody>
                       <tr>
                        <td><a href="${resetLink}" style="background-color:rgb(0,0,0);border-radius:0.25rem;color:rgb(255,255,255);font-size:12px;font-weight:600;text-decoration-line:none;text-align:center;padding-left:1.25rem;padding-right:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;padding:12px 20px 12px 20px" target="_blank"><span><!--[if mso]><i style="mso-font-width:500%;mso-text-raise:18" hidden>&#8202;&#8202;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Recuperar contraseña</span><span><!--[if mso]><i style="mso-font-width:500%" hidden>&#8202;&#8202;&#8203;</i><![endif]--></span></a></td>
                      </tr>
                     </tbody>
                  </table>
                  <p style="font-size:14px;">Recuerda, no queremos que pierdas las llaves del mundo real, ¡porque ahí no estaremos para ayudarte! 🥹</p>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>`
  });
};