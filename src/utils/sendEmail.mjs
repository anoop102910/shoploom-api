const Resend = await import("resend").then(module => module.Resend);
// const {RESEND_API_KEY} = await import("../config/config")
const resend = new Resend("re_7CfFSeRQ_XoyTtLAgGKzkRYdtstBR9PRi");

const sendEmail = async (email, subject, emailMessage) => {
  const { data, error } = await resend.emails.send({
    from: "EchoSage <onboarding@resend.dev>",
    to: [email],
    subject: subject,
    html: emailMessage,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};

export default sendEmail;
