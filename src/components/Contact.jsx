import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { PageIntro } from './PortfolioComponents';
import { siteMeta, socialLinks } from './siteData';

const icons = { Email: FiMail, GitHub: FiGithub, LinkedIn: FiLinkedin };
const descriptions = {
  Email: 'Send me a message directly.',
  GitHub: 'Explore the code and projects I’m working on.',
  LinkedIn: 'Connect with me and start a conversation.',
};
const actionLabels = { Email: 'Send a message', GitHub: 'Visit GitHub', LinkedIn: 'Connect on LinkedIn' };

function Contact() {
  const methods = [
    ...(siteMeta.contactEmail ? [{ name: 'Email', url: 'mailto:' + siteMeta.contactEmail }] : []),
    ...socialLinks.filter((social) => social.name === 'LinkedIn'),
    ...socialLinks.filter((social) => social.name !== 'LinkedIn'),
  ];

  return (
    <div className="container page-content contact-page">
      <PageIntro
        eyebrow="GET IN TOUCH"
        title={<>Let’s make something <em>good</em><span className="accent-dot">.</span></>}
        description="Whether you have an idea, a question, or just want to connect, I’d love to hear from you."
      />
      <div className="contact-layout">
        <div className="contact-guide">
          <span className="contact-guide-mark" aria-hidden="true">✳</span>
          <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />SAY HELLO</p>
          <h2>Pick a place to connect.</h2>
          <p>For a conversation, {siteMeta.contactEmail ? 'email' : 'LinkedIn'} is a good place to start. You can also find my projects on GitHub.</p>
        </div>
        <section className="contact-options" aria-label="Ways to connect">
          {methods.map((social, index) => {
            const Icon = icons[social.name] || FiArrowUpRight;
            const external = social.name !== 'Email';
            return (
              <a className={'contact-option' + (index === 0 ? ' contact-option--primary' : '')} key={social.name} href={social.url} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
                <span className="contact-option-icon"><Icon aria-hidden="true" /></span>
                <span className="contact-option-copy">
                  <span className="project-type">0{index + 1} / CONNECT</span>
                  <strong>{social.name}</strong>
                  <span>{social.name === 'Email' ? siteMeta.contactEmail : (descriptions[social.name] || 'Connect with me on ' + social.name + '.')}</span>
                </span>
                <span className="contact-option-action">
                  {actionLabels[social.name] || 'Connect'} <FiArrowUpRight aria-hidden="true" />
                </span>
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            );
          })}
        </section>
      </div>
      <div className="contact-signoff"><span aria-hidden="true">✳</span> Thanks for stopping by.</div>
    </div>
  );
}

export default Contact;
